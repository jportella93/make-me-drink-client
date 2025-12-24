import React, { useContext } from 'react'
import { RoomContext } from './socketConnection'
import { Box, Form, FormField, TextInput, Button, Heading, Paragraph, Text } from 'grommet'
import Spinner from './Spinner'

const SelectRoom = () => {
  const {
    isLoading,
    error,
    actions: { connectToRoom, enableDemoMode, isDemoDefault }
  } = useContext(RoomContext)

  function onSubmit(e) {
    e.preventDefault()
    const { roomName, userName } = e.target.elements
    connectToRoom(roomName.value, userName.value)
  }

  return (
    <>
      <Heading alignSelf="center" margin={{ bottom: 'xlarge' }}>
        Make me Drink! 🍺
      </Heading>
      {isDemoDefault && (
        <Paragraph margin={{ bottom: 'medium' }}>
          <Text weight="bold">Demo mode:</Text> no backend URL configured, so the app
          will run locally with mocked data. To play multiplayer, set{' '}
          <Text weight="bold">GATSBY_API_URL</Text>.
        </Paragraph>
      )}
      {error && (
        <Paragraph margin={{ bottom: 'medium' }} color="status-critical">
          {error}
        </Paragraph>
      )}
      <Form onSubmit={isLoading ? null : onSubmit}>
        <FormField required name="roomName" htmlfor="roomName"
          label="Room name">
          <TextInput autoFocus id="roomName" name="roomName" />
        </FormField>
        <FormField margin={{ top: 'large' }} required name="userName"
          htmlfor="userName" label="User name">
          <TextInput id="userName" name="userName" />
        </FormField>
        <Box pad={{ top: 'xlarge' }} align="end">
          <Button pad={{ top: 'large' }} type='submit' primary label={isLoading ? 'Loading' : 'Submit'} icon={isLoading ? <Spinner /> : null} />
        </Box>
      </Form>
      <Box pad={{ top: 'medium' }} align="end">
        <Button
          onClick={enableDemoMode}
          secondary
          label="Try demo mode"
        />
      </Box>
    </>
  )
}

export default SelectRoom
