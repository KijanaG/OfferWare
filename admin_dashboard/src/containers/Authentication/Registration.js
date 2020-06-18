import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Switch, Route, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import FormWrapper from '../../components/Styles/FormWrapper';
import { EmailInput, Password, ConfirmPassword, FormButton, VerificationCode } from '../../components/Antd/Form';
import { valPass as validatePassword } from './Authentication';
import { _notifyError, _notifyEmailFound } from '../../components/Antd/Notify';

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
    .is().min(8).is().max(40)
    .has().uppercase().has().lowercase()
    .has().digits().has().symbols()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']); //include blacklist of passwords

//Merchant Registration
export default function Registration() {
    let params = useParams();
    let history = useHistory();
    const [loading, setLoading] = useState(false)
    const [validated, validate] = useState(false) //Validate email through our database
    const [merchant, setMerchantInfo] = useState({ merchant_id: params.merchant_id })
    const [verifySignUp, setVerification] = useState(false) //Show verification input for code sent to email from AWS

    const { verifyMerchantEmail, registerMerchantAWS, verifySignUpCode, error, loggedIn } = useContext(AuthContext);

    const validateMerchant = async ({ email }) => {
        setLoading(true)
        let merchantInfo = await verifyMerchantEmail(email.toLowerCase(), params.merchant_id);
        if (merchantInfo) {
            // console.log(merchantInfo, "($#(#@*$#(@$*(@$#$*#@(*")
            _notifyEmailFound()
            validate(true)
            setMerchantInfo({ ...merchant, ...merchantInfo })
        } else
            _notifyError("This email does not match the email given to us. Please verify with your merchant's deal coordinator.")
        setLoading(false)
    }
    const register = async ({ email, password }) => {
        setLoading(true)
        //AWS returns id (named client_id in our DB) 
        //Merchant now has merchant_id (Deal ID) & client_id (User ID)
        let client_id = await registerMerchantAWS(email.toLowerCase(), password, merchant.contactName, merchant.phoneNumber)
        if (client_id) {
            setMerchantInfo({ ...merchant, client_id: client_id });
            setVerification(true)
        }
        setLoading(false)
    }
    const confirmSignUp = ({ code }) => {
        setLoading(true)
        verifySignUpCode(merchant, code);
    }

    useEffect(() => { if (verifySignUp && validated) history.replace(`/stripe`) }, [loggedIn])
    useEffect(() => { if (loading) setLoading(false) }, [error])

    return (
        <FormWrapper onFinish={verifySignUp ? confirmSignUp : validated ? register : validateMerchant}>
            <EmailInput />
            {!validated ?
                <FormButton loading={loading} name="Verify Merchant Email" />
                : !verifySignUp ?
                    <>
                        <Password validatePassword={validatePassword} />
                        <ConfirmPassword />
                        <FormButton loading={loading} name="Register" />
                    </>
                    :
                    <>
                        <VerificationCode />
                        <FormButton loading={loading} name="Confirm Code" />
                    </>
            }
        </FormWrapper>
    )
}
