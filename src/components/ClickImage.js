import React, { PropTypes } from 'react'

const ClickImage = ({ url, clicked }) => (
  <img src={url} onClick={clicked} />
)

ClickImage.propTypes = {
  url: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
}

export default ClickImage
