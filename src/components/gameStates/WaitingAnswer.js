import { Box, Button, Paragraph, Text } from 'grommet'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ANSWER_RESULT } from '../../constants/gameStates'
import Countdown from '../countdown'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { RoomContext } from '../socketConnection'
import TeamUserNames from '../teamUserNames'

const WaitingAnswer = () => {
  const {
    room: {
      currentPlayingTeam,
      currentQuestion: { content, id, creator }, name
    },
    isCurrentTeamTurn, isAdmin,
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

  useDelayedSetGameState(isAdmin, setGameState, ANSWER_RESULT, 11000)

  const styles = {
    btn: { fontSize: '72px', textAlign: 'center' },
    btnWrapper: { height: '142px', width: '142px' }
  }

  return <>
    <Box align="center">
      <Paragraph><Text size="large">{creator.name}</Text> asked:</Paragraph>
      <Paragraph><Text size="large" weight="bold">
        {content}
        {/* &quot;{content}&quot; */}
      </Text></Paragraph>
      <Paragraph>to <TeamUserNames team={currentPlayingTeam} /></Paragraph>
      {isCurrentTeamTurn && (
        <>
          <Box margin="large" align="center">
            <Paragraph>Click (and drink) if you think it&apos;s you!</Paragraph>
            <Button disabled={hasAnswered}
              onClick={() => sendAnswer(true)}
              style={styles.btnWrapper}
              size="large"
              icon={<div style={styles.btn}>🍺</div>}
              primary
            />
          </Box>
        </>
      )}
      <Countdown seconds={10} />
    </Box>
  </>
}

export default WaitingAnswer
