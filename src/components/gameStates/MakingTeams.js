import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'

const MakingTeams = () => {
  const {
    users, userName, teams
  } = useContext(RoomContext)

  const getPartnerNames = () => {
    const currentUserId = users.find(({ name }) => name === userName).id
    const currentTeam = teams.find(team => team.includes(currentUserId))
    const partnerArray = []
    currentTeam.forEach(id => {
      const user = users.find((user) => id === user.id && id !== currentUserId)
      if (!user) return
      partnerArray.push(user.name)
    })
    return partnerArray.join(', ')
  }

  return (
    <>
      <p>User: {userName}</p>
      <p>You are teaming up with {getPartnerNames()}</p>
    </>
  )
}

export default MakingTeams
