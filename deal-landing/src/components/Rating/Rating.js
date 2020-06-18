import React, { useState, useContext } from 'react';
import { OfferContext } from '../../context/OfferProvider';
import { Button } from '@material-ui/core';
import { Rate, Input } from 'antd';
const { TextArea } = Input;

export default function Rating(props) {
    const { sendReview } = useContext(OfferContext)
    const [feedback, setFB] = useState(false)
    const [stars, setStars] = useState(null)
    const [text, setText] = useState("")
    const [hid, hide] = useState(false)

    const RateUs = (e) => {
        setStars(e)
        setFB(true)
    }
    const handleText = (e) => {
        if (e.target.value.length < 500)
            setText(e.target.value)
    }
    const sendToDB = (e) => {
        sendReview(stars, text, props.id)
        hide(true)
        sessionStorage.setItem('reviewed', true)
    }

    if (hid) {
        return <div></div>
    } else {
        return (
            <div style={{ textAlign: 'center' }}>
                <h6 style={{ fontStyle: 'italic', fontSize: '4vmin' }}>How was your experience?</h6>
                <Rate style={{ color: '#512da8', fontSize: '6vmin' }} onChange={RateUs} />
                {feedback &&
                    <div style={{ width: '80vw', margin: '2vh auto', textAlign: 'center' }}>
                        <TextArea onChange={handleText} placeholder={"What did you like? \nHow can we do better?"} 
                        style={{ backgroundColor: '#eee', borderRadius: '3vmin', border: '2px solid #aab', boxShadow: '0 2px 2px #5675' }} rows={3} />
                        <Button onClick={sendToDB} style={{ backgroundColor: '#ef6c00', color: 'white', margin: '1vh auto', width: '30vw' }}>Submit</Button>
                    </div>}
            </div>
        )
    }
}