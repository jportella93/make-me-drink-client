import React, { useContext, useEffect } from 'react'
import { WAITING_QUESTION } from '../../constants/gameStates'
import { RoomContext } from '../socketConnection'

const TeamStart = () => {
  const {
    users, teams, isAdmin, room, actions: { setGameState }
  } = useContext(RoomContext)

  const sortedTeams = teams.sort((a, b) =>
    ((a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)))

  const getUserName = (id) => users.find(user => user.id === id).name

  useEffect(() => {
    if (!isAdmin) return
    const nextGameStateTimeout = setTimeout(() => {
      setGameState(WAITING_QUESTION)
    }, 5000)

    return () => clearTimeout(nextGameStateTimeout)
  }, [isAdmin, setGameState])

  return <>
    <ol>
      {sortedTeams.map(team =>
        <li key={team.id}>
          {team.name} ({team.members.map(id => getUserName(id)).join(' and ')})
        </li>
      )}
    </ol>
    <p>It&apos;s {room.currentPlayingTeam.name} turn!</p>
  </>
}

export default TeamStart
