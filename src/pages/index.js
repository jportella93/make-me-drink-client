import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Game from '../components/game'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Game/>
  </Layout>
)

export default IndexPage
