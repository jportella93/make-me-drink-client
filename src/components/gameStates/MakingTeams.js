import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'
import { Paragraph, Text, Form, FormField, TextInput, Box, Button } from 'grommet'

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
      <Paragraph>You are teaming up with <Text size="large">{getPartnerNames()}</Text></Paragraph>
      {currentTeam.name
        ? <Paragraph>Team name: <Text size="large">{currentTeam.name}</Text></Paragraph>
        : isTeamLeader
          ? (
            <Form onSubmit={setTeamName}>
              <FormField required name="teamName" htmlfor="teamName" label="Team name">
                <TextInput autoFocus id="teamName" name="teamName" />
              </FormField>
              <Box align="end">
                <Button type="submit" primary label="Submit" />
              </Box>
            </Form>
          )
          : <Paragraph>Waiting for <Text size="large">{getLeaderName()}</Text> to choose a team name</Paragraph>
      }
    </>
  )
}

export default MakingTeams
