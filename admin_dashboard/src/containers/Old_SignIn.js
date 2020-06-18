import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { notification } from 'antd';
import { connect } from 'react-redux';
import SignUp from '../components/SignUp/SignUp';
import ForgotPassword from './Authentication/ForgotPassword/ForgotPassword';
import Login from '../../../components/Login/Login';
import StripeRegistration from '../components/StripeRegister/StripeRegister';
import { Redirect } from 'react-router-dom';
import PasswordPolicy from '../../../components/Login/PasswordPolicy';
import {
  createAccountHolder,
  getClient,
  getNewToken,
  validateToken,
  logIn,
  setStripeClientID
} from '../store/actions/accountHolder';
import Spinner from '../components/Spinner/Spinner';
import Verify from '../components/Verify/Verify';
import queryString from 'query-string'

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(40)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']); //Find Blacklisted Values that satisfy constraints

class SignIn extends Component {
  state = {
    loading: false,
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    potentialAppNames: ["YellowOne"],
    firstName: "",
    lastName: "",
    user: null,
    id: null,
    registerNewUser: false,
    forgotPass: false,
    stripeRegistration: false,
    spinner: true,
    verifyEmail: false
  }

  async componentDidMount() {
    // console.log("SIGNIN.JS --- PROPS", this.props)
    Auth.currentAuthenticatedUser({
      bypassCache: true
    }).then(async data => {
      this.props.logIn();
      await this.props.validateToken(data.username)
      console.log(this.props)
      if (!this.props.client.validToken) {
        // console.log("HELLO")
        this.setState({ verifyEmail: true, spinner: false, email: data.attributes.email, id: data.username })
      }
      await this.props.getClient(data.attributes.email, data.username);
      if (!this.props.client.stripe_id) {
        // console.log("WHY NOR")
        const values = queryString.parse(this.props.location.search)
        if (values.code && this.props.client.loggedIn) {
          // console.log("SEEEENNDD IT SEND IT!")
          this.setState({ spinner: true })
          await this.props.setStripeClientID(this.props.client.client_id, values.code);
        } else {
          this.setState({ stripeRegistration: true, spinner: false })
          notification.info({
            message: "Connect Stripe Account",
            description: "Please follow the steps to connect this account with Stripe.",
            placement: 'topRight',
            duration: 3.5,
            onClose: () => { return }
          })
        }
      }
    }).catch(err => {
      console.log("ERR: ", err)
      this.setState({ spinner: false })
    })
  }

  getNewToken = async () => {
    console.log("getNewToken()", this.state)
    await this.props.getNewToken(this.state.email, this.state.id);
    await this.props.getClient(this.state.email, this.state.id);
    if (this.props.client.stripe_id) {
      notification.success({
        message: "Welcome Back!",
        placement: 'topRight',
        duration: 1.5,
        onClose: () => { this.props['logIn'](); }
      })
    } else {
      this.setState({ stripeRegistration: true, verifyEmail: false })
      notification.info({
        message: "Connect Stripe Account",
        description: "Please follow the steps to connect this account with Stripe.",
        placement: 'topRight',
        duration: 3.5,
        onClose: () => { return }
      })
    }
  }

  // Handle changes to form inputs on SignUp, SignIn, & Verification
  handleFormInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Check whether newUser, if so, render Registration Comp
  // Else login to dashboard & show feedback
  handleLogin = async (values) => {
    const { email, password } = values;
    this.setState({ loading: true })
    Auth.signIn(email.toLowerCase(), password)
      .then(async user => {
        console.log("WE IN HERE", user)
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.setState({ loading: false })
          notification.success({
            message: "Welcome to your Dashboard",
            description: 'Please create your password.',
            placement: 'topRight',
            duration: 2.5,
            onClose: () => { return }
          })
          this.setState({ registerNewUser: true, user: user, id: user.username });
        } else {
          await this.props.validateToken(user.username)
          if (!this.props.client.validToken) {
            this.setState({ verifyEmail: true, spinner: false, email: email, id: user.username })
          }
          await this.props.getClient(email, user.username);
          if (this.props.client.stripe_id) {
            notification.success({
              message: "Welcome Back!",
              placement: 'topRight',
              duration: 1.5,
              onClose: () => { return; }
            })
          } else {
            this.setState({ stripeRegistration: true })
            notification.info({
              message: "Connect Stripe Account",
              description: "Please follow the steps to connect this account with Stripe.",
              placement: 'topRight',
              duration: 3.5,
              onClose: () => { return }
            })
          }
        }
      })
      .catch(err => {
        this.setState({ loading: false })
        notification.error({
          message: 'Error',
          description: `${typeof (err) == "object" ? err.message : err}`,
          placement: 'topRight',
          duration: 2.5
        })
      })
  }

  //Set new password, create account in DB & send to Stripe Registration
  handleRegistration = async (values) => {
    this.setState({ loading: true })
    Auth.completeNewPassword(this.state.user, this.state.password)
      .then(async user => {
        let { firstName, lastName, companyName } = values;
        //Send user registration data to DB
        await this.props.createAccountHolder({ firstName, lastName, companyName }, this.state.email, this.state.id);
        this.setState({ stripeRegistration: true })
        notification.info({
          message: "Connect Stripe Account",
          description: "Please follow the steps to connect this account with Stripe.",
          placement: 'topRight',
          duration: 3.5,
          onClose: () => { return }
        })
      })
      .catch(err => console.log("INCOMPLETE NEW ", err))
  }

  validatePassword = async (obj, value, message) => {
    const validationRulesErrors = schema.validate(value, { list: true });
    if (validationRulesErrors.length > 0) {
      throw new Error(this.formatPasswordValidateError(validationRulesErrors))
    }
  }

  forgotPassword = () => {
    this.setState({ forgotPass: !this.state.forgotPass })
  }

  formatPasswordValidateError = (errors) => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === 'min') {
        return 'password length should be at least 8 characters';
      } else if (errors[i] === 'lowercase') {
        return 'password should contain lowercase letters';
      } else if (errors[i] === 'uppercase') {
        return 'password should contain uppercase letters';
      } else if (errors[i] === 'digits') {
        return 'password should contain digits';
      } else if (errors[i] === 'symbols') {
        return 'password should contain symbols';
      }
    }
  }

  render() {
    if ((this.props.client.loggedIn && this.props.client.stripe_id)) {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.spinner) {
      return <Spinner loading={this.state.spinner} />
    }
    // Verify Email to get new token
    if (this.state.verifyEmail) {
      return <Verify email={this.state.email} getNewToken={this.getNewToken} />
    }
    // Show Stripe Registration Page
    if (this.state.stripeRegistration && !this.props.isLoading) {
      return <StripeRegistration />;
    }
    // Show forgot password component
    if (this.state.forgotPass) {
      return <ForgotPassword email={this.state.email}
        handleFormInput={this.handleFormInput} forgotPassword={this.forgotPassword}
        logIn={this.props.logIn} validatePassword={this.validatePassword}
        passwordPolicyContent={<PasswordPolicy />} />
    }
    // Show first login/change password component
    if (this.state.registerNewUser) {
      return <SignUp passwordPolicyContent={<PasswordPolicy />}
        inputs={this.state} handleRegistration={this.handleRegistration}
        handleFormInput={this.handleFormInput} loading={this.state.loading || this.props.isLoading}
        validatePassword={this.validatePassword} />
    } else {
      // Normal Login
      return <Login handleLogin={this.handleLogin} handleFormInput={this.handleFormInput}
        validatePassword={this.validatePassword} forgotPassword={this.forgotPassword}
        loading={this.state.loading || this.props.isLoading} />;
    }
  }
}

const mapStateToProps = state => {
  return {
    client: state.accountHolderReducer,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAccountHolder: (user, email, id) => dispatch(createAccountHolder(user, email, id)),
    getClient: (email, id) => dispatch(getClient(email, id)),
    getNewToken: (email, id) => dispatch(getNewToken(email, id)),
    validateToken: (id) => dispatch(validateToken(id)),
    logIn: () => dispatch(logIn()),
    setStripeClientID: (id, code) => dispatch(setStripeClientID(id, code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);