import axios from 'axios';

/**
 * Gives a list of potential locations to create service area
 * @param {string} input - id of the user who is currently logged in
 * @return {PROMISE - array_of - locations { name: string, location: [lat, lng] } } payload - returns a payload of possible locations
 */

const GOOGLE_KEY = "AIzaSyDWlrg_RUk5IpKkcLejy9UNIcHsRsA9ziI";

function findPossibleLocations(input) {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${GOOGLE_KEY}`)
      .then(res => resolve(res.data.results))
      .catch(err => reject(err));
  });
}

export default findPossibleLocations;
