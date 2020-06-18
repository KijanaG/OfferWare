import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import config from '../../assets/config.json';

function Map(props) {
    const [loc, setLoc] = useState(null)

    useEffect(() => {
        if (props.map)
            setLoc(props.map.location);
    }, [props.map])

    const handleBold = () => {
        props.setBold(true)
        setTimeout(() => {
            props.setBold(false)
        }, 500)
    }

    if (loc) {
        return (
            <GoogleMap defaultZoom={15}
                defaultCenter={{ lat: loc.lat, lng: loc.lng }}>
                <Marker key={1} position={{ lat: loc.lat, lng: loc.lng }}
                    onClick={handleBold} />
                {props.myLoc &&
                    <Marker key={2} position={{ lat: props.myLoc.lat, lng: props.myLoc.lng }}
                        onClick={handleBold}  />
                } {/*icon={{url: '../'}}*/}
            </GoogleMap>
        )
    } else {
        return (null)
    }
}


const WrappedMap = withScriptjs(withGoogleMap(Map));


export default function ReactMap(props) {
    return (
        <div style={{ height: `32vh`, width: `90vw`, margin: '0 auto' }}>
            <WrappedMap
                {...props}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.googleMapKey}`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

