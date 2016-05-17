'use strict';

export const setCoords = (lat, long) => {
  return {
    type: 'SET_COORDS',
    lat: lat,
    long: long
  }
}

export const noCoordsProvided = () => {
  return {
    type: 'NO_COORDS'
  }
}
export const playAgain = () => {
  return {
    type: 'PLAY_AGAIN'
  }
}

export const selectImage = (number) => {
  debugger;
  return {
    type: 'IMAGE_SELECTED',
    number: number
  }
}
