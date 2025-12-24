import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Image = () => (
  <StaticImage
    src="../images/gatsby-astronaut.png"
    width={300}
    quality={90}
    alt="Gatsby Astronaut"
    placeholder="blurred"
  />
)

export default Image
