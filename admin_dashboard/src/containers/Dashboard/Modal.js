import React, { useState, useEffect } from 'react';
import { Modal, Header } from 'semantic-ui-react';
import { DealForm } from '../../components/Styles/FormWrapper';
import {
    ContactName, MerchantEmail, MerchantName, PhoneNumber, StreetAddress, City, ZipState, FormButton, TextBlock
} from '../../components/Antd/Form';
import OptionForm from './OptionForm';
import RichTextEditor from 'react-rte';
import { uploadMerchantFormData } from '../../services/Server';
import emailjs from 'emailjs-com';
import { SendMerchantEmail } from './Email';
import { getCoords, UploadToFireBase } from '../../services/API';
import { Option } from './OptionForm';
const short = require('short-uuid');

export default function ModalView(props) {
    const [options, setOptions] = useState([{ ...Option, id: short.generate() }, { ...Option, id: short.generate() },
    { ...Option, id: short.generate() }, { ...Option, id: short.generate() }])
    const [value, setValue] = useState(RichTextEditor.createEmptyValue())
    const [loading, setLoading] = useState(false)
    const [html, collectHTML] = useState("") //For displaying on landing page
    const [urls, setURLs] = useState([])

    useEffect(() => {
        collectHTML(value.toString('html'))
    }, [value])

    const handleSubmit = async (val) => {
        console.log(val)
        setLoading(true)
        if (html.length <= 8) {
            alert("Please fill out Deal Description section.");
            return
        }
        let { merchantName, contactName, email, phoneNumber, streetAddress, city, zipCode, state, merchantDescription } = val;
        let { lat, lng } = await getCoords(streetAddress, city, zipCode, state);
        if (!lat && !lng) {
            alert("Address did not return a lat/lng. Please edit the addess format.");
            return
        }
        let cleanOptions = options.filter(option => !option.empty);
        let merchant_id = await uploadMerchantFormData(merchantName, { contactName, email: email.toLowerCase(), phoneNumber },
            { streetAddress, city, zipCode, state, lat, lng }, cleanOptions, html, merchantDescription);
        if (merchant_id) {
            let templateData = SendMerchantEmail(merchantName, contactName, email, html, cleanOptions, merchantDescription, merchant_id);
            emailjs.send('gmail', "template_FZKIOJ98", templateData, "user_uZwfUlWMtlL7jISBhh3cn")
                .then(res => props.setModal(false)).catch(err => alert(err))
        } else {
            setLoading(false)
            alert("Form did not upload properly, please try again. 🙁")
        }
    }

    return (
        <Modal closeIcon size="small" open={props.modal} onClose={() => props.setModal(false)}>
            <Modal.Header>Add a Deal</Modal.Header>
            <Modal.Content scrolling>
                <Header>Information will not be saved, if exited.</Header>
                <DealForm onFinish={handleSubmit}>
                    <Header>General Merchant Info</Header>
                    <MerchantName />
                    <ContactName />
                    <MerchantEmail />
                    <PhoneNumber />
                    <Header>Merchant's Address</Header>
                    <StreetAddress />
                    <City />
                    <ZipState />
                    <Header>Offer Options</Header>
                    <OptionForm options={options} setOptions={setOptions} />
                    <Header>Deal Description</Header>
                    <Modal.Description>The text will be displayed on the landing page, exactly how it looks in this text editor.
                    (Minus the font).
                    </Modal.Description>
                    <RichTextEditor value={value} onChange={setValue} /> <br />
                    <Header>Merchant Information</Header>
                    <Modal.Description>
                        This section will be displayed above the merchant's hours of peration, address, website, & phone #. Explain the ambiance, 
                        merchant mission, venue, description, etc.
                    </Modal.Description>
                    <TextBlock />
                    {/* {urls.length < 3 && <UploadToFireBase policy={<PicturePolicy />} setLoading={setLoading} urls={urls} setURLs={setURLs} />} <br /> */}
                    <FormButton name="Submit" loading={loading} />
                </DealForm>
                <br /> <br />
            </Modal.Content>
        </Modal>
    )
}


export function PicturePolicy() {
    return (
        <div>
            <h4>The picture must be: </h4>
            <ul>
                <li>JPEG format</li>
                <li>Aspect Ratio of about 1.5</li>
                <li>Ideally: 1,170 x 730</li>
                <li>Use https://resizeimage.net</li>
                <li>Optimize as Progressive Compression</li>
                <li>Image Quality 50%</li>
            </ul>
        </div>
    )
}