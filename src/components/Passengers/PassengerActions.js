import Parse from 'parse';

import {
  PASSENGER_LOADING,
  PASSENGER_LIST,
  PASSENGER_ERROR
} from './PassengerTypes';

function _loading(isLoading) {
  return {
    type: PASSENGER_LOADING,
    payload: isLoading
  };
}

function _error(error) {
  return {
    type: PASSENGER_ERROR,
    payload: error
  };
}

function _passengerList(passengerArr) {
  return {
    type: PASSENGER_LIST,
    payload: passengerArr
  };
}

export const deletePassenger = passengerId => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("deletePassenger", { passengerId })
    .then((res) => {
      dispatch(_passengerList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("DELETE PASSENGER ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const getPassengers = initial => (dispatch) => {
  if (initial) dispatch(_loading(true));
  Parse.Cloud.run("getPassengers")
    .then((res) => {
      dispatch(_passengerList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("GET PASSENGERS ERR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};
