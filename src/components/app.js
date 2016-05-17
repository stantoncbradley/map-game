import React, { PropTypes } from 'react'
import MapPicture from '../components/ClickImage'

class App extends React.Component {
  constructor() {
    super();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.props.dispatch(setCoords(position.coords.latitude, position.coords.longitude));
      });
    } else {
      this.props.dispatch(noCoordsProvided())
    }
  }

  render() {
    var self = this;
    return (
      <div>
        <h1>Welcome to Map Game!</h1>
        <h6>Pick the image you think is closest to your area!</h6>
        <div>
          {this.props.urls.map((url,idx) => {
            return (
              <MapPicture url={url} key={idx} clicked={() => self.props.imageClicked(idx)}/>
            )
          })}
        </div>
        <div>{this.props.outcome}</div>
        <button onClick={this.props.playAgain}>
          Play again
        </button>
      </div>
    )
  }
}

App.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageClicked: PropTypes.func.isRequired,
  playAgain: PropTypes.func.isRequired,
  outcome: PropTypes.string
}

export default App
