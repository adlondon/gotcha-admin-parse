import {
  DRIVER_LOADING,
  DRIVER_LIST,
  DRIVER_ERROR
} from './DriverTypes';

const INITIAL_STATE = {
  loading: false,
  driverList: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DRIVER_ERROR:
      return { ...state, error: action.payload };
    case DRIVER_LOADING:
      return { ...state, loading: action.payload };
    case DRIVER_LIST:
      return { ...state, driverList: action.payload };
    default:
      return state;
  }
}
