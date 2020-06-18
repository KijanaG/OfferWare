import React from 'react'
import Lottie from 'react-lottie';
import NotFound from '../../assets/NotFound.json';

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: NotFound,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

export default function SuccessPage(props) {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#f063', }}>
                <Lottie
                    options={defaultOptions}
                    height={'100vh'}
                    width={'100vw'}
                />
            </div>
        </div>
    )
}