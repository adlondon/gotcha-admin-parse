import {
  RIDE_LOADING,
  RIDE_LIST,
  RIDE_ERROR,
  SELECTED_RIDE
} from './RideTypes';

const INITIAL_STATE = {
  loading: false,
  rideList: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RIDE_ERROR:
      return { ...state, error: action.payload };
    case RIDE_LOADING:
      return { ...state, loading: action.payload };
    case RIDE_LIST:
      return { ...state, rideList: action.payload };
    case SELECTED_RIDE:
      return { ...state, selectedRide: action.payload };
    default:
      return state;
  }
}
