import { useState } from "react";
import { updateTodo } from "../request/todo";
import AddTodo from "./AddTodo";



export default function List({date, todos, todolist, setTodolist, handledelete, handleSubmit, isCreating, setIsCreating, newTodo, setNewTodo}) {
    const [updating, setUpdating] = useState("");
    const [updateTodo, setUpdateTodo] = useState("");

    // todo 수정
    function handleUpdate(id) {
        console.log(id)
        // try {
        //     const updatedlist = todos.map(item => {
                
        //         if(item.id === id) {
        //             updateTodo(id, newTodo, item.checked)
        //             return {...item, content: newTodo}
        //         }
        //         return item;
        //     })
        //     setTodolist(updatedlist);
        //     setUpdating(false)
        // } catch(error) {
        //     console.log(error)
        // }
    }

    // isChecked
    function handleCheck(id) {
        try {
            const updatedlist = todolist.map(item => {
                if(item.id === id) {
                    updateTodo(id, item.todo, !item.checked)
                    return {...item, isChecked: !item.checked}
                }
                return item;
            })
            setTodolist(updatedlist);
        } catch(error) {
            console.log(error)
        }
    }


   return (
    <div className="memo" >
        <h2 className="p-4 font-bold text-left">
            [{date}]
            <button type="button" onClick={() => setIsCreating(date)} className="pl-2">
                <i className="xi-plus-circle"></i>
            </button>
        </h2>
        

        {todos.map(todo => (
            <li key={todo.id} className="text-left flex px-4 justify-between">
                <div className="leading-8 text-sm">
                    <input type="checkbox" defaultChecked={todo.checked} onClick={() => handleCheck(todo.id)} name={todo.id} id={todo.id} className="mr-2"/>
                    {updating === todo.id ? (
                        <input className="border w-1/3 rounded-full px-2 w-3/4 outline-none text-sm" defaultValue={todo.content} onChange={({target}) => setUpdateTodo(target.value)}/>
                        ) : (
                            <label for={todo.id}>
                                <span>{todo.content}</span>
                            </label>
                    )}
                </div>

                {updating === todo.id ? (
                    <span className="shrink-0">
                        <button onClick={() => handleUpdate(todo.id)} className="px-1 border border-green-200 bg-green-200 shink-0 round-button"><i className="xi-check"></i></button>
                        <button onClick={() => setUpdating("")} className="ml-2 px-1 border shrink-0 round-button"><i className="xi-close"></i></button>                       
                    </span>
                    ) : (
                    <span>           
                        <button onClick={() => setUpdating(todo.id)} className="px-1 border border-green-200 bg-green-200 round-button"><i className="xi-pen-o"></i></button>
                        <button onClick={() => handledelete(todo.id)} id="del" className="ml-2 px-1 bg-red-200 border border-red-200 round-button"><i className="xi-trash-o"></i></button> 
                    </span>
                )}
            </li>
        ))}
                                
        {isCreating == date &&
            <form onSubmit={handleSubmit} className="flex pr-4 pl-8 justify-between">
                <input type="hidden" name="date" value={date}/>
                <input 
                    type="text" 
                    autoComplete="off"
                    name="content"
                    className="mb-2 text-sm border border-green-400 rounded-full px-2 outline-none"
                />
                
                <span className="shrink-0">
                    <button type="submit" className="px-1 border border-green-200 bg-green-200 shink-0 round-button"><i className="xi-check"></i></button>
                    <button onClick={() => setIsCreating("")} className="ml-2 px-1 border shrink-0 round-button"><i className="xi-close"></i></button>                       
                </span>
            </form>  
        }


    </div>
   );
}
