import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'

const SelectRoom = () => {
  const {
    actions: { connectToRoom }
  } = useContext(RoomContext)

  return (
    <form onSubmit={connectToRoom}>
      <label htmlFor="roomName">Room name</label>
      <input type="text" id="roomName" required />
      <br/>
      <label htmlFor="userName">User name</label>
      <input type="text" id="userName" required />
      <br/>
      <input type="submit" />
    </form>
  )
}

export default SelectRoom
