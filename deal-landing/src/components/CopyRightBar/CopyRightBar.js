import React from 'react';

export default function CopyRightBar() {
    return (
        <React.Fragment>
            <p style={{ color: '#aaa', fontSize: `3vmin`, lineHeight: `3.5vmin`, textAlign: "center", margin: `2vh 5vw 0vh 5vw`, fontWeight: `400` }}>
                Here at OfferWare, we are extremely passionate about helping local businesses thrive in their respective communities 🌎 Now
            more than ever, we should be investing in our communities with the goal of making them more resilient in the years to come 🚀</p>
            <p style={{ color: '#aaa', fontSize: `2.75vmin`, textAlign: "center", margin: `1vh 5vw 1vh 5vw`, fontWeight: `400` }}>
                Don't hesitate to contact us with any doubts: <a style={{color:'#ef6c00'}} target="_blank" href="mailto: ScottsDeal@offerware.co">ScottsDeal@OfferWare.co</a>.
            </p>
            <p style={{ color: '#aaa', fontSize: `2.75vmin`, textAlign: "center", margin: `1vh auto 1vh auto`, fontWeight: `400` }}>
                <a style={{ color: '#ef6c00' }} href="https://scottsdeal.com" target="_blank">ScottsDeal.com</a>&nbsp;|&nbsp;Copyright
© 2020 OfferWare, LLC.
    </p>
        </React.Fragment>
    )
}