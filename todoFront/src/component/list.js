import { useState } from "react";
import { updateTodo } from "../request/todo";


export default function List({date, todos, todolist, setTodolist, handledelete, handleSubmit}) {
    const [updating, setUpdating] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [updateTodo, setUpdateTodo] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    console.log(date, todos)

    // todo 수정
    // function handleUpdate(id) {
    //     console.log(id)
    //     try {
    //         updateTodo(id, date, updateTodo, checked)
            
    //         setUpdating(false)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // isChecked
    function handleCheck(id) {
        try {
            const updatedlist = todolist.map(item => {
                if(item.id === id) {
                    updateTodo(id, item.todo, !item.isChecked)
                    return {...item, isChecked: !item.isChecked}
                }
                return item;
            })
            setTodolist(updatedlist);
        } catch(error) {
            console.log(error)
        }
    }

   return (
    <>
        {todos.map(todo => (

            <ul className="w-full bg-yellow-300" key={todo.date}>
                <li className="text-left p-1 pl-8 flex justify-between border-b-2 border-green-400 border-dotted">
                    <div className="leading-8">
                        <input type="checkbox" defaultChecked={todo.checked} onClick={() => handleCheck(todo.id)} name={todo.id} id={todo.id} className="mr-2"/>
                        {updating ? (
                            <input className="border w-1/3 rounded-full px-2 w-3/4 outline-none text-sm" defaultValue={todo.content} onChange={({target}) => setUpdateTodo(target.value)}/>
                            ) : (
                                <label for={todo.id}>
                                    <span>{todo.content}</span>
                                </label>
                        )}
                    </div>

                    {/* {updating ? (
                        <span className="shrink-0">
                            <button onClick={() => handleUpdate(id)} className="mr-2 p-1 border border-green-200 bg-green-200 shink-0">제출</button>
                            <button onClick={() => setUpdating(false)} className="p-1 border shrink-0">취소</button>                       
                        </span>
                        ) : (
                        <span>           
                            <button onClick={() => setUpdating(true)} className="mr-2 p-1 border border-green-200 bg-green-200">수정</button>
                            <button onClick={() => handledelete(id)} className="p-1 bg-red-200 border border-red-200">삭제</button> 
                        </span>
                    )} */}
                </li>
            </ul>
        ))}


        {isCreating &&
            <form id="addTodo" onSubmit={handleSubmit} className="p-4 mx-auto">
                    <input 
                        className="border border-green-400 rounded-full px-2 w-2/3 outline-none"
                        autoComplete="off"
                        onChange={(e) => setNewTodo(e.target.value)}
                        value={newTodo}
                    />
                    <button  
                        className="p-1 ml-2 bg-green-400 rounded-full"
                    >
                        추가
                    </button>
                </form>
        }
    </>
   );
}
