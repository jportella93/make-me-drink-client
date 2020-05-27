import { Box, Button, Form, FormField, Paragraph, TextInput } from 'grommet'
import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'
import Stats from '../stats'
import TeamUserNames from '../teamUserNames'

const WaitingQuestion = () => {
  const {
    room: { name, currentPlayingTeam }, userId, isCurrentTeamTurn, currentTeam,
    actions: { sendQuestion: sendQuestionToServer }
  } = useContext(RoomContext)

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
              <TextInput autoFocus placeholder="Who is smarter?"
                id="question" name="question" />
            </FormField>
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
