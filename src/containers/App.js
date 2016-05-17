import React from 'react'
import { connect } from 'react-redux'
import { playAgain, selectImage } from '../actions'
import AppComponent from '../components/App'

const mapStateToProps = (state) => {
  return {
    urls: state.coords.map(coord => (coord.url)),
    outcome: state.outcome
  }
}

const dispatchProps = (dispatch) => {
  return {
    playAgain: () => {
      dispatch(playAgain())
    },
    imageClicked: (index) => {
      dispatch(selectImage(index))
    }
  }
}

const App = connect(
  mapStateToProps,
  dispatchProps
)(AppComponent)

export default App
