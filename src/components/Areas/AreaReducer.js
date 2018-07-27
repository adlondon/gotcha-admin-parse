import {
  AREA_LOADING,
  AREA_LIST,
  AREA_ERROR,
  SELECTED_AREA
} from './AreaTypes';

const INITIAL_STATE = {
  loading: false,
  areaList: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AREA_ERROR:
      return { ...state, error: action.payload };
    case AREA_LOADING:
      return { ...state, loading: action.payload };
    case AREA_LIST:
      return { ...state, areaList: action.payload };
    case SELECTED_AREA:
      return { ...state, selectedArea: action.payload };
    default:
      return state;
  }
}
