import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import { Card, CenterThis, FullScreenCenter } from '../common';
import { SignInForm, SignUpForm } from './';
import { clearError } from './AuthActions';

class AuthView extends Component {
  componentDidMount() {
    this.props.clearError();
  }

  render() {
    return (
      <FullScreenCenter>
        <div className="w-100">
          <CenterThis>
            <div className="mw5 mb5 mt6">
              <img src="/images/logo-3x.png" alt="gotcha-logo" />
            </div>
          </CenterThis>
          <CenterThis>
            <Card classOverrides="mw6" borderRadius="medium" bottomColor="nearWhite">
              { this.props.route.authType === 'signin' ?
                <SignInForm /> :
                <SignUpForm />
              }
            </Card>
          </CenterThis>
          <CenterThis>
            <div className="underline pointer mt4 p5 brand-primary mb6" role="button" onClick={() => browserHistory.push('/forgot-password')} onKeyPress={() => browserHistory.push('/forgot-password')}>Forgot your password?</div>
          </CenterThis>
        </div>
      </FullScreenCenter>
    );
  }
}

export default connect(
  null,
  { clearError }
)(AuthView);
