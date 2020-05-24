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
        <TextInput id="roomName" name="roomName" />
      </FormField>
      <FormField required name="userName" htmlfor="userName" label="User name">
        <TextInput id="userName" name="userName" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
      </Box>
    </Form>
  )
}

export default SelectRoom
