import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Redirect, useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Verify from './Verify/Verify';

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
  .is().min(8).is().max(40)
  .has().uppercase().has().lowercase()
  .has().digits().has().symbols()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']); //include blacklist of passwords

export default function Authentication() {
  const [loading, setLoading] = useState(true);
  const { loggedIn, handleSignIn, setForgotPass, authenticateUser, loggedOut, stripeReg,
    error, newClient, forgotPass, verify, handleRegistration } = useContext(AuthContext);

  useEffect(() => {
    const handleAuth = async () => {
      await authenticateUser();
    }
    handleAuth();
    
  }, [])

  useEffect(() => {
    if (loggedOut || loggedIn)
      setLoading(false) //Update UI 
    return
  }, [loggedOut, loggedIn])

  if (verify) return (<Verify />);
  if (loggedIn && !stripeReg) return (<Redirect to="/dashboard" />);
  if (loggedIn && stripeReg) return (<Redirect to="/stripe" />);
  if (loading) return (<Spinner />);
  else {
    if (forgotPass) { return <ForgotPassword validatePassword={valPass} /> }
    if (newClient[0]) {
      return (<SignUp handleRegistration={handleRegistration}
        validatePassword={valPass} error={error} />);
    } else {
      return (<SignIn forgotPass={setForgotPass} validatePassword={valPass}
        handleSignIn={handleSignIn} error={error} />);
    }
  }
}


export async function valPass(_, value, __) {
  const validationRulesErrors = schema.validate(value, { list: true });
  if (!value || value.length === 0) return;
  if (validationRulesErrors.length > 0) {
    throw new Error(formatPassdValErr(validationRulesErrors))
  }
}

function formatPassdValErr(errors) {
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
