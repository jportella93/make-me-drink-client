import React, { useContext } from 'react'
import { WAITING_ROOM, MAKING_TEAMS, TEAM_START, WAITING_QUESTION } from '../constants/gameStates'
import WaitingRoom from './gameStates/WaitingRoom'
import MakingTeams from './gameStates/MakingTeams'
import SelectRoom from './selectRoom'
import { RoomContext } from './socketConnection'
import TeamStart from './gameStates/TeamStart'

const Game = () => {
  const {
    isConnected, gameState
  } = useContext(RoomContext)

  /* eslint-disable react/jsx-key */
  const gameStates = new Map([
    [WAITING_ROOM, <WaitingRoom />],
    [MAKING_TEAMS, <MakingTeams />],
    [TEAM_START, <TeamStart />],
    // [WAITING_ANSWER, <WaitingAnswer />]
    // [ANSWER_RESULT, <AnswerResult />]
    // [FINAL_RESULT, <FinalResult />]
  ])
  /* eslint-enable react/jsx-key */

  return isConnected && gameState
    ? gameStates.get(gameState)
    : <SelectRoom />
}

export default Game
