import socketIOClient from 'socket.io-client'
import React, { useRef, useState, useEffect } from 'react'
const ENDPOINT = 'http://127.0.0.1:3000'

const Game = () => {
  const [response, setResponse] = useState('')
  const socket = useRef()

  useEffect(() => {
    socket.current = socketIOClient(ENDPOINT)
    socket.current.on('chat message', data => {
      setResponse(data)
    })
  }, [])

  const emit = () => {
    socket.current.emit('chat message', 'test message')
  }

  return (
    <p>
      <button onClick={emit}>submit</button>
      {response}
    </p>
  )
}

export default Game
