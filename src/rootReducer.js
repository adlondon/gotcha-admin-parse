import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './components/Auth/AuthReducer';
import UserReducer from './components/UserReducer';
import DriverReducer from './components/Drivers/DriverReducer';
import AreaReducer from './components/Areas/AreaReducer';
import RideReducer from './components/Rides/RideReducer';
import PassengerReducer from './components/Passengers/PassengerReducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form,
  AuthReducer,
  UserReducer,
  DriverReducer,
  AreaReducer,
  RideReducer,
  PassengerReducer,
});

export default rootReducer;
