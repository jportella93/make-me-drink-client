import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'
import { MAKING_TEAMS } from '../../constants/gameStates'

const MINIMUM_USER_NUMBER = 4

const WaitingRoom = () => {
  const {
    users, userName, roomName, isAdmin, actions: { setGameState }
  } = useContext(RoomContext)

  const usersLeftToPlay = MINIMUM_USER_NUMBER - users.length

  return users && (
    <>
      <p>Hi there, {userName}</p>
      <p>Online users in room {roomName}:</p>
      <ul>
        {users.map(({ name, id, type }) => (
          <li key={id}>
            {name}{type === 'admin' && ' 👑'}
          </li>
        ))}
      </ul>
      {usersLeftToPlay > 0
        ? <p>{usersLeftToPlay} more players needed</p>
        : isAdmin
          ? (
            <button
              disabled={usersLeftToPlay > 0}
              onClick={() => setGameState(MAKING_TEAMS)}>
              Start
            </button>
          )
          : <p>
            Waiting for {users.find(({ type }) => type === 'admin').name}{' '}
            to start the game
          </p>
      }
    </>
  )
}

export default WaitingRoom
