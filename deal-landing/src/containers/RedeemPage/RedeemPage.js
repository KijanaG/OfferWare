import React, { useState, useEffect, useContext } from 'react';
import MerchantDescription from '../../components/MerchantDescription/MerchantDescription';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import DealDescription from '../../components/DealDescription/DealDescription';
import OfferOptions from '../../components/OfferOptions/OfferOptions';
import CopyRightBar from '../../components/CopyRightBar/CopyRightBar';
import HeaderTitle from '../../components/TitleHeader/TitleHeader';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LoadingLottie from '../../components/Loading/Loading';
import RedeemBar from '../../components/RedeemNow/RedeemNow';
import { OfferContext } from '../../context/OfferProvider';
import { useParams, useHistory } from 'react-router-dom'
import { getDirections, sendMail } from '../../services/Server';
import Footer from '../../assets/footer.png';
import Map from '../../components/Map/Map';
import PinInput from 'react-pin-input'
import { Modal } from 'antd';
const { confirm } = Modal;

export default function LandingPage() {
    const { offer, product, loading, fetchProduct, locationData, transaction } = useContext(OfferContext)
    const [vCodeModal, setVCodeModal] = useState(false)
    const [distance, setDistance] = useState(null)
    const [valid, setValid] = useState(false)
    const [localLoad, setLL] = useState(true)
    const [wasSent, sent] = useState(false)
    const [bold, setBold] = useState(false)
    const [myLoc, setLoc] = useState(null)
    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        })
        let t_id = params.transaction_id;
        let p_id = params.product_id;
        const fetch = async (p, t) => {
            await fetchProduct(p, t)
        }
        fetch(p_id, t_id);
    }, [])
    useEffect(() => {
        const findLoc = async () => {
            let dist = await getDirections(myLoc, locationData.geometry.location);
            if (dist) setDistance(dist)
        }
        if (locationData && myLoc) findLoc()
    }, [locationData, myLoc])
    useEffect(() => {
        if (transaction && product && localLoad && locationData) {
            setLL(false)
            sessionStorage.setItem('product', JSON.stringify(product));
            sessionStorage.setItem('transaction', JSON.stringify(transaction));
            sessionStorage.setItem('locationData', JSON.stringify(locationData))
        }
    }, [product, transaction, locationData])

    const setModal = () => {
        confirm({
            title: 'Are you sure you want to redeem now?',
            icon: <ExclamationCircleOutlined />,
            content: 'Upon confirmation, an email will be sent with your verification code. Once you have redeemed voucher, you only have 10 minutes to present to merchant.',
            onOk() {
                return new Promise(async (res) => {
                    await sendVCode()
                    res()
                }).catch(err => console.log(err))
            },
            onCancel() { }
        })
    }

    const sendVCode = async () => {
        let res = await sendMail(transaction.email, transaction.v_code, product.businessName)
        if(res) {
            setVCodeModal(true)
        } else {
            alert("Please Refresh the page, email failed to send.")
        }
    }
    const verifyCode = (val, ind) => {
        if (val == transaction.v_code)
            setValid(true)
    }
    const VoucherScreen = () => {
        history.push(`/voucher`)
    }

    if (loading, localLoad) {
        return <LoadingLottie />;
    } else {
        return (
            <div>
                <Modal title="Enter verification code from Email"
                    visible={vCodeModal}
                    onOk={valid ? VoucherScreen : null}
                    onCancel={() => setVCodeModal(false)}
                    okText={valid ? " Get Voucher " : " ... "}
                    cancelText="Later" style={{ textAlign: 'center', backgroundColor: '@button-color: red' }}>
                    <PinInput length={5}
                        focus={true}
                        disabled={valid}
                        initialValue=""
                        onChange={(val, ind) => { }}
                        type="numeric"
                        onComplete={(val, ind) => verifyCode(val, ind)}
                        style={{ padding: 0, fontSize: '4vmin' }}
                        inputStyle={{ borderRadius: '1.5vmin', border: '1.5px solid #889', fontSize: '5vmin', fontWeight: 'bold' }} />
                </Modal>
                <HeaderTitle address={locationData ? locationData.formatted_address : ""}
                    name={product ? product.businessName : null}
                    images={product ? product.images : null}
                    photos={locationData ? locationData.photos : null}
                    distance={distance} />
                <div className="Wrapper">
                    <OfferOptions options={offer} />
                    <DealDescription desc={product.descriptionHtml} />
                    <CustomerReviews reviews={locationData ? locationData.reviews : null}
                        rating={locationData ? locationData.rating : null}
                        total={locationData ? locationData.user_ratings_total : null} />
                    <MerchantDescription bold={bold} address={locationData ? locationData.formatted_address : null}
                        phone={locationData ? locationData.formatted_phone_number : null}
                        website={locationData ? locationData.website : null}
                        hours={locationData ? locationData.opening_hours : null}
                        description={product.merchantDescription}
                        name={locationData ? locationData.name : null} />
                    <br />
                    <Map setBold={setBold} map={locationData ? locationData.geometry : null} myLoc={myLoc} />
                    <RedeemBar setModal={setModal} />
                    <CopyRightBar />
                    <img src={Footer} alt="Footer" style={{ position: 'relative', bottom: 0, height: `15vh`, width: `100vw`, zIndex:'-1' }} />
                </div>
            </div>
        );
    }
}

