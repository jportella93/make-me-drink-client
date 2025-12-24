import React, { useMemo, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import Game from './game'
import waitingRoomMock from '../mocks/RoomContext/waitingRoom.json'
import {
  ANSWER_RESULT,
  FINAL_RESULT,
  GAME_START,
  MAKING_TEAMS,
  TEAM_START,
  WAITING_ANSWER,
  WAITING_QUESTION,
  WAITING_ROOM
} from '../constants/gameStates'

const DEFAULT_CONTEXT_VALUE = {
  users: null,
  userName: null,
  userType: null,
  userId: null,
  teams: [],
  room: null,
  isConnected: false,
  isLoading: false,
  gameState: null,
  error: null,
  actions: {}
}

const RoomContext = React.createContext(DEFAULT_CONTEXT_VALUE)

function createDemoRoomState({ roomName, userName }) {
  // Base from existing mock, with the user/room names overridden.
  const demo = JSON.parse(JSON.stringify(waitingRoomMock))

  demo.userName = userName || demo.userName
  demo.room.name = roomName || demo.room.name

  // Ensure stable teams/turn data for the demo flow.
  const [u1, u2, u3, u4] = demo.users
  demo.teams = [
    { id: 'team-1', name: null, members: [u1.id, u2.id], leader: u1.id, points: 0, order: 1 },
    { id: 'team-2', name: null, members: [u3.id, u4.id], leader: u3.id, points: 0, order: 2 }
  ]

  demo.room.round = 1
  demo.room.maxRounds = demo.room.maxRounds ?? 5
  demo.room.currentPlayingTeam = demo.teams[0]
  demo.gameState = WAITING_ROOM
  demo.isConnected = true

  return demo
}

const SocketConnection = () => {
  const socket = useRef()
  const hasApiUrl = Boolean(process.env.GATSBY_API_URL)
  const isDemoDefault = !hasApiUrl

  const [roomState, setRoomState] = useState(DEFAULT_CONTEXT_VALUE)

  const actions = useMemo(() => {
    const mergeRoomState = (patch) =>
      setRoomState((prev) => ({ ...prev, ...patch }))

    const mergeDemoState = (patch) =>
      setRoomState((prev) => ({ ...prev, ...patch, error: null }))

    const setDemoGameState = (nextGameState) => {
      setRoomState((prev) => {
        const next = { ...prev, gameState: nextGameState, error: null }

        // GAME_START is a server-side "setup" step; in demo we jump to MAKING_TEAMS.
        if (nextGameState === GAME_START) {
          next.gameState = MAKING_TEAMS
        }

        if (next.gameState === TEAM_START) {
          next.room = {
            ...next.room,
            currentPlayingTeam: next.room?.currentPlayingTeam ?? next.teams?.[0] ?? null
          }
        }

        if (next.gameState === WAITING_QUESTION) {
          // Ensure the "other team asks a question" path is visible in demo.
          if (next.teams?.length >= 2) {
            next.room = { ...next.room, currentPlayingTeam: next.teams[0] }
            next.userId = next.teams[1].leader
            next.userName =
              next.users?.find((u) => u.id === next.userId)?.name ?? next.userName
            next.userType = 'admin'
          }
        }

        if (next.gameState === WAITING_ANSWER) {
          // Ensure current user is on the playing team so the answer UI shows.
          const playingTeam = next.teams?.[1] ?? next.teams?.[0] ?? null
          if (playingTeam) {
            next.room = { ...next.room, currentPlayingTeam: playingTeam }
            next.userId = playingTeam.leader
            next.userName =
              next.users?.find((u) => u.id === next.userId)?.name ?? next.userName
            next.userType = 'admin'
          }
        }

        return next
      })
    }

    return {
      connectToRoom: (roomName, userName) => {
        if (!hasApiUrl) {
          // Portfolio/demo fallback: allow the UI to run without a backend.
          mergeDemoState(createDemoRoomState({ roomName, userName }))
          return
        }

        mergeRoomState({ isLoading: true, error: null })

        try {
          socket.current = socketIOClient(process.env.GATSBY_API_URL, {
            query: `roomName=${roomName}&userName=${userName}`
          })

          socket.current.on('connection confirmation', () => {
            mergeRoomState({ isConnected: true, isLoading: false })
          })

          socket.current.on('room state', (nextState) => {
            mergeRoomState({ ...nextState, isLoading: false, error: null })
          })

          socket.current.on('connect_error', (err) => {
            mergeRoomState({
              isLoading: false,
              error:
                err?.message ||
                'Could not connect to server. Check GATSBY_API_URL.'
            })
          })

          socket.current.on('server error', (err) => {
            // eslint-disable-next-line no-console
            console.error(err)
            mergeRoomState({
              isLoading: false,
              error: 'Server error. Check backend logs.'
            })
          })

          socket.current.emit('connection confirmation')
        } catch (e) {
          mergeRoomState({
            isLoading: false,
            error: 'Could not initialize socket connection.'
          })
        }
      },
      setGameState: (state) => {
        if (!hasApiUrl || !socket.current) {
          setDemoGameState(state)
          return
        }
        socket.current.emit('game state change', state)
      },
      setTeamName: (payload) => {
        if (!hasApiUrl || !socket.current) {
          setRoomState((prev) => {
            const teams = (prev.teams || []).map((t) =>
              t.id === payload.teamId ? { ...t, name: payload.teamName } : t
            )

            const allNamed = teams.every((t) => Boolean(t.name))
            return {
              ...prev,
              teams,
              gameState: allNamed ? TEAM_START : prev.gameState,
              room: {
                ...prev.room,
                currentPlayingTeam:
                  prev.room?.currentPlayingTeam ?? teams[0] ?? null
              },
              error: null
            }
          })
          return
        }
        socket.current.emit('set team name', payload)
      },
      sendQuestion: (payload) => {
        if (!hasApiUrl || !socket.current) {
          setRoomState((prev) => ({
            ...prev,
            room: {
              ...prev.room,
              currentQuestion: {
                id: 'demo-question',
                content: payload.question,
                creator:
                  prev.users?.find((u) => u.id === payload.userId) ??
                  prev.users?.[0] ??
                  { name: 'Someone' }
              }
            },
            gameState: WAITING_ANSWER,
            error: null
          }))
          return
        }
        socket.current.emit('question', payload)
      },
      sendAnswer: (payload) => {
        if (!hasApiUrl || !socket.current) {
          setRoomState((prev) => {
            const answers = {
              ...(prev.room?.currentQuestion?.answers ?? {}),
              [payload.userId]: payload.value
            }

            const values = Object.values(answers)
            const differentAnswers = new Set(values).size > 1

            return {
              ...prev,
              room: {
                ...prev.room,
                currentQuestion: {
                  ...prev.room.currentQuestion,
                  answers,
                  outcome: { differentAnswers }
                }
              },
              gameState: ANSWER_RESULT,
              error: null
            }
          })
          return
        }
        socket.current.emit('answer', payload)
      },
      enableDemoMode: () => {
        mergeDemoState(createDemoRoomState({ roomName: 'Demo room', userName: 'Demo' }))
      },
      isDemoDefault
    }
  }, [hasApiUrl, isDemoDefault])

  const currentTeam = roomState.teams?.find(team =>
    team.members.includes(roomState.userId))

  const derivedRoomState = {
    isAdmin: roomState.userType === 'admin',
    currentTeam,
    isCurrentTeamTurn: roomState.room?.currentPlayingTeam?.id === currentTeam?.id,
    isTeamLeader: currentTeam?.leader === roomState.userId
  }

  const contextValue = { ...roomState, ...derivedRoomState, actions }

  return (
    <RoomContext.Provider value={contextValue}>
      <Game />
    </RoomContext.Provider>
  )
}

export { RoomContext }
export default SocketConnection
