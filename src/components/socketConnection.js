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

  function setTeamName ({ teamId, teamName, roomName }) {
    socket.current.emit('set team name', { teamId, teamName, roomName })
  }

  const [roomState, setRoomState] = useSetState({
    users: null,
    userName: null,
    userType: null,
    userId: null,
    room: null,
    isConnected: false,
    gameState: null,
    actions: {
      connectToRoom,
      setGameState,
      setTeamName
    }
  })

  const currentTeam = roomState.teams?.find(team =>
    team.members.includes(roomState.userId))

  const derivedRoomState = {
    isAdmin: roomState.userType === 'admin',
    currentTeam,
    isCurrentTeamTurn: roomState.room?.currentPlayingTeam?.id === currentTeam?.id,
    isTeamLeader: currentTeam?.leader === roomState.userId
  }

  const contextValue = { ...roomState, ...derivedRoomState }

  RoomContext = React.createContext(contextValue)

  console.log('---->: contextValue', contextValue)
  return <Game />
}

export { RoomContext }
export default SocketConnection
