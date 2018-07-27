import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class OutsideClicker extends Component {
  handleClickOutside() {
    this.props.handleToggle();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default onClickOutside(OutsideClicker);
