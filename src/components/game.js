import React, { useRef, useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:3000'

const Game = () => {
  const [isConnectedToSocket, setConnectedToSocket] = useState(false)
  const [roomName, setRoomName] = useState(null)
  const [userName, setUserName] = useState(null)
  const [users, setUsers] = useState(null)
  const socket = useRef()

  const createRoom = (e) => {
    e.preventDefault()
    const { roomName, userName } = e.target.elements
    console.log('---->: createRoom -> e.target.elements', e.target.elements)
    connectToSocket(roomName.value, userName.value)
  }

  const connectToSocket = (roomName, userName) => {
    socket.current = socketIOClient(ENDPOINT, {
      query: `roomName=${roomName}&userName=${userName}`
    })

    socket.current.on('connection confirmation',
      ({ roomName, userName }) => {
        console.log('---->: connectToSocket -> userName', userName)
        console.log('---->: connectToSocket -> roomName', roomName)
        setConnectedToSocket(true)
        setRoomName(roomName)
        setUserName(userName)
      })

    socket.current.on('room state', ({ users }) => {
      console.log('---->: connectToSocket -> users', users)
      setUsers(users)
    })

    socket.current.emit('connection confirmation')
  }

  useEffect(() => {
    return () => {
      socket.current.emit('disconnect')
    }
  }, [])

  return (
    <>
      {!isConnectedToSocket &&
        <form onSubmit={createRoom}>
          <label htmlFor="roomName">Room name</label>
          <input type="text" id="roomName" required />
          <br/>
          <label htmlFor="userName">User name</label>
          <input type="text" id="userName" required />
          <br/>
          <input type="submit" />
        </form>
      }
      {userName && <h3>{userName}</h3>}
      {users &&
        <>
        Online users in room {roomName}:
          <ul>
            {users.map(({ name, id }) => (<li key={id}>{name}</li>))}
          </ul>
        </>
      }
    </>
  )
}

export default Game
