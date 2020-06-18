import React, { useContext, useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { Button, Modal } from 'semantic-ui-react';

export default function OptionForm(props) {
    const [optionCount, setOC] = useState(1)

    const updateOption = (ev, index) => {
        let temp = [...props.options];
        try {
            let tempVal = ev.target.value;
            if (ev.target.name == "offerDescription")
                tempVal = ev.target.value.trim()
            if (tempVal == '')
                temp[index][ev.target.name] = null;
            else
                temp[index][ev.target.name] = tempVal;
            if (!objIsEmpty(temp[index]))
                temp[index].empty = false
            else
                temp[index].empty = true
            autoUpdateInputs(temp)
            props.setOptions(temp)
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    const autoUpdateInputs = (tempOptions) => {
        for (let obj of tempOptions) {
            if (!obj['empty']) {
                if (obj['offerPrice'] && obj['retailPrice'])
                    obj['discountPercent'] = Math.round((1 - (obj['offerPrice'] / obj['retailPrice'])).toFixed(2) * 100);
                if (obj['ourMargin'])
                    obj['theirMargin'] = 100 - obj['ourMargin']
                if (!obj['offerPrice'] && !obj['retailPrice']) {
                    obj['discountPercent'] = null
                    if (objIsEmpty(obj)) obj.empty = true
                }
                if (!obj['ourMargin']) {
                    obj['theirMargin'] = null
                    if (objIsEmpty(obj)) obj.empty = true
                }
            }
        }
        return tempOptions
    }

    //Form Option requires fill out if not Empty
    //Otherwise only 1st out of the 4 options must be filled out
    const objIsEmpty = (obj) => {
        let isEmpty = true;
        for (var el in obj) {
            if (obj[el] == 'empty')
                continue;
            if (obj[el])
                isEmpty = false
        }
        return isEmpty;
    }

    const showOneMore = (e) => {
        e.preventDefault()
        setOC(optionCount + 1)
    }

    return (
        <div>
            <Modal.Description>Option #1 (required)</Modal.Description>
            <OptionInstance updateOption={updateOption} option={props.options[0]} index={0} />
            {optionCount >= 2 ?
                <><Modal.Description>Option #2 (optional) – Leave blank if not used.</Modal.Description>
                    <OptionInstance updateOption={updateOption} option={props.options[1]} index={1} /></>
                : null}
            {optionCount >= 3 ?
                <><Modal.Description>Option #3 (optional) – Leave blank if not used.</Modal.Description>
                    <OptionInstance updateOption={updateOption} option={props.options[2]} index={2} /></>
                : null}
            {optionCount == 4 ?
                <><Modal.Description>Option #4 (optional) – Leave blank if not used.</Modal.Description>
                    <OptionInstance updateOption={updateOption} option={props.options[3]} index={3} /></>
                : null}
            {optionCount < 4 ?
                <center><Button onClick={showOneMore}>Add Option</Button></center> : null}
            <br />
        </div>
    )
}

const OptionInstance = (props) => {
    let required = (props.index == 0 ? 1 : 0) || (!props.option.empty)
    return (
        <div>
            <Form.Item name={`offerDescription${props.index}`}
                rules={[{ required: required, whitespace: true, message: "Offer description will show verbatum on Offer site.", }]} >
                <Input onChange={(e) => props.updateOption(e, props.index)} value={props.option.offerDescription} name="offerDescription" placeholder="Offer Description" />
            </Form.Item>
            <Form.Item rules={[{ required: required }]} style={{ display: "inline-block", marginRight: "15px" }} name={`offerPrice${props.index}`} label="Offer Price ($)">
                <Input
                    value={props.option.offerPrice}
                    onChange={(e) => props.updateOption(e, props.index)}
                    name="offerPrice" type="number" />
            </Form.Item>
            <Form.Item rules={[{ required: required }]} style={{ display: "inline-block", marginRight: "15px" }} label="Retail Price ($)" name={`retailPrice${props.index}`} >
                <Input
                    onChange={(e) => props.updateOption(e, props.index)}
                    value={props.option.retailPrice}
                    name="retailPrice" type="number" />
            </Form.Item>
            <Form.Item style={{ display: "inline-block", marginRight: "15px" }} label="Percent Off (%)" name={`discountPercent${props.index}`} >
                <center><h5>{props.option.discountPercent}</h5></center>
            </Form.Item>
            <Form.Item rules={[{ required: required }]} style={{ display: "inline-block" }} label="Monthly Deal Cap (#)" name={`dealCap${props.index}`} >
                <Input
                    onChange={(e) => props.updateOption(e, props.index)}
                    value={props.option.dealCap}
                    name="dealCap" type="number" />
            </Form.Item>
            <Form.Item rules={[{ required: required }]} style={{ display: "inline-block" }} label="Our per unit sales margin (%)" name={`ourMargin${props.index}`} >
                <Input
                    onChange={(e) => props.updateOption(e, props.index)}
                    value={props.option.ourMargin}
                    name="ourMargin" type="number" />
            </Form.Item>
            <Form.Item value={props.option.theirMargin} style={{ display: "inline-block" }} label="Their per unit sales margin (%)" name={`theirMargin${props.index}`} >
                <center><h5>{props.option.theirMargin}</h5></center>
            </Form.Item>
            <hr style={{borderWidth: 3}}/>
        </div>
    )
};

export const Option = {
    offerDescription: null, offerPrice: null,
    retailPrice: null, discountPercent: null,
    dealCap: null, ourMargin: null, theirMargin: null,
    empty: true, amountPurchased: 0
};