import React from 'react';
import { Carousel } from 'react-bootstrap'
import config from '../../assets/config.json';

export default function HeaderTitle(props) {
    let A = props.address;
    if (A) {
        let tempIndex = A.indexOf(', USA');
        A = A.substring(0, tempIndex)
    }
    let images = null
    if (props.images) {
        images = props.images.map((img, x) => {
            return (
                <Carousel.Item key={x}>
                    <img style={{ width: `90vw`, filter: "brightness(75%)", height: '32vh', top: 0, zIndex: -1, borderBottomRightRadius: `1vmin`, borderBottomLeftRadius: `1vmin` }}
                        src={img.originalSrc} alt={img.altText} />
                </Carousel.Item>
            )
        })
    }
    let photos = null
    if (props.photos) {
        photos = props.photos.map((photo, x) => {
            return (
                <Carousel.Item key={x}>
                    <img style={{ width: `90vw`, filter: "brightness(75%)", height: '32vh', top: 0, zIndex: -1, borderBottomRightRadius: `1vmin`, borderBottomLeftRadius: `1vmin` }}
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&photoreference=${photo.photo_reference}&key=${config.googleMapKey}`} />
                </Carousel.Item>
            )
        })
    }
    return (
        <div style={{ width: `100vw`, position: "relative", textAlign: "center" }}>
            <Carousel indicators={false} slide={true}>
                {images}
                {photos}
            </Carousel>
            <div style={{ position: "absolute", zIndex: 1, color: "white", top: `22.5vh`, marginLeft: `6vw`, textAlign: 'left', }}>
                <p style={{ margin: 0, fontSize: props.name.length > 30 ? `4vmin` :`5vmin`, marginLeft: `5vw`, lineHeight: '5.2vmin' }}>{props.name}</p>
                <div style={{ width: '79vw', margin: '0.5vh 0 0 5vw', display: 'flex', justifyContent: "space-between", }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'top', maxWidth: '70%' }}>
                        <p style={{ margin: 0, fontSize: `3.4vmin`, fontWeight: `400`, lineHeight: '3.6vmin', overFlow: 'wrap-text', }}>{`${A}`}</p>
                    </div>
                    <div style={{ display: 'inline-block', float: 'right', verticalAlign: 'top' }}>
                        <p style={{ margin: 0, fontSize: `3.8vmin`, fontWeight: `600`, verticalAlign: 'top', lineHeight: '3.6vmin', }}>{props.distance}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}