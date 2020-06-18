import React, { useState, useEffect } from 'react';
import StarRating from 'react-star-ratings';
import StockPhoto from '../../assets/stock.jpg';

export default function DealDescription(props) {
    const [reviews, setReviews] = useState([])
    const [count, setCount] = useState(3)
    const [photoArr, setArr] = useState([false,false,false,false,false])

    const loadMore = () => {
        let current = props.reviews.filter((review, i) => i < (count + 3))
        setCount(count + 3)
        setReviews(current)
    }
    useEffect(() => {
        const logViews = () => {
            let current = props.reviews.filter((review, i) => i < count)
            setReviews(current)
        }
        if (props.reviews)
            logViews();
    }, [props.reviews])

    const handleImgError = (e,x) => {
        let tempArr = [...photoArr];
        tempArr[x] = true
        setArr(tempArr)
        e.target.src = StockPhoto;
    }

    let listedReviews = null;
    if (reviews.length > 0) {
        listedReviews = reviews.map((review, x) => {
            if(review.rating < 3) return null
            let rand = Math.floor(Math.random() * 360);
            return (
                <div key={x} style={{ width: '100%', display: 'flex', marginTop: `1vh`, }}>
                    <div style={{ marginRight: `2vw`, width: `15vw`, display: 'inline-block', alignSelf: 'flex-start' }}>
                        <img onError={(e) => handleImgError(e,x)} style={{ width: '12vw', borderRadius: '15vw', border: `1.5px solid #7785`, boxShadow: `0 7px 7px #2239`, filter:`hue-rotate(${photoArr[x] ? rand : 0}deg)` }} src={review.profile_photo_url} alt="photo" />
                    </div>
                    <div style={{ marginRight: `1vw`, display: 'inline-block', width: `20vw`, textAlign: 'center', marginTop: `1vh`, fontSize: '70%', alignSelf: 'flex-start' }}>
                        <p style={{ marginTop: '0%', marginBottom: '0%', color: '#aab', fontSize: `3vmin`, fontWeight: `700` }}>{review.author_name}</p>
                        <StarRating style={{ position: 'relative', }} rating={review.rating} starDimension='3.8vmin' starSpacing='0'
                            starRatedColor="gold" starEmptyColor="#eee" />
                    </div>
                    <div style={{ display: 'inline-block', marginRight: `1vw`, width: `50vw`, marginLeft: `2vw`, textAlign: 'left' }}>
                        <p style={{ fontSize: `2.6vmin`, lineHeight: `3.2vmin`, color: '#99a', fontStyle: 'italic' }}>{review.text}</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <React.Fragment>
            <div style={{ width: `90vw`, margin: '0 auto', color: `#667`, fontWeight: `400` }}>
                <p style={{ fontSize: `4.2vmin`, fontWeight: `500`, color: '#667', margin: 0 }}>Customer Reviews:</p>
                <div style={{ width: '100%', height: `3vh`, justifyContent: 'left', marginBottom: `4vh` }}>
                    <p style={{
                        display: 'inline-block', fontSize: `4vmin`, fontWeight: '600', color: '#bbc',
                        marginLeft: `1vw`, marginRight: `3vw`
                    }}>{props.rating}</p>
                    <div style={{ display: 'inline-block', width: 'auto', height: 'auto', position: 'relative', bottom: `20%` }}>
                        <StarRating rating={props.rating ? props.rating : 0} starDimension='4vmin' starSpacing='0'
                            starRatedColor="gold" starEmptyColor="#eee" /></div>
                    <p style={{
                        display: 'inline-block', fontSize: `3.4vmin`, fontWeight: '500', color: '#bbc',
                        marginLeft: `3vw`,
                    }}>{props.total ? props.total : 0} Google Reviews</p>
                </div>
                <div style={{ fontSize: '4vmin', marginTop: `2vh`, textAlign: 'center' }}> {/*Customer Review List */}
                    {listedReviews}
                    {props.reviews && count < props.reviews.length ?
                        <button onClick={loadMore} style={{color: '#2196f3', fontSize: `3.6vmin`, marginRight: '5vw', background: 'none',
                            border: 'none', cursor: 'pointer'}}>See more</button>
                        : null}
                </div>
            </div>
            <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#9991', backgroundColor: '#9991', borderColor: '#9991' }} />
        </React.Fragment>
    )
}