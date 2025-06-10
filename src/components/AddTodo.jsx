
import { useState , useEffect } from 'react';
import toast from 'react-hot-toast';
import Todo from './Todo';
import { use } from 'react';

const AddTodo = () => {
     const [text,setText] = useState('')  
     const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
      });

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);


      // for date and time 
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    const dateString = now.toLocaleDateString();
    
    
        const onSubmit = (e) =>{
                e.preventDefault()
                if(text.trim() === ''){
                  return toast.error("it can't be empty! ☹️")
                }
                if(todos.some((todo) => todo.text.toLowerCase() === text.trim().toLowerCase())){
                  return toast.error("This todo already exists! ☹️ ")
                }
                setTodos([...todos,{id:Date.now(),text,status:false,timeString,dateString}])
                setText('')
                toast.success("Todo - Added Succcesfully 😍 ")
          
            }

         const handleDelete = (id) => {
          setTodos(todos.filter((todo) => todo.id !== id));
          toast.error('Todo deleted ☹️ ');
        };

        const handleStatus = (id) =>{
            setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, status: !todo.status } : todo
          ));
        }

        const updateText = (id,newText)=>{
          if(newText.trim() === '') return toast.error("it can't be empty! ☹️") //checking for empty
          if(todos.some((todo)=>todo.text.toLowerCase() === newText.toLowerCase()))  return toast.success("This todo already exists! 😇") //checking for same entry
          setTodos(todos.map((todo) => todo.id === id ? {...todo,text: newText} : todo)) // update changes
          toast.success("Updated Succcesfully 🥰 ")
        }

        const clearAllTodo = () =>{
          setTodos([])
          toast.error("ALL TODOS DELETED")
        }
        

  return (
    <div>
      <form
        className="flex flex-col md:flex-row gap-4 md:gap-6 md:mt-10 mb-3 w-full items-center"
        onSubmit={onSubmit}
      >
        <input
          className="bg-gray-200 h-10 w-[300px] sm:w-[500px] md:w-full text-black px-4 rounded-full"
          placeholder="Your Text Here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="bg-red-500 hover:bg-red-700 transition hover:scale-110 cursor-pointer text-white font-bold py-2 px-7 rounded-full"
          type="submit"
          value="Add"
        />
      </form>

      <Todo todos={todos} onDelete={handleDelete} onStatus={handleStatus} onUpdate={updateText} onClearAll={clearAllTodo}/>
    </div>
  )
}

export default AddTodo
