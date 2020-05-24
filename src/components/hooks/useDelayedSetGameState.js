import { useEffect } from 'react'

const useDelayedSetGameState = (isAdmin, setGameState, newGameState, ms) => {
  useEffect(() => {
    if (!isAdmin) return
    const nextGameStateTimeout = setTimeout(() => {
      setGameState(newGameState)
    }, ms)

    return () => clearTimeout(nextGameStateTimeout)
  }, [isAdmin, setGameState, newGameState, ms])
}

export default useDelayedSetGameState
