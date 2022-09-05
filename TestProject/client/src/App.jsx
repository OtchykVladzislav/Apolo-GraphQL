import React, { useState, useEffect } from 'react'
import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USERS } from './query/user'
import { CREATE_USER } from './mutation/user'

function App() {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)

  const [ newUser ] = useMutation(CREATE_USER)
  const [ users, setUsers ] = useState([])
  const [ username, setusername] = useState('')
  const [ age, setAge ] = useState(0)

  useEffect(() => {
    if(!loading){
      setUsers(data.getAllUsers)
    }
  }, [data])

  if(loading){
    return <h1>Loading.....</h1>
  }

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setusername('')
      setAge(0)
    })
    refetch()
  }

  return (
    <div className="App">
      <div>
        <form>
          <input value={username} onChange={(e) => setusername(e.target.value)} type="text" />
          <input value={age} onChange={(e) => setAge(+e.target.value)} type="number" />
          <button onClick={(e) => addUser(e)}>Создать</button>
        </form>
      </div>
      <div>
        {users.map(user => 
          <div className='line' key={user.id}>{user.id}.{user.username}-{user.age}</div>
        )}
      </div>
    </div>
  )
}

export default App
