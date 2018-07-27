import React from 'react';
import { Header } from './common';
import SideBar from './SideBar/SideBar';

const App = ({ children, location }) => {
  const isLoggingIn = (
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === '/confirmation' ||
    location.pathname === '/success' ||
    location.pathname === '/reset');
  return (
    <div>
      <Header route={location.pathname} />
      {!isLoggingIn && <SideBar />}
      <div className={!isLoggingIn ? "content" : null}>{ children }</div>
    </div>
  );
};

export default App;
