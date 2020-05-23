import PropTypes from 'prop-types'
import React from 'react'

const SelectRoom = ({ onCreateRoom }) => {
  return (
    <form onSubmit={onCreateRoom}>
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

SelectRoom.propTypes = {
  onCreateRoom: PropTypes.func.isRequired
}

export default SelectRoom
