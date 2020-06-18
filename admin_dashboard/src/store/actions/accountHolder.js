import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

//Get Initial JWT Token , store in localStorage, create client in DB
// export const createAccountHolder = (user, email, client_id) => {
//     return async dispatch => {
//         await dispatch(isLoading(true))
//         await dispatch(getNewToken(email, client_id));
//         let payload = {
//             user: user,
//             email: email,
//             id: client_id
//         }
//         await axios.post("http://localhost:3001/newClient", payload,
//             { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
//             .then(async res => {
//                 await dispatch(setClient(res.data.data))
//                 dispatch(isLoading(false))
//             })
//             .catch(err => console.log(err))
//     }
// }

// export const validateToken = (id) => {
//     return async dispatch => {
//         await dispatch(isLoading(true))
//         await axios.post("http://localhost:3001/verify/current/token", { id },
//             { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
//             .then(async res => {
//                 console.log("NOT ERR", res)
//                 await dispatch(validToken(true))
//             })
//             .catch(async err => {
//                 console.log("ERR", err)
//                 await dispatch(validToken(false))
//             })
//     }
// }

// export const getNewToken = (email, client_id) => {
//     return async dispatch => {
//         await axios.post("http://localhost:3001/verify_current_user/vhmpZ3Xkzb/Jt80KVQOcq/G5pVlJa3yz/PywvIYwa56",
//             { user: email, id: client_id })
//             .then(async res => {
//                 let { token } = res.data;
//                 localStorage.setItem('deal_token_jwt', token);
//                 await dispatch(validToken(true));
//             })
//             .catch(err => console.log("no new Token ", err))
//     }
// }

// export const getClient = (email, client_id) => {
//     return async dispatch => {
//         await dispatch(isLoading(true))
//         await axios.get(`http://localhost:3001/getClient?id=${client_id}`,
//             { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
//             .then(async res => {
//                 console.log("SETTING CLIENT getClient()", res.data)
//                 await dispatch(setClient(res.data.data))
//                 await dispatch(isLoading(false))
//             })
//             .catch(async err => {
//                 console.log(err)
//                 await dispatch(validToken(false));
//                 console.log("WOW")
//                 await dispatch(isLoading(false))
//                 console.log("TOT")
//             })
//     }
// }

// export const setStripeClientID = (client_id, stripe_code) => {
//     return async dispatch => {
//         await dispatch(isLoading(true))
//         await axios.post(`http://localhost:3001/connect/stripe/account`, { client_id, stripe_code },
//         { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
//         .then(async res => {
//             console.log("|| STRIPE ||",res.data)
//             await dispatch(getClient(null, client_id));
//             await dispatch(isLoading(false))
//         })
//         .catch(err => {
//             console.log("|| STRIPE ||",err)
//         })
//     }
// }

// export const logIn = () => {
//     return {
//         type: actionTypes.LOG_IN
//     }
// }

// const isLoading = (loading) => {
//     return {
//         type: actionTypes.IS_LOADING,
//         loading: loading
//     }
// }

// const validToken = (isValid) => {
//     return {
//         type: actionTypes.VALID_TOKEN,
//         validToken: isValid
//     }
// }

// const setClient = (client) => {
//     return {
//         type: actionTypes.SET_CLIENT,
//         client: client
//     }
// }