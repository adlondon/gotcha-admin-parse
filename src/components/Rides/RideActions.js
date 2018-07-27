import Parse from 'parse';

import {
  RIDE_LOADING,
  RIDE_LIST,
  RIDE_ERROR,
  SELECTED_RIDE
} from './RideTypes';

function _loading(isLoading) {
  return {
    type: RIDE_LOADING,
    payload: isLoading
  };
}

function _error(error) {
  return {
    type: RIDE_ERROR,
    payload: error
  };
}

function _rideList(rideArr) {
  return {
    type: RIDE_LIST,
    payload: rideArr
  };
}

export const selectRide = rideObj => (dispatch) => {
  dispatch({
    type: SELECTED_RIDE,
    payload: rideObj
  });
};

export const addRide = rideObj => (dispatch) => {
  dispatch(_loading(true));
  const parseFile = new Parse.File('image', rideObj.image);
  parseFile.save()
    .then((image) => {
      Parse.Cloud.run("addRide", { ...rideObj, image })
        .then((res) => {
          dispatch(_rideList(res));
          dispatch(_loading(false));
        });
    })
    .catch((err) => {
      console.log("ADD RIDE ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const editRide = rideObj => (dispatch) => {
  dispatch(_loading(true));
  if (rideObj.image) {
    const parseFile = new Parse.File('image', rideObj.image);
    parseFile.save()
      .then((image) => {
        Parse.Cloud.run("editRide", { ...rideObj, image })
          .then((res) => {
            dispatch(_rideList(res));
            dispatch(_loading(false));
          });
      })
      .catch((err) => {
        console.log("EDIT RIDE ERROR: ", err);
        dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
        dispatch(_loading(false));
      });
  } else {
    Parse.Cloud.run("editRide", rideObj)
      .then((res) => {
        dispatch(_rideList(res));
        dispatch(_loading(false));
      })
      .catch((err) => {
        console.log("EDIT RIDE ERROR: ", err);
        dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
        dispatch(_loading(false));
      });
  }
};

export const deleteRide = rideId => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("deleteRide", { rideId })
    .then((res) => {
      dispatch(_rideList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("DELETE RIDE ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const getRides = initial => (dispatch) => {
  if (initial) dispatch(_loading(true));
  Parse.Cloud.run("getRides")
    .then((res) => {
      dispatch(_rideList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("GET RIDES ERR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};
