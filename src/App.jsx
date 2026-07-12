import { useEffect, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from "uuid"


function App() {

  const [todo, setTodo] = useState("")    // input text 
  const [todos, setTodos] = useState([])  // holds all todos
  const [showFinished, setShowFinished] = useState(true)
  const [alertMsg, setAlertMsg] = useState("") // alert for short todo

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    if (todo.trim().length <= 3) {
      setAlertMsg("Todo must be more than 3 characters long!")
      setTimeout(() => setAlertMsg(""), 2500)
      return
    }
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveToLocalStorage(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }



  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="md:container  md:mx-auto   my-5 rounded-xl py-5 px-6 bg-cyan-900 min-h-[80vh] max-w-xl md:w-1/2 shadow-lg" >

        <h1 className='text-2xl font-bold text-center text-white'>iTask – Your Task Planner</h1>

        <div className="addtodo my-6 flex flex-col justify-center gap-4">
          <h1 className='font-bold text-xl text-white'>Add a Todo</h1>

          <input type='text' onChange={handleChange} value={todo} className='bg-gray-100 w-full rounded-xl py-2 px-3' />

          {alertMsg && (
            <div className="bg-red-500 text-white text-sm font-semibold rounded-lg px-3 py-2 text-center animate-pulse">
              {alertMsg}
            </div>
          )}

          <button onClick={handleAdd} className='bg-cyan-500 hover:bg-teal-400 p-5 py-0.5 text-white rounded-xl font-bold w-[30%] mx-auto'>Add</button>
        </div>

        <div className="flex items-center gap-2 mt-4 cursor-pointer text-sm text-white">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='accent-cyan-500' />
          <label>Show Finished</label>
        </div>

        <h2 className='text-xl font-bold pt-1 mt-3 text-white'>Your Todos</h2>

        <div className="todos">

          {todos.length === 0 && <div className='mt-2 text-white'>No todos to display</div>}

          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between items-center w-full my-2 mx-2 text-white bg-cyan-800 rounded-lg px-3 py-1">

              <div className="flex gap-3 items-center min-w-0">
                <input onChange={handleCheckBox} type='checkbox' checked={item.isCompleted} name={item.id} id='' className='accent-cyan-500' />
                <div className={`truncate ${item.isCompleted ? "line-through" : ""}`} title={item.todo}>
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-cyan-600 hover:bg-cyan-400 p-5 py-0.5 text-white rounded-sm mx-2 font-bold'><MdOutlineEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-cyan-600 hover:bg-cyan-400 p-5 py-0.5 text-white rounded-sm mx-2 font-bold'><AiFillDelete /></button>
              </div>

            </div>

          })}

        </div>

      </div>
    </>
  )
}

export default App