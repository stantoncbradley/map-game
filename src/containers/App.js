import React from 'react'
import { connect } from 'react-redux'
import { playAgain, selectImage, setCoords } from '../actions'
import AppComponent from '../components/App'

const mapStateToProps = (state) => {
  return {
    urls: state.coords.map(coord => (coord.url)),
    outcome: state.outcome,
    active: state.active,
    lat: state.lat,
    long: state.long
  }
}

const dispatchProps = (dispatch) => {
  return {
    setCoords: (lat, long) => {
      dispatch(setCoords(lat, long))
    },
    playAgain: () => {
      dispatch(playAgain())
    },
    selectImage: (index) => {
      dispatch(selectImage(index))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectImage } = dispatchProps;
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    imageClicked: (index) => {
      if (stateProps.active) {
        selectImage(index)
      }
    }
  }
}

const App = connect(
  mapStateToProps,
  dispatchProps,
  mergeProps
)(AppComponent)

export default App
