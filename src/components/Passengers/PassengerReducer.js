import {
  PASSENGER_LOADING,
  PASSENGER_LIST,
  PASSENGER_ERROR
} from './PassengerTypes';

const INITIAL_STATE = {
  loading: false,
  passengerList: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PASSENGER_ERROR:
      return { ...state, error: action.payload };
    case PASSENGER_LOADING:
      return { ...state, loading: action.payload };
    case PASSENGER_LIST:
      return { ...state, passengerList: action.payload };
    default:
      return state;
  }
}
