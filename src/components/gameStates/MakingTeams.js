import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'

const MakingTeams = () => {
  const {
    users, userName, room, userId, currentTeam, isTeamLeader,
    actions: { setTeamName: setTeamNameToServer }
  } = useContext(RoomContext)

  const getPartnerNames = () => {
    const partnerArray = []
    currentTeam.members.forEach(id => {
      const user = users.find((user) => id === user.id && id !== userId)
      if (!user) return
      partnerArray.push(user.name)
    })
    return partnerArray.join(' and ')
  }

  const getLeaderName = () =>
    users.find(user => user.id === currentTeam.leader).name

  function setTeamName (e) {
    e.preventDefault()
    const { teamName } = e.target.elements
    setTeamNameToServer({
      teamName: teamName.value,
      teamId: currentTeam.id,
      roomName: room.name
    })
  }

  return (
    <>
      <p>User: {userName}</p>
      <p>You are teaming up with {getPartnerNames()}</p>
      {currentTeam.name
        ? <p>Team name: {currentTeam.name}</p>
        : isTeamLeader
          ? (
            <form onSubmit={setTeamName}>
              <label htmlFor="teamName">Team name</label>
              <input type="text" id="teamName" required />
              <input type="submit" />
            </form>
          )
          : <p>Waiting for {getLeaderName()} to choose a team name</p>
      }
    </>
  )
}

export default MakingTeams
