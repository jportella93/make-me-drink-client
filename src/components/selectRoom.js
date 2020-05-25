import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'
import { Box, Form, FormField, TextInput, Button } from 'grommet'

const SelectRoom = () => {
  const {
    actions: { connectToRoom }
  } = useContext(RoomContext)

  function onSubmit (e) {
    e.preventDefault()
    const { roomName, userName } = e.target.elements
    connectToRoom(roomName.value, userName.value)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField required name="roomName" htmlfor="roomName" label="Room name">
        <TextInput autoFocus id="roomName" name="roomName" />
      </FormField>
      <FormField margin={{ top: 'large' }} required name="userName"
        htmlfor="userName" label="User name">
        <TextInput id="userName" name="userName" />
      </FormField>
      <Box pad={{ top: 'xlarge' }} align="end">
        <Button pad={{ top: 'large' }} type="submit" primary label="Submit" />
      </Box>
    </Form>
  )
}

export default SelectRoom
