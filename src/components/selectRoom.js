import React, { useContext } from "react";
import { RoomContext } from "./socketConnection";
import { Box, Form, FormField, TextInput, Button, Heading } from "grommet";
import Spinner from "./Spinner";

const SelectRoom = () => {
  const {
    isLoading,
    actions: { connectToRoom },
  } = useContext(RoomContext);

  function onSubmit(e) {
    e.preventDefault();
    const { roomName, userName } = e.target.elements;
    connectToRoom(roomName.value, userName.value);
  }

  return (
    <>
      <Heading alignSelf="center" margin={{ bottom: "xlarge" }}>
        Make me Drink! 🍺
      </Heading>
      <Form onSubmit={onSubmit}>
        <FormField
          required
          name="roomName"
          htmlfor="roomName"
          label="Room name"
        >
          <TextInput autoFocus id="roomName" name="roomName" />
        </FormField>
        <FormField
          margin={{ top: "large" }}
          required
          name="userName"
          htmlfor="userName"
          label="User name"
        >
          <TextInput id="userName" name="userName" />
        </FormField>
        <Box pad={{ top: "xlarge" }} align="end">
          <Button
            icon={isLoading ? <Spinner /> : null}
            pad={{ top: "large" }}
            type="submit"
            primary
            label={isLoading ? "Loading" : "Submit"}
          />
        </Box>
      </Form>
    </>
  );
};

export default SelectRoom;
