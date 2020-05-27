import { Button, Box, DataTable, Text, Paragraph, Stack, Meter } from 'grommet'
import React, { useContext } from 'react'
import { GAME_START } from '../../constants/gameStates'
import { RoomContext } from '../socketConnection'

const MINIMUM_USER_NUMBER = 4

const WaitingRoom = () => {
  const {
    users, userName, room, isAdmin, actions: { setGameState }
  } = useContext(RoomContext)

  const usersLeftToPlay = MINIMUM_USER_NUMBER - users.length

  return users && (
    <Box>
      <DataTable
        pad="small"
        columns={[{
          property: 'name',
          header: (
            <Text>
              Online users in room <Text size="large">{room.name}</Text>
            </Text>
          ),
          primary: true,
          render: ({ name, type }) =>
            `${name}${type === 'admin' ? ' 👑' : ''}`
        }
        ]}
        data={users}
      />
      {usersLeftToPlay > 0
        ? (
          <>
            <Box pad="medium" align="center">
              <Paragraph>At least {usersLeftToPlay} more players needed</Paragraph>
            </Box>
          </>
        )
        : isAdmin
          ? (
            <Button
              alignSelf="end"
              disabled={usersLeftToPlay > 0}
              onClick={() => setGameState(GAME_START)}
              label="Start"
            />
          )
          : <Paragraph>
            Waiting for {users.find(({ type }) => type === 'admin').name}{' '}
            to start the game
          </Paragraph>
      }
    </Box>
  )
}

export default WaitingRoom
