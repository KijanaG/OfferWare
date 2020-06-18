import React, { useState, useEffect, useContext } from 'react';
import { OfferContext } from '../../context/OfferProvider';
import Spinner from '../../components/Spinner/Spinner';
import HeaderTitle from '../../components/TitleHeader/TitleHeader';
import OfferOptions from '../../components/OfferOptions/OfferOptions';
import DealDescription from '../../components/DealDescription/DealDescription';
import BuyNowBar from '../../components/BuyNow/BuyNow';
import MerchantDescription from '../../components/MerchantDescription/MerchantDescription';
import Map from '../../components/Map/Map';
import CopyRightBar from '../../components/CopyRightBar/CopyRightBar';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import { getDirections } from '../../services/Server';


export default function OfferContainer(props) {
    const { offer, loading, currentOption, locationData } = useContext(OfferContext)
    const [bold, setBold] = useState(false)
    const [myLoc, setLoc] = useState(null)
    const [distance, setDistance] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        })
    }, [])

    useEffect(() => {
        const findLoc = async () => {
            let dist = await getDirections(myLoc, locationData.geometry.location);
            if (dist) setDistance(dist)
        }
        if(locationData && myLoc) findLoc()
    }, [locationData, myLoc])

    if (loading && props.loading) {
        return <div>"Loading!!"</div>
    } else {
        return (
            <div>
                <HeaderTitle address={locationData ? locationData.formatted_address : ""} 
                name={locationData ? locationData.name : props.offer.name} 
                photos={locationData ? locationData.photos : null}
                distance={distance} />
                <div className="Wrapper">
                    <OfferOptions options={props.offer} />
                    <DealDescription desc={offer.dealDescription} />
                    <CustomerReviews reviews={locationData ? locationData.reviews : null}
                        rating={locationData ? locationData.rating : null}
                        total={locationData ? locationData.user_ratings_total : null} />
                    <MerchantDescription bold={bold} address={locationData ? locationData.formatted_address : null}
                        phone={locationData ? locationData.formatted_phone_number : null}
                        website={locationData ? locationData.website : null}
                        hours={locationData ? locationData.opening_hours : null}
                        description={offer.merchantDescription}
                        name={locationData ? locationData.name : null} />
                    <br />
                    <Map setBold={setBold} map={locationData ? locationData.geometry : null} myLoc={myLoc}/>
                    <BuyNowBar price={currentOption.offerPrice} />
                    <CopyRightBar />
                </div>
            </div>
        );
    }
}

