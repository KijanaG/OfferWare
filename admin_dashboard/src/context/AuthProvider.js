import React, { useState, useEffect } from 'react';
import * as Auth from '../services/Auth';

export const AuthContext = React.createContext();

export const AuthProvider = props => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [newClient, setNewClient] = useState([false, null])
  const [stripeReg, setStripeReg] = useState(false)
  const [error, setError] = useState(false)
  const [forgotPass, setForgotPass] = useState(false)
  const [verify, setVerify] = useState(false)
  const [client, setClient] = useState({
    client_id: null, stripe_id: null,
    name: null, email: null, admin: false
  })

  const __ = {
    setLoggedIn: setLoggedIn,
    setLoggedOut: setLoggedOut,
    setClient: setClient,
    setStripeReg: setStripeReg,
    setVerify: setVerify,
    setError: setError,
    setNewClient: setNewClient
  }

  const handleSignIn = ({ email, password }) => {
    Auth.handleSignIn(__, email.toLowerCase(), password, client);
  }

  const authenticateUser = async () => {
    await Auth.authenticateUser(__, client);
  }

  const verifyEmail = async () => {
    await Auth.verifyEmail();
  }

  const verifyCode = async (code) => {
    await Auth.verifyCode(__, client, code);
  }

  const confirmEmail = async ({ email }) => { //Password Change
    return await Auth.confirmEmail(__, email.toLowerCase());
  }

  const changePass = async ({ code, password }) => { //Password Change
    return await Auth.changePass(__, client, code, password);
  }

  const handleRegistration = params => { //Post client data to our servers
    Auth.handleRegistration(__, params, client, newClient);
  }

  const signOut = async () => {
    await Auth.signOut(__);
  }

  const setStripeID = async (code) => {
    await Auth.setStripeID(__, client, code);
  }

  //****MERCHANT SPECIFIC */
  const verifyMerchantEmail = async (email, merchant_id) => {
    return await Auth.verifyMerchantEmail(email, merchant_id);
  }

  const registerMerchantAWS = async (email, pass) => {
    return await Auth.registerMerchantAWS(email, pass);
  }

  const verifySignUpCode = async (merchant, code) => {
    Auth.verifySignUpCode(__, merchant, code);
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn, client, error, verify, newClient, stripeReg, forgotPass, loggedOut,
        setForgotPass, verifyEmail, verifyCode, authenticateUser, handleSignIn, registerMerchantAWS,
        handleRegistration, signOut, changePass, setLoggedIn, confirmEmail, setStripeID, verifyMerchantEmail, verifySignUpCode
      }}>
      {props.children}
    </AuthContext.Provider>
  )
};
