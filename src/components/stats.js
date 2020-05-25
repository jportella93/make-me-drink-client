import { DataTable, Paragraph, Text, Stack, Meter, Box } from 'grommet'
import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'

const Stats = () => {
  const {
    teams, users, room: { currentPlayingTeam, round, maxRounds }
  } = useContext(RoomContext)

  const sortedTeams = teams.sort((a, b) =>
    ((a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)))

  const getUserName = (id) => users.find(user => user.id === id).name

  return <>
    <Box align="center" pad="large">
      <Paragraph>Round</Paragraph>
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          values={[{ value: round * 100 / maxRounds }]}
          size="xsmall"
          thickness="small"
        />
        <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
          <Text size="xlarge" weight="bold">
            {round} <Text size="small" weight="bold">/ 5</Text>
          </Text>
        </Box>
      </Stack>
    </Box>
    <DataTable
      pad="small"
      columns={[
        {
          property: 'name',
          header: (
            <Text>Team</Text>
          ),
          primary: true,
          render: ({ id, name }) =>
            `${id === currentPlayingTeam.id ? '-> ' : ''}${name}`
        },
        {
          property: 'members',
          header: (
            <Text>Players</Text>
          ),
          primary: true,
          render: ({ members }) => members.map(getUserName).join(', ')
        },
        {
          property: 'points',
          header: (
            <Text>Points</Text>
          ),
          primary: true
        }
      ]}
      data={sortedTeams}
    />
  </>
}

export default Stats
