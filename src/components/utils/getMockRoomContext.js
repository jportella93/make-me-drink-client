const getMockRoomContext = (realContext, mockContext) => {
  return {
    ...mockContext,
    actions: realContext.actions
  }
}

export default getMockRoomContext
