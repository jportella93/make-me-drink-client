import { Box, Button, Heading } from 'grommet'
import React, { useContext, useState } from 'react'
import { GAME_START } from '../../constants/gameStates'
import { RoomContext } from '../socketConnection'
import Stats from '../stats'

const FinalResult = () => {
  const { isAdmin, actions: { setGameState } } = useContext(RoomContext)
  const [hasPressed, setPressed] = useState(false)

  function onClick () {
    setPressed(true)
    setGameState(GAME_START)
  }

  return <>
    <Heading>Final result:</Heading>
    <Stats
      inverseSortOrder
      withRound={false}
      highlightCurrentTeam={false}
      sortKey="points"
    />
    {isAdmin && (
      <Box align="end" margin={{ top: 'medium' }}>
        <Button
          disabled={hasPressed}
          onClick={onClick}
          primary
          size="medium"
          label="Play again"
        />
      </Box>
    )}
  </>
}

export default FinalResult
