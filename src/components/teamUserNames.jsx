import { useContext } from 'react'
import { RoomContext } from './socketConnection'

const TeamUserNames = ({ team }) => {
  const { users } = useContext(RoomContext)

  const getUserName = (id) => users.find(user => user.id === id).name

  return `${team.name} (${team.members.map(id => getUserName(id)).join(' and ')})`
}

export default TeamUserNames
