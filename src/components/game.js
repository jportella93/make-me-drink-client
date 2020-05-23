import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'

const Game = ({ onCreateRoom }) => {
  const {
    users, userName, roomName, isConnected
  } = useContext(RoomContext)

  return (
    <>
      {!isConnected &&
        <form onSubmit={onCreateRoom}>
          <label htmlFor="roomName">Room name</label>
          <input type="text" id="roomName" required />
          <br/>
          <label htmlFor="userName">User name</label>
          <input type="text" id="userName" required />
          <br/>
          <input type="submit" />
        </form>
      }
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

Game.propTypes = {
  onCreateRoom: PropTypes.func.isRequired
}

export default Game
