import React, { PropTypes } from 'react'
import MapPicture from '../components/ClickImage'

class App extends React.Component {
  componentDidMount() {
    this.props.playAgain()
    let self = this;
    let success = function(position) {
      console.log('geolocator in navigator!')
      self.props.setCoords(position.coords.latitude, position.coords.longitude);
    }
    let error = function(error) {
      console.warn('Error getting current position. Error code ' + error.code);
      self.props.setCoords(0,0)
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('NO geolocator in navigator!')
      this.props.setCoords(0,0)
    }
  }

  render() {
    let instructions;
    if (this.props.active) {
      instructions = <div>Pick the image you think is closest to your area!</div>
    } else {
      instructions = (
      <div>
        <div>{this.props.outcome}</div>
        <button onClick={this.props.playAgain} className="Button">
          Play again
        </button>
      </div>
    )}
    return (
      <div>
        <div className="app-header">
          <h1>Welcome to Map Game!</h1>
          Current location is lat {this.props.lat}, long {this.props.long}
          {instructions}
        </div>
        <div>
          {this.props.urls.map((url,idx) => {
            return (
              <MapPicture url={url} key={idx} clicked={() => this.props.imageClicked(idx)}/>
            )
          })}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageClicked: PropTypes.func.isRequired,
  playAgain: PropTypes.func.isRequired,
  outcome: PropTypes.string,
  lat: PropTypes.number,
  long: PropTypes.number
}

export default App
