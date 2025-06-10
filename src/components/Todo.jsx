    import React, { useState } from 'react';
    import logo from '../assets/icon.png';
    import check from '../assets/check.png'
    import unCheck from '../assets/unchecked.png'
    import toast from 'react-hot-toast';

    const Todo = ({ todos , onDelete, onStatus, onUpdate, onClearAll}) => {
        const [isEditing,setIsEditing] = useState(false)
        const [editText,setEditText] = useState(false)
        const [editId,setEditId] = useState(false)
        const [clearAll,setClearAll] = useState(false)

    return (
        <div className='bg-black w-[820px] p-5 mt-9 rounded-2xl flex flex-col text-amber-100'>
            {/* Heading of Todo and clear all button */}
            <div className='flex justify-center items-center mb-8 gap-2 ml-57 mt-3'>
                <h1 className='text-2xl font-bold text-white'>TODOS</h1>
                <img src={logo} className='h-8 w-8' alt='logo' />
                <p className='text-gray-400 text-[15px]'>Let’s Get Things Done!</p>
                <button onClick={()=>{todos.length === 0 ? toast.error("You Don't Have any Todo") :setClearAll(true)}} className='ml-32 cursor-pointer hover:text-amber-200 transition-all hover:scale-103 '>clear-All</button>
            </div>

            {/* Making Todo List */}
            {todos.length === 0 ? (
                <p className='text-white text-center'>You Don't Have Todos Right Now.</p>
            ) : (
                todos.map((todo) => (
                <div>
                    <div
                    key={todo.id}
                    className='flex justify-between gap-5 items-center bg-white text-black p-2.5 rounded-2xl mb-2 border-black mt-2 transition hover:scale-103'>

                    <img onClick={()=>onStatus(todo.id)} className='h-5 w-5 cursor-pointer' src={todo.status ? check : unCheck} alt="" />

                    <p className={`${todo.status ? "italic line-through" : ""}`}>{todo.text}</p>
                    {/* delete icon */}
                    {/* we can not pass as onclick={onDelete(todo.id)} because onclick is a function we can not pass a function like this so wee need a call back  */}
                
                
                    <div className='flex gap-2 justify-center items-center'>

                        <span className='text-center cursor-pointer transition delay-100 duration-100 ease-in-out hover:text-green-700 hover:font-bold hover:scale-120' onClick={()=>{
                            setIsEditing(true)
                            setEditId(todo.id)
                            setEditText(todo.text)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </span>

                        <span className='text-center cursor-pointer transition delay-100 duration-100 ease-in-out hover:text-red-700 hover:font-bold hover:scale-120' onClick={()=>onDelete(todo.id)}> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </span>
                        <span>
                            <p className='text-[14px]'>{todo.dateString}</p>
                            <p className='text-[12px]'>{todo.timeString}</p>
                        </span>

                    </div>
                </div>
                </div>
                ))
            )}

            {/* footer text  */}

            <p className="text-center text-sm text-gray-500 mt-8">
                Made with ❤️ by Hasan – Stay organized, stay productive.
            </p>

            {/* updateing todo modal */}

            {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/85 z-50">
                {/* fixed inset-0 bg-black this make my todo to disappear when edit todo toggle */}
                
                <div className="bg-white p-6 rounded-xl w-96 text-black">
                <h2 className="text-lg font-semibold mb-4">Edit Your Todo</h2>
                <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border p-2 mb-4 rounded"
                    rows={8}
                    placeholder="Edit your todo..."
                ></textarea>
                <div className="flex justify-end gap-3">
                    <button
                    onClick={() => {setIsEditing(false); toast.error("Doesn't Change Anything 💕 ")}}
                    className="bg-red-600 text-white px-4 py-1 rounded transition delay-100 duration-200 hover:bg-red-800 cursor-pointer"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={() => {
                        onUpdate(editId, editText); // <- Here is handleUpdate being used
                        setIsEditing(false);
                    }}
                    className="bg-green-600 text-white px-4 py-1 rounded transition delay-100 duration-200 hover:bg-green-800 cursor-pointer"
                    >
                    Save
                    </button>
                </div>
                </div>
            </div>
            )}
             
             {/* clear all modal for confirming */}

            {clearAll && (<div className="fixed inset-0 flex justify-center items-center bg-black/70 text-black ">
                
                <div className='bg-slate-300 p-8 rounded-2xl'>
                    <p className='mb-7'>Are you sure you want to delete all todos?</p>
                    <span className='flex flex-row justify-center items-center gap-4'>
                        <button onClick={()=>{onClearAll(),setClearAll(false)}} className='transition hover:scale-105 font-semibold  bg-green-600 rounded-xl p-1 px-4 cursor-pointer  text-black hover:bg-green-700'>YES</button>

                        <button onClick={()=>{setClearAll(false)}} className='transition hover:scale-105 font-semibold  bg-red-600 rounded-xl p-1 px-4 cursor-pointer  text-black hover:bg-red-700'>NO</button>
                    </span>
                </div>
            </div>)}
        </div>
    );
    };

    export default Todo;
