import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'
import { WAITING_ROOM, SELECT_ROOM, MAKING_TEAMS, TEAM_START, WAITING_QUESTION, WAITING_ANSWER, ANSWER_RESULT, FINAL_RESULT } from '../constants/gameStates'
import SelectRoom from './selectRoom'
import WaitingRoom from './gameStates/WaitingRoom'

const Game = ({ onCreateRoom }) => {
  const {
    isConnected, gameState
  } = useContext(RoomContext)

  /* eslint-disable react/jsx-key */
  const gameStates = new Map([
    [WAITING_ROOM, <WaitingRoom />]
    // [MAKING_TEAMS, <MakingTeams />]
    // [TEAM_START, <TeamStart />]
    // [WAITING_QUESTION, <WaitingQuestion />]
    // [WAITING_ANSWER, <WaitingAnswer />]
    // [ANSWER_RESULT, <AnswerResult />]
    // [FINAL_RESULT, <FinalResult />]
  ])
  /* eslint-enable react/jsx-key */

  return isConnected && gameState
    ? gameStates.get(gameState)
    : <SelectRoom onCreateRoom={onCreateRoom} />
}

Game.propTypes = {
  onCreateRoom: PropTypes.func.isRequired
}

export default Game
