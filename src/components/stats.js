import { DataTable, Paragraph, Text, Stack, Meter, Box } from 'grommet'
import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'
import PropTypes from 'prop-types'

const Stats = ({
  withRound = true, highlightCurrentTeam = true, sortKey = 'order', inverseSortOrder = false
}) => {
  const {
    teams, users, room: { currentPlayingTeam, round, maxRounds }
  } = useContext(RoomContext)

  const sortedTeams = teams.sort((a, b) =>
    ((a[sortKey] > b[sortKey]) ? 1 : ((b[sortKey] > a[sortKey]) ? -1 : 0)))

  const getUserName = (id) => users.find(user => user.id === id).name

  const highlightCurrentTeamProps = highlightCurrentTeam
    ? {
      rowProps: {
        [currentPlayingTeam.name]: { background: 'accent-1' }
      }
    }
    : {}

  return <>
    {withRound && <Box align="center" pad="large">
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
    </Box>}
    <DataTable
      pad="small"
      columns={[
        {
          property: 'name',
          header: (
            <Text>Team</Text>
          ),
          primary: true
        },
        {
          property: 'members',
          header: (
            <Text>Players</Text>
          ),
          render: ({ members }) => members.map(getUserName).join(', ')
        },
        {
          property: 'points',
          header: (
            <Text>Points</Text>
          )
        }
      ]}
      data={inverseSortOrder ? sortedTeams.reverse() : sortedTeams}
      {...highlightCurrentTeamProps}
    />
  </>
}

Stats.propTypes = {
  withRound: PropTypes.bool,
  highlightCurrentTeam: PropTypes.bool,
  inverseSortOrder: PropTypes.bool,
  sortKey: PropTypes.oneOf(['order', 'points'])
}

export default Stats
