import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodo, deleteTodo, getAllTodos } from './api/todoApi'
import OtherPage from './OtherPage'

function App() {
  const [todo, setTodo] = useState("")
  const queryClient = useQueryClient()

  const todos = useQuery({
    queryKey: ["GET-TODO"],
    queryFn: () => getAllTodos()
  })

  const postTodo = useMutation({
    mutationKey: ["POST-TODO"],
    mutationFn: (newTodo) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries("GET-TODO")
    }
  })

  const completedTodo = useMutation({
    mutationKey: ["DONE-TODO"],
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries("GET-TODO")
    }
  })

  const handleSubmit = () => {
    postTodo.mutate({todo: todo})
  }

  const handleDone = (id) => {
    completedTodo.mutate(id)
  }
  return (
    <>
      <input type="text" placeholder='enter your todo' value={todo} onChange={(e) => setTodo(e.target.value)}/>
      <button onClick={handleSubmit}>Add</button>
      <div style={{display: "flex", gap: "50px"}}>
        <div>
          {
            todos.isLoading && <h1>Loading....</h1>
          }
          {
            todos?.data?.data?.map((todo) => {
              return(
                <div  key={todo.id} style={{display: "flex", gap: "50px"}}>
                  <button onClick={() => handleDone(todo.id)}>Done</button>
                  <p>{todo.todo}</p>
                </div>
              )
            })
          }
        </div>
        <div>
          <OtherPage/>
        </div>
      </div>
    </>
  )
}

export default App
