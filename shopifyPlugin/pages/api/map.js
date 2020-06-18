import Geocode from "react-geocode";
Geocode.setApiKey('AIzaSyAfTmvVvLL6-SdQy6O5GcgiG3vxoDDEhic')
Geocode.setLanguage('en')
Geocode.setRegion('us')
Geocode.enableDebug()


export default async (req, res) => {
    let $ = req.body;
    let map = await Geocode.fromAddress(`${$.street} ${$.city}, ${$.state} ${$.zipCode}`) //Address goes here to get lat, long
    if (map)
        res.status(200).json({ coords: map.results[0].geometry.location })
    else
        res.status(200).send({coords: {lat: null, lng: null}})
}