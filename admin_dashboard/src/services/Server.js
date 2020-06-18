import axios from 'axios';

export const getNewToken = async (email, client_id, count = 0) => {
    return await axios.post("http://34.213.209.17:4000/verify_current_user/vhmpZ3Xkzb/Jt80KVQOcq/G5pVlJa3yz/PywvIYwa56",
        { user: email, id: client_id })
        .then(async res => {
            let { token } = res.data;
            localStorage.setItem('deal_token_jwt', token)
            return true
        })
        .catch(async err => {
            console.log(err)
            if (count == 5) return false;
            await getNewToken(email, client_id, ++count); //Try 5 times for new token
        })
}

export const validateToken = async () => {
    return await axios.post("http://34.213.209.17:4000/verify/current/token", null,
        { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
        .then(res => {
            console.log(res)
            return true
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

export const createAccountHolder = async (user, email, client_id, count = 0) => {
    let payload = {
        user: user,
        email: email,
        id: client_id
    }
    return await axios.post("http://34.213.209.17:4000/newClient", payload,
        { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
        .then(res => {
            console.log("SUCCESSFUL CREATION OF CLIENT_____", res)
            return res.data.data;
        })
        .catch(async err => {
            console.log(err)
            if (count == 5) return null;
            await createAccountHolder(user, email, client_id, ++count); //Try 5 to create client
        })
}

export const createMerchant = async (merchant, count = 0) => {
    return await axios.post("http://34.213.209.17:4000/newMerchant", merchant,
        { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
        .then(res => {
            console.log("SUCCESSFUL CREATION OF CLIENT_____", res.data)
            return res.data.data
        })
        .catch(async err => {
            console.log(err)
            if (count == 5) return null;
            await createMerchant(merchant, ++count);//Try 5 to create merchant
        })
}

export const getClient = async (email, count = 0) => {
    return await axios.get(`http://34.213.209.17:4000/getClient?id=${email}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
        .then(res => {
            console.log("SUCCESSFUL RETRIEVAL OF CLIENT", res)
            return res.data.data;
        })
        .catch(async err => {
            console.log(err)
            if (count == 5) return null;
            await getClient(email, ++count) //Try 5 times for client
        })
}

export const setStripeClientID = async (merchant_id, created_At, stripe_code, email) => {
    return await axios.post(`http://34.213.209.17:4000/connect/stripe/account`, { merchant_id, created_At, stripe_code, email },
        { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
        .then(async res => {
            if (res.data.data) {
                localStorage.removeItem('stripe')
                return true
            } return false
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

export const uploadMerchantFormData = async (name, contactInfo, location, offers, dealDescription, merchantDescription) => {
    return await axios.post(`http://34.213.209.17:4000/upload/merchant/data`,
        { name, contactInfo, location, offers, dealDescription, merchantDescription },
        { headers: { Authorization: "Bearer " + localStorage.getItem('deal_token_jwt') } })
        .then(async res => {
            console.log(res.data)
            return res.data.data;
        }) 
        .catch(err => {
            console.log(err)
            return false
        })
}

//*******MERCHANT SPECIFIC  */
export const verifyMerchant = async (email, id) => { //Is in Deal_Merchants table in DB
    return await axios.post(`http://34.213.209.17:4000/verify/merchant`, { email, id })
        .then(res => {
            console.log(res)
            if (res.data.err) return null
            else return res.data.data;
        })
        .catch(err => {
            console.log(err)
            return null
        })
}