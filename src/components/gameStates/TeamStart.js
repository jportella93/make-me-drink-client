import { Paragraph } from 'grommet'
import React, { useContext } from 'react'
import { WAITING_QUESTION } from '../../constants/gameStates'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { RoomContext } from '../socketConnection'
import Stats from '../stats'

const TeamStart = () => {
  const {
    isAdmin, room: { currentPlayingTeam }, actions: { setGameState }
  } = useContext(RoomContext)

  useDelayedSetGameState(isAdmin, setGameState, WAITING_QUESTION, 5000)

  return <>
    <Stats />
    <Paragraph>
      It&apos;s {currentPlayingTeam.name} turn to answer questions!
    </Paragraph>
  </>
}

export default TeamStart
