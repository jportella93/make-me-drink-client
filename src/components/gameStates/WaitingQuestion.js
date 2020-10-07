import { Box, Button, Form, FormField, Paragraph, TextInput } from 'grommet'
import styled from 'styled-components'
import React, { useContext, useState } from 'react'
import { RoomContext } from '../socketConnection'
import Stats from '../stats'
import TeamUserNames from '../teamUserNames'
import questions from '../data/questions'
import getRandomInt from '../utils/getRandomInt'

const GlowingButton = styled(Button)`
  font-size: 20px;
  animation: glow 0.7s ease-in-out infinite alternate;
`;

const WaitingQuestion = () => {
  const {
    room: { name, currentPlayingTeam }, userId, isCurrentTeamTurn, currentTeam,
    actions: { sendQuestion: sendQuestionToServer }
  } = useContext(RoomContext)

  const getRandomQuestion = () => questions[getRandomInt(0, questions.length)]

  const [question, setQuestion] = useState('')

  function makeQuestion (e) {
    e.preventDefault()
    const { question } = e.target.elements
    sendQuestionToServer({
      question: question.value,
      teamId: currentTeam.id,
      roomName: name,
      userId
    })
  }

  return <>
    <Stats />
    {isCurrentTeamTurn
      ? (
        <Paragraph>
          Waiting for the other teams to make a question to{' '}
          team <TeamUserNames team={currentPlayingTeam} />
        </Paragraph>
      )
      : (
        <>
          <Paragraph>
            Make a question to team <TeamUserNames team={currentPlayingTeam} />
          </Paragraph>
          <Form onSubmit={makeQuestion}>
            <FormField required name="question" htmlfor="question">
              <TextInput autoFocus
                id="question" name="question" value={question}
                onChange={event => setQuestion(event.target.value)} />
            </FormField>
            <GlowingButton label="💡"
              onClick={() => setQuestion(getRandomQuestion())}
              secondary size="small"
            />
            <Box pad={{ top: 'xlarge' }} align="end">
              <Button pad={{ top: 'large' }} type="submit"
                primary label="Submit" />
            </Box>
          </Form>
        </>
      )
    }
  </>
}

export default WaitingQuestion
