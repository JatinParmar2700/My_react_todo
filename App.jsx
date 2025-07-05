import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {

  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])
const[showFinished,setshowFinished]=useState(true)
  useEffect(()=>{
let todoString=localStorage.getItem("todos")
if (todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)

}
  },[])
  
const saveToLs=(params)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

const handelEdit=(e,id)=>{

let t=todos.filter(i=>i.id===id)
setTodo(t[0].todo)
let newTodos=todos.filter(item=>{
  return item.id!==id;
});
setTodos(newTodos)
saveToLs();
  }


const handelDelete=(e,id)=>{
let newTodos=todos.filter(item=>{
  return item.id!==id;
});
setTodos(newTodos)
saveToLs();
  }


const handelAdd=()=>{
   setTodos([...todos,{id:uuidv4(),todo,isComplited:false}]) 
   setTodo("")
console.log(todos)
saveToLs();
  }

const handelChange=(e)=>{
   
   setTodo(e.target.value)
  
  }

const handelCheckbox=(e)=>{
let id=e.target.name;
let index=todos.findIndex(item=>{
  return item.id===id;
})
let newTodos=[...todos];
newTodos[index].isCompleted=!newTodos[index].isCompleted;
setTodos(newTodos)
saveToLs();
}

const toggleFinished=(e)=>{
  setshowFinished(!showFinished)

}

  return (
    <>
   <Navbar />
  
   <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] md:w-1/2 ">
  <h1 className='text-bold text-3xl text-indigo-900 text-center text-shadow-amber-900 text-shadow-3xl'>-Manage your Task Here-</h1>
  <div className="addTodo my-5  flex flex-col gap-4">
  <h2 className='text-lg font-bold'>Add todos</h2>
  <input onChange={handelChange} value={todo}type="text" placeholder='Add Task'className='bg-white w-full px-5 py-2 rounded-full ' />
  <button onClick={handelAdd}disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-500 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-2xl mx-6'>Save</button>
  </div>
  <input type="checkbox" checked={showFinished} onChange={toggleFinished}  /><span className='mx-2'>Show Finished</span>
  <div className='h-1 opacity-20 bg-indigo-600 w-3/4 mx-auto my-auto'></div>
  <h2 className='text-lg font-bold my-3'>Your todos</h2>
  <div className="todos">
    {todos.length===0 && <div className='m-5'>No todos to Display</div>}
  {todos.map(item=>{

  
 return (showFinished || !item.isCompleted) && <div key ={item.id}className="todo flex md:w-1/2 my-3 justify-between">
    <div className="flex gap-5">
    <input name={item.id} onChange={handelCheckbox} type="checkbox" checked={item.isCompleted} />
    <div className={item.isCompleted ? "line-through":""}>{item.todo}</div>
    </div>
    
    <div className="buttons flex h-full">
      <button onClick={(e)=>{handelEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit />
</button>
      <button onClick= {(e)=>{handelDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteSweep />
</button>
    </div>

  </div>
 })}
</div>

   </div>
  
   </>
  )
}

export default App;
