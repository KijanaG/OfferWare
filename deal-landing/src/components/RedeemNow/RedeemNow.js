import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { OfferContext } from '../../context/OfferProvider';
import './RedeemNow.css';

export default function BuyNow(props) {
    return (
        <div style={{ position: 'fixed', height: `30vh`, top: `75vh`, backgroundColor: 'white', zIndex: 2, borderTop: `1px solid #ddd`, width: `100vw` }}>
            <div style={{
                height: "12vh", backgroundColor: `white`, zIndex: 3,
                display: 'flex', justifyContent: "center", padding: `0 5vw`, width: '100vw',
            }}>
                <Button className="RedeemButton" onClick={props.setModal} style={{
                    fontSize: `7vmin`, alignSelf: "center", marginTop: `0vh`, height: '65%',
                    backgroundColor: "#ef6c00", color: "white", borderRadius: `3vmin`, width: `70vw`
                }} variant="contained">&nbsp;Redeem Now&nbsp;</Button>
            </div>
            <p style={{ color: '#aaa', fontSize: `2.75vmin`, textAlign: "center", margin: `0.5vh 4vw 0vh 4vw`, fontWeight: `400`, lineHeight:'3.25vmin' }}>
                Upon Pressing, A Code Will Be Sent Via Email To Access Your Voucher.
            </p>
        </div>
    )
}