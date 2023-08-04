import {useEffect, useState, useContext} from "react";
import {getTodosAll, createTodo, deleteTodo} from "../request/todo"
import List from "./list";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import DateGroup from "./DateGroup";

export default function Todo() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCreating, setIsCreating] = useState("");
    const [todo, setTodo] = useState("");
    const [newTodo, setNewTodo] = useState(false);
    const [todolist, setTodolist] = useState([]);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        setIsLoaded(false);
        setError(null);
        setTodo("")

        getTodosAll().then(data => {
            setTodolist(data);
        })
        .catch(error => {
            setError(error)
            console.log(error)
        })
        .finally(() => setIsLoaded(true))
    }, [])

    // console.log(todolist)

    // if (!isLoaded) {
    //     return <p>fetching data...</p>
    // }

    // todo 추가
    async function handleSubmit(e) {

        let date = e.target.date.value
        let content = e.target.content.value

        // date 형식 가공
        date = dateformat(date);

        try {
            e.preventDefault();

            let newTodo = await createTodo(date, content)

            console.log(newTodo)
            setTodolist([...todolist, newTodo]);
            setIsCreating("")

        } catch(error) {
            console.log(error)
            alert("실패")
        }
    }

    console.log(todolist)

    // todo 삭제
    async function handledelete(id) {
        
        try {
            if(window.confirm("정말?")) {
            await deleteTodo(id)

            const updated = todolist.filter(item => item.id !== id);
            setTodolist(updated)
            }
            
        }catch(error) {
            console.log(error)
        }
    }
    
    // 날짜리스트
    let dateList = new Set(todolist.map(item => {
        let d = "";
        d += item.date[0] + "-" + item.date[1] + "-" + item.date[2]
        return d;
    }))
    dateList = [...dateList]

    // date array를 string으로 바꾸는 함수
    function getTodos(date) {
        const todos = todolist.filter(item => {            
            let d = ""; 
            d += item.date[0] + "-" + item.date[1] + "-" + item.date[2]
            
            if (d === date) return item;
        })
        return todos;
    }

    // date 형식 가공
    function dateformat(date) {
        let formedDate = date;
        let sep = date.lastIndexOf("-")
        let month = date.substring(5, sep);
        let day = date.substring(sep + 1);
        if(month.length == 1) {
            formedDate = date.substring(0, 5) + "0" + month + date.substring(6);
        }
        if(day.length == 1) {
            formedDate = formedDate.substring(0, 8) + "0" + formedDate.substring(8);
        }

        return formedDate;
    }

    
    // const datelist = dateList.map(date => {
    //     <List
    //         date={date}
    //         todos={getTodos(date)}
    //         todolist={todolist}
    //         setTodolist={setTodolist}
    //         handleSubmit={handleSubmit}
    //         handledelete={handledelete}
    //     />
    // })
    
    // 로그아웃
    // function signout () {
    //     setUser(null);
    //     localStorage.removeItem('user')
    //     navigate('/signin')
    // }


    return (
        <div className="max-w-sm h-screen mx-auto py-8 relative">
            <div id="container" className="overflow-y-auto h-full p-4 text-center border border-black rounded-2xl px-8 pb-16 text-center">
                <h1 className="font-bold text-2xl">TODOLIST</h1>

                <div id="todoList">
                    {dateList.map(date => (
                        <ul key={date}>
                            <List
                                date={date}
                                todos={getTodos(date)}
                                todolist={todolist}
                                setTodolist={setTodolist}
                                handledelete={handledelete}
                                handleSubmit={handleSubmit}
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                newTodo={newTodo}
                                setNewTodo={setNewTodo}
                            />
                        </ul>
                    ))}
                </div>

                <button type="button" className="absolute bottom-12 right-4 green-button"></button>

                {/* <button 
                    className="font-semibold text-green-600 absolute right-8 bottom-6 padding-4"
                    onClick={signout}
                >
                    로그아웃
                </button> */}
            </div>
        </div>
    )
}