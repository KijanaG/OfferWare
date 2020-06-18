import React from 'react';
import { Button, Modal, Header, Popup } from 'semantic-ui-react';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import Geocode from "react-geocode";
import config from '../assets/config.json';
Geocode.setApiKey(config.geocode)
Geocode.setLanguage('en')
Geocode.setRegion('us')
Geocode.enableDebug()

//Google Maps Geocode
export const getCoords = async (street, city, zipCode, state) => {
    return await Geocode.fromAddress(`${street} ${city}, ${state} ${zipCode}`) //Address goes here to get lat, long
        .then(res => res.results[0].geometry.location).catch(err => null)
}

//Google Cloud FireBase
export function UploadToFireBase(props) {
    const handleUploadStart = () => props.setLoading(true);
    const handleUploadError = (err) => { alert(err); props.setLoading(false); }
    const handleUploadSuccess = (filename) => {
        props.setLoading(false);
        alert(`Successful upload! You can now upload ${2 - props.urls.length} more...`);
        firebase.storage().ref("images").child(filename).getDownloadURL()
            .then(url => props.setURLs([...props.urls, url]));
    }
    return (
        <>
            <Header>Photos</Header>
            <Modal.Description>Photos should be about 1170 x 730. Or aspect ratio of ~1.5. <a target="_blank" href={"https://resizeimage.net"}>Resize Image</a></Modal.Description>
            <center>
                <Popup content={props.policy} trigger={
                    <Button>
                        <FileUploader accept="image/jpeg" name="dealImage"
                            randomizeFilename storageRef={firebase.storage().ref("images")}
                            onUploadError={handleUploadError} onUploadSuccess={handleUploadSuccess}
                            onUploadStart={handleUploadStart} />
                    </Button>}
                />
            </center>
        </>
    )
}