import Parse from 'parse';

import {
  DRIVER_LOADING,
  DRIVER_LIST,
  DRIVER_ERROR
} from './DriverTypes';

function _loading(isLoading) {
  return {
    type: DRIVER_LOADING,
    payload: isLoading
  };
}

function _error(error) {
  return {
    type: DRIVER_ERROR,
    payload: error
  };
}

function _driverList(driverArr) {
  return {
    type: DRIVER_LIST,
    payload: driverArr
  };
}

export const addDriver = driverObj => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("addDriver", driverObj)
    .then((res) => {
      dispatch(_driverList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("ADD DRIVER ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const deleteDriver = driverId => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("deleteDriver", { driverId })
    .then((res) => {
      dispatch(_driverList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("DELETE DRIVER ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const getDrivers = initial => (dispatch) => {
  if (initial) dispatch(_loading(true));
  Parse.Cloud.run("getDrivers")
    .then((res) => {
      dispatch(_driverList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("GET DRIVERS ERR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};
