import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className='mt-20'>
      <Toaster richColors position='top-right' reverseOrder={false}/>
      <AddTodo/>
    </div>
  )
}

export default App
