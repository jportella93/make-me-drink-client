import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'
import { MAKING_TEAMS } from '../../constants/gameStates'

const MakingTeams = () => {
  const {
    users, userName, roomName, actions: { setGameState }
  } = useContext(RoomContext)

  return (
    <>
      Making teams!
    </>
  )
}

export default MakingTeams
