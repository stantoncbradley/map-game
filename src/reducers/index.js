'use strict';

const NUM_PICS = 5;
const MAX_LAT = 70;
const MAX_LONG = 180;
const ZOOM = 9;
const GOOGLE_MAPS_KEY = 'AIzaSyDpPWpOoL02EV4l2GoFlhTxGGn2oBdenlw';

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
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=${ZOOM}&size=200x200&maptype=satellite&key=${GOOGLE_MAPS_KEY}`
}

const generateCoords = (amount, currentLat, currentLong) => {
  const coordAry = [];
  let closest = Infinity;
  for (let i = 0; i < amount; i++) {
    const lat = absRandom(MAX_LAT);
    const long = absRandom(MAX_LONG);
    coordAry.push({
      lat: lat,
      long: long,
      distance: getDistance(lat, long, currentLat, currentLong),
      url: getUrl(lat, long),
      active: true
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
    case 'PLAY_AGAIN':
      const coords = generateCoords(NUM_PICS, state.lat, state.long);
      return Object.assign({}, state, {
        outcome: '',
        active: true,
        coords: coords,
        winningIndex: getIndexOfClosest(coords)
      });
    case 'IMAGE_SELECTED':
      return Object.assign({}, state, {
        active: false,
        outcome: (action.number === state.winningIndex ? 'Winner' : 'Sorry, was picture #' + (state.winningIndex + 1))
      })
    default:
      return state;
  }
}

export default reducer
