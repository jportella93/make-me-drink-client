import { Box } from 'grommet'
import React, { useContext } from 'react'
import { TEAM_START, WAITING_QUESTION } from '../../constants/gameStates'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { RoomContext } from '../socketConnection'

const AnswerResult = () => {
  const {
    room: { currentQuestion: { outcome, answers } },
    users, isAdmin, actions: { setGameState }
  } = useContext(RoomContext)

  const nextGameState = outcome.differentAnswers ? WAITING_QUESTION : TEAM_START

  useDelayedSetGameState(isAdmin, setGameState, nextGameState, 3000)

  const boxStyle = { fontSize: '35px', lineHeight: '72px' }

  return <>
    <Box style={boxStyle} margin="large" align="center">
      {Object.entries(answers).map(([userId, value]) => {
        const user = users.find((user) => user.id === userId)
        return <p key={user.id}>{user.name} {value ? '🍺' : '❌'}</p>
      })}
    </Box>
  </>
}

export default AnswerResult
