import React from 'react';
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import _ from 'underscore';

import { Colors } from '../../config/styles';
import { ProfileDropDown } from './';

const PathsWithoutHeaderContent = [
  '/',
  '/signup',
  '/forgot-password',
  '/reset-password'
];

const showDropDown = (user) => {
  if (user) {
    return <ProfileDropDown user={user} />;
  }
  return '';
};


const headerContent = (route, user) => (
  <div className="pa2 flex justify-between items-center header"
    style={{
      paddingLeft: '20px',
      paddingRight: '20px',
      borderBottom: `5px solid ${Colors.brandPrimary}`
    }}>
    <div className="mw4 flex items-center">
      <img src="/images/logo-3x.png" alt="gotcha-logo" style={{ width: "80px" }} />
    </div>
    {showDropDown(user)}
  </div>
);


const Header = ({ route, user }) => (
  <div className="w-100"
    style={{
      backgroundColor: Colors.white
    }}>
    {!(_.contains(PathsWithoutHeaderContent, route)) && headerContent(route, user)}
  </div>
);

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(Header);
