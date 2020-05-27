import { Clock } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const Countdown = ({ seconds }) => {
  const [countdown, setCountdown] = useState(`PT0H0M${seconds}S`)
  const [run, setRun] = useState('backward')

  useEffect(() => {
    setCountdown(null)
  }, [])

  function onChange (val) {
    if (val === 'P0H0M0S') setRun(false)
  }

  return (
    <Clock
      type="digital"
      time={countdown}
      onChange={onChange}
      run={run} />
  )
}

Countdown.propTypes = { seconds: PropTypes.number.isRequired }

export default Countdown
