import axios from 'axios';

export const getProduct = async (p_id, t_id) => {
    return await axios.get(`http://localhost:5000/client/redemption/success?p_id=${p_id}&t_id=${t_id}`)
        .then(res => {
            if (res.data) return res.data
            else return null
        })
        .catch(err => {
            return null
        })
}

// Send address data to server to get remaining Google Reviews
export const googlePlaceSearch = async (name, coords) => {
    return await axios.post('http://localhost:5000/client/google/places', { name, coords })
        .then(res => {
            return res.data.data.result
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

export const sendMail = async (email, code, vendor) => {
    return await axios.post('http://localhost:5000/client/mail/send', { email, code, vendor })
        .then(res => {
            return true
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

export const getDirections = async (myLoc, destLoc) => {
    return await axios.post('http://localhost:5000/client/directions', { myLoc, destLoc })
        .then(res => {
            return res.data.distance
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

export const redeemTransaction = async (t_id, time, id, shop) => {
    return await axios.post(`http://localhost:5000/client/redeem/transaction`, { t_id, time, id, shop })
        .then(res => {
            return res.data.redeemed
        })
        .catch(err => {
            alert("There was an error, please refresh the page.")
            return false
        })
}

export const sendReview = (stars, review, t_id) => {
    axios.post('http://localhost:5000/client/ratings', { stars, review, t_id })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}