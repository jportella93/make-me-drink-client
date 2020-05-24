import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'
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
    {isCurrentTeamTurn
      ? (
        <p>
          Waiting for the other teams to make a question to{' '}
          team <TeamUserNames team={currentPlayingTeam} />
        </p>
      )
      : (
        <>
          <p>
            Make a question to team <TeamUserNames team={currentPlayingTeam} />
          </p>
          <form onSubmit={makeQuestion}>
            <input type="text"
              id="question"
              placeholder="who is more smart?"
              required
            />
            <input type="submit" />
          </form>
        </>
      )
    }
  </>
}

export default WaitingQuestion
