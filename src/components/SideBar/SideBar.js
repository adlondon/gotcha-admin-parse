import React, { Component } from 'react';
// import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";

import SideBarView from './SideBarView';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(route) {
    browserHistory.push(`/${route}`);
  }

  render() {
    return (
      <SideBarView
        props={this.props}
        onClick={this.handleClick}
        />
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Sidebar);
