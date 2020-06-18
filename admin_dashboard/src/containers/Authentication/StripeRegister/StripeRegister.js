import React, { useContext, useEffect, useState } from 'react';
import FormWrapper from '../../../components/Styles/FormWrapper';
import StripeButton from '../../../assets/stripe_button.png';
import { AuthContext } from '../../../context/AuthProvider'
import { useHistory } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { _notifyStripe } from '../../../components/Antd/Notify';

export default function StripeRegister() {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const stripe = localStorage.getItem('stripe')
    const { setStripeID, error, client, stripeReg } = useContext(AuthContext);

    useEffect(() => {
        const handleStripeCode = async () => {
            setLoading(true)
            await setStripeID(stripe);
        }
        if (client.admin || client.stripe) history.replace('/dashboard');
        if (stripe) handleStripeCode()
    }, [])
    useEffect(() => { if (error) setLoading(false) }, [error])
    useEffect(() => { if (!stripeReg) history.replace('/dashboard') }, [stripeReg])

    if (loading) {
        return (<Spinner />);
    } else {
        return (
            <FormWrapper>
                <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_H4yehypNkDsAlc8jyyQcBD9EW8Dnstsl&scope=read_write">
                    <img style={{ width: 300, height: "auto" }} src={StripeButton} alt="StripeButton" />
                </a>
            </FormWrapper>
        );
    }
}

