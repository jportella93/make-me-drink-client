import React, { useContext, useState } from 'react'
import { GAME_START } from '../../constants/gameStates'
import { RoomContext } from '../socketConnection'
import TeamUserNames from '../teamUserNames'

const FinalResult = () => {
  const {
    room: { teams },
    isAdmin, actions: { setGameState }
  } = useContext(RoomContext)

  const [hasPressed, setPressed] = useState(false)

  const sortedTeams = teams.sort((a, b) =>
    ((a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0)))

  function onClick () {
    setPressed(true)
    setGameState(GAME_START)
  }

  return <>
    <div>
      <h1>Final result:</h1>
      <ol>
        {sortedTeams.map(team =>
          <li key={team.id}>
            <TeamUserNames team={team} />: {team.points}
          </li>
        )}
      </ol>
    </div>
    { isAdmin && (
      <button
        disabled={hasPressed}
        onClick={onClick}>
          Play again!
      </button>
    )}
  </>
}

export default FinalResult
