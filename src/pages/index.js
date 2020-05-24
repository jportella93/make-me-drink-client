import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocketConnection from '../components/socketConnection'
import { Grommet } from 'grommet'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  }
}

const IndexPage = () => (
  <Grommet theme={theme}>
    <Layout>
      <SEO title="Home" />
      <SocketConnection />
    </Layout>
  </Grommet>
)

export default IndexPage
