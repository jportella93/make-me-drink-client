module.exports = {
  siteMetadata: {
    title: 'Make me drink',
    description: 'Outsmart your friends and make them drink by asking questions in this party game! Perfect as a lockdown game 🦠',
    author: 'Jon Portella'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Make me drink',
        short_name: 'MakeMeDrink',
        start_url: '/',
        background_color: '#111111',
        theme_color: '#111111',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-styled-components'
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
