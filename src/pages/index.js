import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocketConnection from '../components/socketConnection'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <SocketConnection />
  </Layout>
)

export default IndexPage
