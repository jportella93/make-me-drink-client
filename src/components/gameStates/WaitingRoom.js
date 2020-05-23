import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'

const WaitingRoom = () => {
  const {
    users, userName, roomName
  } = useContext(RoomContext)

  return (
    <>
      {userName && <h3>{userName}</h3>}
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
        </>
      }
    </>
  )
}

export default WaitingRoom
