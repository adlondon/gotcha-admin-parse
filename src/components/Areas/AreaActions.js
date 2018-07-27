import Parse from 'parse';

import {
  AREA_LOADING,
  AREA_LIST,
  AREA_ERROR,
  SELECTED_AREA
} from './AreaTypes';

function _loading(isLoading) {
  return {
    type: AREA_LOADING,
    payload: isLoading
  };
}

function _error(error) {
  return {
    type: AREA_ERROR,
    payload: error
  };
}

function _areaList(areaArr) {
  return {
    type: AREA_LIST,
    payload: areaArr
  };
}

export const selectArea = row => (dispatch) => {
  dispatch({
    type: SELECTED_AREA,
    payload: row
  });
};

export const addArea = areaObj => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("addArea", areaObj)
    .then((res) => {
      dispatch(_areaList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("ADD AREA ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const editArea = areaObj => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("editArea", areaObj)
    .then((res) => {
      dispatch(_areaList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("EDIT AREA ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const deleteArea = areaId => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run("deleteArea", { areaId })
    .then((res) => {
      dispatch(_areaList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("DELETE AREA ERROR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};

export const getAreas = initial => (dispatch) => {
  if (initial) dispatch(_loading(true));
  Parse.Cloud.run("getAreas")
    .then((res) => {
      dispatch(_areaList(res));
      dispatch(_loading(false));
    })
    .catch((err) => {
      console.log("GET AREAS ERR: ", err);
      dispatch(_error(err.message ? err.message.message : "An unkonwn error has occurred. Please try again"));
      dispatch(_loading(false));
    });
};
