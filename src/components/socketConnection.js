import React, { useRef } from 'react'
import socketIOClient from 'socket.io-client'
import useSetState from 'use-state-object'
import Game from './game'
const ENDPOINT = 'http://127.0.0.1:3000'

let RoomContext = React.createContext({})

const SocketConnection = () => {
  const socket = useRef()

  function connectToRoom (e) {
    e.preventDefault()
    const { roomName, userName } = e.target.elements

    socket.current = socketIOClient(ENDPOINT, {
      query: `roomName=${roomName.value}&userName=${userName.value}`
    })

    socket.current.on('connection confirmation', (roomState) => {
      setRoomState({ ...roomState, isConnected: true })
    })

    socket.current.on('room state', setRoomState)

    socket.current.on('error', console.error)

    socket.current.emit('connection confirmation')
  }

  function setGameState (state) {
    socket.current.emit('game state change', state)
  }

  const [roomState, setRoomState] = useSetState({
    users: null,
    userName: null,
    userType: null,
    roomName: null,
    isConnected: false,
    gameState: null,
    actions: {
      connectToRoom,
      setGameState
    }
  })

  RoomContext = React.createContext(roomState)

  console.log('---->: SocketConnection -> roomState', roomState)
  return <Game />
}

export { RoomContext }
export default SocketConnection
