import { Box, Heading } from 'grommet'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocketConnection from '../components/socketConnection'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box
      width={{ max: '500px', min: '50vw' }}
      alignSelf="center"
      alignContent="stretch"
    >
      <Heading alignSelf="center" margin={{ bottom: 'xlarge' }}>
        Make me Drink! 🍺
      </Heading>
      <SocketConnection />
    </Box>
  </Layout>
)

export default IndexPage
