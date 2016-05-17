'use strict';

const numPics = 5;
const maxLat = 90;
const maxLong = 180;
const googleMapsKey = 'AIzaSyDpPWpOoL02EV4l2GoFlhTxGGn2oBdenlw';

const defaultState = {
  coords: [],
  lat: 0,
  long: 0,
  winningIndex: NaN,
  outcome: ''
}

const absRandom = (max) => {
  return Math.floor((Math.random() * max * 2) - max)
}

const getDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))   // Pythagorean theorem
}

const getUrl = (lat, long) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=200x200&maptype=satellite&key=${googleMapsKey}`
}

const generateCoords = (amount, currentLat, currentLong) => {
  const coordAry = [];
  let closest = Infinity;
  for (let i = 0; i < amount; i++) {
    const lat = absRandom(maxLat);
    const long = absRandom(maxLong);
    coordAry.push({
      lat: lat,
      long: long,
      distance: getDistance(lat, long, currentLat, currentLong),
      url: getUrl(lat, long)
    })
  }
  return coordAry;
}

function getIndexOfClosest(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let min = arr[0].distance;
    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].distance > min) {
            minIndex = i;
            min = arr[i];
        }
    }
    return minIndex;
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_COORDS':
      return Object.assign({}, state, {lat: action.lat, long: action.long})
    case 'NO_COORDS':
      return Object.assign({}, state, {lat: 30, long: 100}) //TODO handle
    case 'PLAY_AGAIN':
      const coords = generateCoords(numPics, state.lat, state.long);
      return Object.assign({}, state, {
        outcome: '',
        coords: coords,
        winningIndex: getIndexOfClosest(coords)
      });
    case 'IMAGE_SELECTED':
      debugger;
      return Object.assign({}, state, {
        outcome: (action.number === state.winningIndex ? 'Winner' : 'Sorry, was picture #' + (state.winningIndex + 1))
      })
    default:
      return state;
  }
}

export default reducer
