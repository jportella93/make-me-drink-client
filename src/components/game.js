import React, { useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:3000'

const Game = () => {
  const [isConnectedToSocket, setConnectedToSocket] = useState(false)
  const socket = useRef()

  const createRoom = (e) => {
    e.preventDefault()
    const { roomName } = e.target.elements
    connectToSocket(roomName.value)
  }

  const connectToSocket = (roomName) => {
    socket.current = socketIOClient(ENDPOINT)
    socket.current.on('connection confirmation', () => {
      setConnectedToSocket(true)
    })

    socket.current.emit('connection confirmation')
  }

  return (
    <>
      <form onSubmit={createRoom}>
        <label htmlFor="roomName.value"></label>
        <input id="roomName" />
      </form>
      {isConnectedToSocket ? 'Connected 💚' : 'Disconnected 🔻' }
    </>
  )
}

export default Game
