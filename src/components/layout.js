import { graphql, useStaticQuery } from 'gatsby'
import { Box, Grommet, Main } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import Header from './header'

import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        height: '20px'
      }
    }
  }

  return (
    <Grommet theme={theme}>
      <Box style={{ minHeight: '100vh' }}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main pad="medium" background="dark-1" justify="center">
          {children}
        </Main>
        <footer></footer>
      </Box>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
