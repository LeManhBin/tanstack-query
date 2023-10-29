import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

const OtherPage = () => {
    const queryClient = useQueryClient()

    const todos = queryClient.getQueriesData(["GET-TODO"])
  return (
    <div>
        {
          todos[0][1]?.data.map((todo) => {
            return(
              <p key={todo.id}>{todo.todo}</p>
            )
          })
        }
    </div>
  )
}

export default OtherPage