import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import HeaderTitle from '../../components/TitleHeader/TitleHeader';
import { OfferContext } from '../../context/OfferProvider';
import Rating from '../../components/Rating/Rating';
import moment from 'moment-timezone';
import QRCode from 'qrcode.react';
import LoadingLottie from '../../components/Loading/Loading';
import VoucherTime from '../../components/VoucherTime/VoucherTime';

export default function VoucherPage() {
    const { redeemTransaction } = useContext(OfferContext)
    const [loading, setLoading] = useState(true)
    const [localData, setLD] = useState(JSON.parse(sessionStorage.getItem('locationData')))
    const [time_redeemed, setTR] = useState(sessionStorage.getItem('time_redeemed') ? sessionStorage.getItem('time_redeemed') : null)
    const history = useHistory()
    moment.tz.setDefault();
    var currProduct = currProduct = JSON.parse(sessionStorage.getItem('product'))
    var currTransxn = JSON.parse(sessionStorage.getItem('transaction'))

    useEffect(() => {
        checkTime()
        const redeem = async (id, time_redeemed) => {
            let notRedeemed = await redeemTransaction(id, time_redeemed, currProduct.id, currProduct.shopOrigin)
            if (notRedeemed) {
                setTR(time_redeemed)
                sessionStorage.setItem('time_redeemed', time_redeemed);
                setLoading(false)
            }
        }
        setLoading(false)
        if (currTransxn && !sessionStorage.getItem('time_redeemed'))
            redeem(currTransxn.transaction_id, new Date().getTime())
    }, [])

    const checkTime = () => {
        if (time_redeemed) {
            let redemption = parseInt(sessionStorage.getItem('time_redeemed'))
            if (redemption + 600000 < new Date().getTime()) {
                sessionStorage.clear();
                history.push('/')
            }
        }
    }

    if (loading || !currTransxn || !localData || !currProduct) {
        return <LoadingLottie />;
    } else {
        return (
            <div style={{ paddingBottom: '5vh' }}>
                <HeaderTitle address={localData ? localData.formatted_address : ""}
                    name={localData ? localData.name : currProduct ? currProduct.vendor : null}
                    images={currProduct ? currProduct.images : null}
                    photos={localData ? localData.photos : null}
                    distance={null} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}>
                    <p style={{ alignSelf: 'center', fontSize: '6vmin', lineHeight: '6.5vmin', color: '#555', margin: '2vh 5vw', borderRadius: '4vmin', padding: '2vmin' }}>{currTransxn ? currTransxn.variant_title : null}</p>
                    <QRCode style={{ alignSelf: 'center', marginBottom: '2vh', width: '40vw', height: '40vw', marginRight: '2vw' }} value={currTransxn.transaction_id} />
                    <hr style={{ width: `96vw`, margin: `0.5vh auto`, color: '#b8b8b85', backgroundColor: '#b8b8b85', borderColor: '#b8b8b85' }} />
                    <VoucherTime time_redeemed={time_redeemed} checkTime={checkTime} transaction={currTransxn} />
                    <hr style={{ width: `96vw`, margin: `2vh auto`, color: '#b8b8b85', backgroundColor: '#b8b8b85', borderColor: '#b8b8b85' }} />
                </div>
                {currTransxn ? currTransxn.rating == null && !sessionStorage.getItem('reviewed') ? <Rating id={currTransxn.transaction_id} /> : null : null}
            </div>
        )
    }
}