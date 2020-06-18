import React from 'react';
import Lottie from 'react-lottie';
import LoadingLottie from '../../assets/Loading.json';
import Footer from '../../assets/footer.png';
const defaultOptions = {
    loop: true, autoplay: true, animationData: LoadingLottie,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
}

export default function Loading() {
    return (
        <div style={{width:'100vw', height:'100vh', display:'flex'}}>
            <Lottie
                style={{alignSelf:'center'}}
                options={defaultOptions}
                height={'50vw'}
                width={'50vw'}
            />
            <img src={Footer} alt="footer" style={{height:'15vh', width:'100vw', position:'fixed', top:'85vh'}} />
        </div>
    )
}