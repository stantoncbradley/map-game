import React, { PropTypes } from 'react'
import MapPicture from '../components/ClickImage'

class App extends React.Component {
  componentDidMount() {
    this.props.playAgain()
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        debugger;
        this.props.setCoords(position.coords.latitude, position.coords.longitude);
      });
    } else {
      debugger;
      this.props.setCoords(0,0)
    }
  }

  render() {
    let instructions;
    if (this.props.active) {
      instructions = <h6>Pick the image you think is closest to your area!</h6>
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
