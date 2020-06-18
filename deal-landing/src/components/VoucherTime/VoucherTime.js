import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone';


export default function VoucherTime(props) {
    const [now, setNow] = useState(new Date().getTime())
    const [loading, setLoading] = useState(true)
    const [dayR, sdr] = useState(null)
    const [timeR, str] = useState(null)
    moment.tz.setDefault();

    useEffect(() => {
        const myInterval = setInterval(() => {
            setNow(new Date().getTime())
            props.checkTime()
        }, 1000)
    }, [])
    useEffect(() => {
        if (props.time_redeemed) {
            let redemption = parseInt(sessionStorage.getItem('time_redeemed'));
            str(moment(redemption).format('h:mm A'));
            sdr(moment(redemption).format('MMMM D, YYYY'));
            setLoading(false)
        }
    }, [props.time_redeemed])

    var day_then = moment(props.transaction.time_purchased).format('MMMM D, YYYY');
    console.log(dayR, timeR, loading)
    if (!dayR && !timeR && loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', margin: `0vh 2vw`, justifyContent: 'center' }}>
                <p style={{ fontSize: '8vmin', lineHeight: '9vmin', margin: 0, display: 'block' }}>IF THIS PERSISTS, VOUCHER IS NOT VALID</p>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: `0vh 2vw`, justifyContent: 'center' }}>
            <div style={{ color: '#512da8' }}>
                <p style={{ fontSize: '8vmin', lineHeight: '9vmin', margin: 0, display: 'block' }}>{moment(now).format('h:mm:ss A')}</p>
                <p style={{ fontSize: '4.5vmin', lineHeight: '5.5vmin', margin: 0 }}>{moment(now).format('dddd, MMMM D, YYYY')}</p>
                <hr style={{ width: `30vw`, margin: `1vh auto`, color: '#b8b8b95', backgroundColor: '#b8b8b95', borderColor: '#b8b8b95', border: '4px solid #d8d8d9', borderRadius: '3vmin' }} />
                <p style={{ alignSelf: 'center', fontSize: '4vmin', lineHeight: '5vmin', color: '#ef6c00', margin: 0 }}>Redeemed: {timeR} {dayR}</p>
                <hr style={{ width: `30vw`, margin: `1vh auto`, color: '#b8b8b95', backgroundColor: '#b8b8b95', borderColor: '#b8b8b95', border: '4px solid #d8d8d9', borderRadius: '3vmin' }} />
                <p style={{ alignSelf: 'center', fontSize: '4vmin', lineHeight: '5vmin', color: '#ef6c00', margin: 0 }}>Purchased: {day_then}</p>
            </div>
        </div>
    )
}