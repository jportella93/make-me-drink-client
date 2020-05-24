import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'

const SelectRoom = () => {
  const {
    actions: { connectToRoom }
  } = useContext(RoomContext)

  function onSubmit (e) {
    e.preventDefault()
    const { roomName, userName } = e.target.elements
    connectToRoom(roomName.value, userName.value)
  }

  return (
    <form onSubmit={onSubmit}>
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
