import React, { useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:3000'

const Game = () => {
  const [isConnectedToSocket, setConnectedToSocket] = useState(false)
  const [roomName, setRoomName] = useState(null)
  const socket = useRef()

  const createRoom = (e) => {
    e.preventDefault()
    const { roomName } = e.target.elements
    connectToSocket(roomName.value)
  }

  const connectToSocket = (roomName) => {
    socket.current = socketIOClient(ENDPOINT, { query: `roomName=${roomName}` })

    socket.current.on('connection confirmation', ({ roomName }) => {
      setConnectedToSocket(true)
      setRoomName(roomName)
    })

    socket.current.emit('connection confirmation')
  }

  return (
    <>
      {!isConnectedToSocket &&
        <form onSubmit={createRoom}>
          <label htmlFor="roomName.value"></label>
          <input type="text" id="roomName" required />
          <input type="submit" />
        </form>
      }
      {isConnectedToSocket
        ? `Connected to room ${roomName} 💚`
        : 'Disconnected 🔻'
      }
    </>
  )
}

export default Game
