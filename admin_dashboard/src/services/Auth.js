import { Auth } from 'aws-amplify';
import {
  _notifyError,
  _notifyVerification,
  _notifySuccess,
  _notifyWelcomeBack,
  _notifyWelcomeNew,
  _notifyVerifyEmail,
} from '../components/Antd/Notify'
import {
  getNewToken,
  validateToken,
  createAccountHolder,
  getClient,
  setStripeClientID,
  verifyMerchant,
  createMerchant
} from './Server'

//Client == Us, our employees
//Merchant == Them, our business partners

export const authenticateUser = async (__, client) => {
  console.log("AUTHORIZING")
  await Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(async user => {
      console.log("SUCCESSSS")
      console.log(user)
      __.setClient({ ...client, email: user.attributes.email, client_id: user.username })
      if (await tokenAuth()) {
        let currClient = await getClient(user.attributes.email);
        console.log(currClient)
        __.setClient(currClient)
        if (currClient.admin || currClient.stripe) {
          __.setLoggedIn(true)
          _notifyWelcomeBack();
        } else {
          __.setStripeReg(true)
          __.setLoggedIn(true)
        }
      } else {
        __.setVerify(true)
        __.setLoggedOut(true)
      }
      return
    })
    .catch(err => {
      console.log("ERROROROROR")
      __.setLoggedOut(true)
      return
    })
}

const tokenAuth = async () => {
  return await validateToken();
}

export const handleSignIn = (__, email, password, client) => {
  Auth.signIn(email, password)
    .then(async user => {
      console.log(user)
      __.setClient({ ...client, email, client_id: user.username }) // Prepare for DB upload
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        _notifyWelcomeNew();
        __.setNewClient([true, user]) // Prepare for registration [isNewClient, AWS_UserPayload]
      } else {
        if (await tokenAuth()) {
          let currClient = await getClient(email);
          console.log(currClient)
          __.setClient(currClient)
          if (currClient.admin || currClient.stripe) {
            __.setLoggedIn(true)
            _notifyWelcomeBack();
          } else {
            __.setStripeReg(true)
            __.setLoggedIn(true)
          }
        } else {
          __.setVerify(true)
          __.setLoggedOut(true)
        }
      }
    })
    .catch(err => {
      _notifyError(err);
      __.setError(true)
      __.setLoggedOut(true)
    })
}

export const verifyEmail = async () => {
  await Auth.verifyCurrentUserAttribute('email')
    .then(data => {
      _notifyVerifyEmail();
      return
    })
    .catch(err => {
      _notifyError(err)
      return
    })
}

export const verifyCode = async (__, client, code) => {
  await Auth.verifyCurrentUserAttributeSubmit('email', code)
    .then(async data => {
      await getNewToken(client.email, client.client_id);
      let currClient = await getClient(client.email)
      __.setClient(currClient)
      __.setLoggedIn(true)
      _notifyWelcomeBack();
      __.setVerify(false)
      return
    })
    .catch(err => {
      _notifyError(err);
      __.setError(true)
      return
    })
}

export const confirmEmail = async (__, email) => {
  return await Auth.forgotPassword(email)
    .then(async data => {
      _notifyVerification(data);
      if (!await tokenAuth())
        await getNewToken(email, Date.now().toString())
      let currClient = await getClient(email)
      __.setClient(currClient)
      return true
    })
    .catch(err => {
      _notifyError(err);
      return false
    })
}

export const changePass = async (__, client, code, password) => {
  return await Auth.forgotPasswordSubmit(client.client_id, code, password)
    .then(data => {
      _notifySuccess();
      __.setLoggedIn(true)
      return true
    })
    .catch(err => {
      _notifyError(err);
      __.setLoggedOut(true)
      return false
    })
}

//Of Client (Admins, Us)
export const handleRegistration = async (__, params, client, newClient) => {
  Auth.completeNewPassword(newClient[1], params.password)
    .then(async user => {
      let { firstName, lastName } = params;
      await getNewToken(client.email, client.client_id)
      let newClient = await createAccountHolder(
        { firstName, lastName },
        client.email, client.client_id);
      __.setClient(newClient)
      __.setLoggedIn(true)
    })
    .catch(err => {
      _notifyError(err);
      __.setError(true)
    })
}

export const signOut = async (__) => {
  await Auth.signOut({ global: true })
    .then(data => {
      __.setLoggedIn(false)
      __.setLoggedOut(true)
    })
    .catch(err => {
      _notifyError(err);
      __.setLoggedIn(false)
      __.setLoggedOut(true)
    })
}

//Connect merchant's stripe account with out platform
export const setStripeID = async (__, client, code) => {
  let stripe_id = await setStripeClientID(client.merchant_id, client.created_At, code, client.email)
  if (stripe_id) {
    _notifyWelcomeNew();
    __.setStripeReg(false)
  } else {
    _notifyError("Could not connect Stripe Account, please try again.")
    __.setError(true)
  }
  return
}

//Verify that merchant email is database in Merchant table
export const verifyMerchantEmail = async (email, id) => {
  return await verifyMerchant(email, id);
}

//Merchant AWS Sign Up
export const registerMerchantAWS = async (email, pass) => {
  return await Auth.signUp(email, pass)
    .then(res => {
      console.log(res)
      _notifyVerifyEmail(email);
      return res.userSub
    })
    .catch(err => {
      console.log(err)
      _notifyError(err);
      return null
    })
}

//Code Verification for Merchant AWS Sign Up
export const verifySignUpCode = (__, merchant, code) => {
  console.log(merchant)
  Auth.confirmSignUp(merchant.email, code, { forceAliasCreation: true })
    .then(async res => {
      await getNewToken(merchant.email, merchant.client_id);
      let newMerchant = await createMerchant(merchant);
      __.setClient(newMerchant)
      __.setStripeReg(true)
      __.setLoggedIn(true)
      return
    })
    .catch(err => {
      _notifyError(err);
      __.setError(true)
      console.log(err)
      return
    })
}