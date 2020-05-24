import React, { useContext, useEffect, useState, useCallback } from 'react'
import { RoomContext } from '../socketConnection'
import TeamUserNames from '../teamUserNames'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { ANSWER_RESULT } from '../../constants/gameStates'

const WaitingAnswer = () => {
  const {
    room: { currentQuestion: { content, id, creator }, name },
    isCurrentTeamTurn, currentTeam, isAdmin,
    userId, actions: { sendAnswer: sendAnswerToServer, setGameState }
  } = useContext(RoomContext)

  const [hasAnswered, setHasAnswered] = useState(false)

  const sendAnswer = useCallback((value) => {
    if (hasAnswered) return
    sendAnswerToServer({
      questionId: id,
      userId,
      roomName: name,
      value
    })
    setHasAnswered(true)
  }, [hasAnswered, setHasAnswered, sendAnswerToServer, id, name, userId])

  useEffect(() => {
    if (!isCurrentTeamTurn) return
    const autoFalseAnswerTimeout = setTimeout(() => {
      sendAnswer(false)
    }, 10000)

    return () => clearTimeout(autoFalseAnswerTimeout)
  }, [sendAnswer, isCurrentTeamTurn])

  useDelayedSetGameState(isAdmin, setGameState, ANSWER_RESULT, 10000)

  return <>
    <p>{creator.name} asked &quot;{content}&quot; to{' '}
      <TeamUserNames team={currentTeam} /></p>
    {isCurrentTeamTurn && (
      <>
        <p>Click (and drink) if you think it&apos;s you!</p>
        <button disabled={hasAnswered} onClick={() => sendAnswer(true)}>
            🍺
        </button>
      </>
    )}
    (10 seg)
  </>
}

export default WaitingAnswer
