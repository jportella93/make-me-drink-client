import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'
import { MAKING_TEAMS } from '../../constants/gameStates'

const WaitingRoom = () => {
  const {
    users, userName, roomName, actions: { setGameState }
  } = useContext(RoomContext)

  return (
    <>
      {userName && <h3>Your name: {userName}</h3>}
      {users &&
        <>
        Online users in room {roomName}:
          <ul>
            {users.map(({ name, id, type }) => (
              <li key={id}>
                {name}{type === 'admin' && ' 👑'}
              </li>
            ))}
          </ul>
          <button onClick={() => setGameState(MAKING_TEAMS)}>
          Start
          </button>
        </>
      }
    </>
  )
}

export default WaitingRoom
