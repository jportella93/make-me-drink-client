import React, { useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import Game from './game'
import useSetState from 'use-state-object'
const ENDPOINT = 'http://127.0.0.1:3000'

let RoomContext = React.createContext({})

const SocketConnection = () => {
  const socket = useRef()

  const [roomState, setRoomState] = useSetState({
    users: null,
    userName: null,
    roomName: null,
    isConnected: false,
    gameState: null
  })

  RoomContext = React.createContext(roomState)

  const createRoom = (e) => {
    e.preventDefault()
    const { roomName, userName } = e.target.elements
    connectToSocket(roomName.value, userName.value)
  }

  const connectToSocket = (roomName, userName) => {
    socket.current = socketIOClient(ENDPOINT, {
      query: `roomName=${roomName}&userName=${userName}`
    })

    socket.current.on('connection confirmation', (roomState) => {
      setRoomState({ ...roomState, isConnected: true })
    })

    socket.current.on('room state', setRoomState)

    socket.current.on('error', console.error)

    socket.current.emit('connection confirmation')
  }

  console.log('---->: SocketConnection -> roomState', roomState)
  return <Game onCreateRoom={createRoom} />
}

export { RoomContext }
export default SocketConnection
