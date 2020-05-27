import { Box, Button, Form, FormField, Paragraph, Text, TextInput } from 'grommet'
import React, { useContext } from 'react'
import { RoomContext } from '../socketConnection'

const MakingTeams = () => {
  const {
    users, room, userId, currentTeam, isTeamLeader,
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
      <Paragraph margin={{ bottom: 'medium' }}>
        You are teaming up with <Text size="large">{getPartnerNames()}</Text>
      </Paragraph>
      {currentTeam.name
        ? (
          <>
            <Paragraph margin={{ bottom: 'medium' }}>
              Team name: <Text size="large">{currentTeam.name}</Text>
            </Paragraph>
            <Paragraph>
              Waiting for the rest of the teams to choose name...
            </Paragraph>
          </>
        )
        : isTeamLeader
          ? (
            <Form onSubmit={setTeamName}>
              <FormField required name="teamName"
                htmlfor="teamName" label="Team name">
                <TextInput autoFocus id="teamName" name="teamName" />
              </FormField>
              <Box pad={{ top: 'large' }} align="end">
                <Button type="submit" primary label="Submit" />
              </Box>
            </Form>
          )
          : (
            <Paragraph>
              Waiting for <Text size="large">{getLeaderName()}</Text>{' '}
              to choose a team name
            </Paragraph>
          )
      }
    </>
  )
}

export default MakingTeams
