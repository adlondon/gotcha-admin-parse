import React from 'react';
import { User, Users, TrendingUp, Zap, Map } from 'react-feather';

const SideBarView = ({
  onClick
}) => (
  <div className="fade-in sidebar-wrapper">

    <div role="button" onClick={() => onClick("drivers")} className="sidebar-item items-center"><User className=" sidebar-item-icon" />Drivers</div>
    <div role="button" onClick={() => onClick("passengers")} className="sidebar-item items-center"><Users className=" sidebar-item-icon" />Passengers</div>
    <div role="button" onClick={() => onClick("areas")} className="sidebar-item items-center"><Map className=" sidebar-item-icon" />Areas</div>
    <div role="button" onClick={() => onClick("rides")} className="sidebar-item items-center"><Zap className=" sidebar-item-icon" />Gotcha Rides</div>
    <div role="button" onClick={() => onClick("stats")} className="sidebar-item items-center"><TrendingUp className=" sidebar-item-icon" />Stats</div>
  </div>
);

export default SideBarView;

// <div role="button" onClick={() => onClick("")} className="sidebar-item"><i className="fa fa-sign-out sidebar-item-icon" />Sign Out</div>
// <div role="button" onClick={() => onClick("super-admins")} className="sidebar-item"><i className="fa fa-users sidebar-item-icon" />Super Admins</div>
// <div role="button" onClick={() => onClick("local-admins")} className="sidebar-item"><i className="fa fa-users sidebar-item-icon" />Local Admins</div>
