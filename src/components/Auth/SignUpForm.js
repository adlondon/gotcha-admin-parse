import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { AuthInput } from './';
import { signUpUser } from './AuthActions';

// components
import { Button, RenderAlert, Loader } from '../common';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ username, password }) {
    this.props.signUpUser(username, password);
  }

  render() {
    const { handleSubmit, error, loading } = this.props;
    return (
      <div>
        {loading ?
          <Loader /> :
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <AuthInput
              name="username"
              type="text"
              label="email address"
              placeholder="Enter Email Address"
              />
            <AuthInput
              name="password"
              type="password"
              label="password"
              placeholder="Create Password"
              />
            <Button classOverrides="w-100" backgroundColor="brandPrimary">Sign Up</Button>
            <RenderAlert error={error} />
          </form>
        }
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = '*required';
  }
  if (!values.password) {
    errors.password = '*required';
  }

  return errors;
}

const mapStateToProps = ({ AuthReducer }) => {
  const { error, authenticated, loading } = AuthReducer;
  return {
    error,
    authenticated,
    loading
  };
};

export default reduxForm({ form: 'signup', validate })(connect(mapStateToProps, {
  signUpUser
})(SignUpForm));
