import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { OfferContext } from '../../context/OfferProvider';
import './BuyNow.css';

export default function BuyNow(props) {
    const { initiateStripeSession } = useContext(OfferContext);
    const history = useHistory();
    const handlePurchase = async (e) => {
        if(await initiateStripeSession() == "Success")
            history.replace('/58569d06-2f3a-4069-9b30-057cbe70726c/9nVtGMkG3Cuh8XaNBytPFZ/{{SESSION_ID}}/success')
    }

    return (
        <div style={{ position: 'fixed', height: `17.5vh`, top: `82.5vh`, backgroundColor: 'white', zIndex: 2, borderTop: `1px solid #ddd`, width: `100vw` }}>
            <div style={{
                height: "13vh", backgroundColor: `white`, zIndex: 3,
                display: 'flex', justifyContent: "space-between", padding: `0 5vw`, width: '100vw',
            }}>
                <p style={{ alignSelf: "center", fontSize: '10vmin', color: '#999', fontWeight: `600`, marginTop: `10%`, }}>${props.price}</p>
                <Button className="BuyButton" onClick={handlePurchase} style={{
                    fontSize: `7vmin`, alignSelf: "center", marginTop: `0vh`, height: '65%',
                    backgroundColor: "#2196f3", color: "white", borderRadius: `3vmin`
                }} variant="contained">&nbsp;Buy Deal Now&nbsp;</Button>
            </div>
            <p style={{ color: '#aaa', fontSize: `2.75vmin`, textAlign: "center", margin: `0.5vh 4vw 2vh 4vw`, fontWeight: `400` }}>
                Upon Purchase, One Redeemable Voucher Will Be Sent Via Email.
            </p>
        </div>
    )
}