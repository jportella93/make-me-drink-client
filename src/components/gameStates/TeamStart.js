import React, { useContext } from 'react'
import { WAITING_QUESTION } from '../../constants/gameStates'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { RoomContext } from '../socketConnection'
import TeamUserNames from '../teamUserNames'

const TeamStart = () => {
  const {
    teams, isAdmin, room: { currentPlayingTeam, round, maxRounds },
    actions: { setGameState }
  } = useContext(RoomContext)

  const sortedTeams = teams.sort((a, b) =>
    ((a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)))

  useDelayedSetGameState(isAdmin, setGameState, WAITING_QUESTION, 5000)

  return <>
    <p>Round {round}/{maxRounds}</p>
    <ol>
      {sortedTeams.map(team =>
        <li key={team.id}>
          <TeamUserNames team={team}/>
        </li>
      )}
    </ol>
    <p>It&apos;s {currentPlayingTeam.name} turn to answer questions!</p>
  </>
}

export default TeamStart
