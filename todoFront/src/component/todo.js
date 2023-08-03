import {useEffect, useState, useContext} from "react";
import {getTodosAll, createTodo, deleteTodo} from "../request/todo"
import List from "./list";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import AddTodo from "./AddTodo";
import DateGroup from "./DateGroup";

export default function Todo() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todo, setTodo] = useState("");
    const [newTodo, setNewTodo] = useState("");
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
    }, [todo])

    console.log(todolist)

    // if (!isLoaded) {
    //     return <p>fetching data...</p>
    // }

    // todo 추가
    async function handleSubmit(e) {
        try {
            e.preventDefault();


            await createTodo(newTodo)
            .then(setTodo(newTodo));

            setNewTodo("")

        } catch(error) {
            console.log(error)
        }
    }

    // todo 삭제
    async function handledelete(id) {
        try {
            await deleteTodo(id)

            const updated = todolist.filter(item => item.id !== id);
            setTodolist(updated)

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
    


    // todo 조회
    // const todoList = todolist.map(item => (
    //     <List 
    //         key={item.id}
    //         id={item.id}
    //         content={item.content}
    //         date={item.date}
    //         isChecked={item.checked}
    //         
    //     />
    // ))



    // function signout () {
    //     setUser(null);
    //     localStorage.removeItem('user')
    //     navigate('/signin')
    // }


    return (
        <div className="max-w-sm h-screen p-4 my-16 mx-auto text-center border border-green-400 border-2 px-8 pb-16 text-center relative">
            <h1 className="font-bold text-2xl">TODOLIST</h1>

            <div id="todoList">
                {dateList.map(date => (
                    <List
                        date={date}
                        todos={getTodos(date)}
                        todolist={todolist}
                        setTodolist={setTodolist}
                        handleSubmit={handleSubmit}
                        handledelete={handledelete}
                    />
                ))}
            </div>
            

            <button type="button" className="absolute bottom-4 right-4 green-button"></button>

            {/* <button 
                className="font-semibold text-green-600 absolute right-8 bottom-6 padding-4"
                onClick={signout}
            >
                로그아웃
            </button> */}
        </div>
    )
}