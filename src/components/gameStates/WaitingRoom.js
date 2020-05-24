import React, { useContext } from 'react'
import { GAME_START } from '../../constants/gameStates'
import { RoomContext } from '../socketConnection'

const MINIMUM_USER_NUMBER = 2

const WaitingRoom = () => {
  const {
    users, userName, room, isAdmin, actions: { setGameState }
  } = useContext(RoomContext)

  const usersLeftToPlay = MINIMUM_USER_NUMBER - users.length

  return users && (
    <>
      <p>Hi there, {userName}</p>
      <p>Online users in room {room.name}:</p>
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
              onClick={() => setGameState(GAME_START)}>
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
