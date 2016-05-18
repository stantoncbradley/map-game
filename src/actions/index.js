'use strict';

export const setCoords = (lat, long) => {
  return {
    type: 'SET_COORDS',
    lat: lat,
    long: long
  }
}

export const playAgain = () => {
  return {
    type: 'PLAY_AGAIN'
  }
}

export const selectImage = (number) => {
  return {
    type: 'IMAGE_SELECTED',
    number: number
  }
}
