import React, { useContext } from 'react'
import { TEAM_START, WAITING_QUESTION } from '../../constants/gameStates'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { RoomContext } from '../socketConnection'
import TeamUserNames from '../teamUserNames'

const AnswerResult = () => {
  const {
    room: { teams, currentPlayingTeam, currentQuestion: { outcome, answers } },
    users, isAdmin, actions: { setGameState }
  } = useContext(RoomContext)

  const nextGameState = outcome.differentAnswers ? WAITING_QUESTION : TEAM_START

  useDelayedSetGameState(isAdmin, setGameState, nextGameState, 5000)

  return <>
    <div>
      {Object.entries(answers).map(([userId, value]) => {
        const user = users.find((user) => user.id === userId)
        return <p key={user.id}>{user.name} {value ? '🍺' : '❌'}</p>
      })}
    </div>
    <p>
      {outcome.differentAnswers
        ? <>Answers were different so team <TeamUserNames team={currentPlayingTeam} /> keep playing</>
        : <>Answers were not different so it&apos;s next team&apos;s turn</>
      }
    </p>
    <div>
      {Object.entries(outcome.pointsUpdate).map(([teamId, pointsUpdate]) => {
        const team = teams.find((team) => team.id === teamId)
        return (
          <p key={team.id}>
            {team.name} {team.points - pointsUpdate} ➡️ {team.points}
          </p>
        )
      })}
    </div>
  </>
}

export default AnswerResult
