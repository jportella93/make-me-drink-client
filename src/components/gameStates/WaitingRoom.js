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
            {users.map(({ name, id }) => (<li key={id}>{name}</li>))}
          </ul>
        </>
      }
    </>
  )
}

export default WaitingRoom
