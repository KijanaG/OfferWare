export function SendMerchantEmail(
    merchantName,
    contactName,
    email,
    html,
    cleanOptions,
    merchantDescription,
    merchant_id
) {
    let templateData = {};
    templateData['to_name'] = contactName;
    templateData['merchant_name'] = merchantName;
    templateData['to_email'] = email;
    templateData['message_html'] = html;
    templateData['from_name'] = "OfferWare Team";
    templateData['merchant_description'] = merchantDescription;
    let optionList = "<div>";
    for (var o of cleanOptions) {
        optionList += `<ul><b>Offer Description:</b> "${o.offerDescription}". <b>Monthly Cap:</b> ${o.dealCap}. 
        <b>Original Price:</b> ${o.retailPrice}. <b>Offer Price:</b> ${o.offerPrice}. <b>Our sales margin:</b> ${o.ourMargin}. 
        <b>Your sales margin:</b> ${o.theirMargin}.</ul>`;
    }
    templateData['offers'] = optionList;
    templateData['stripe_link'] = `http://localhost:3000/register/${merchant_id}`;
    return templateData;
}