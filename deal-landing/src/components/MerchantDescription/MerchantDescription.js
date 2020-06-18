import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import './MerchantDescription.css';

export default function MerchantDescription(props) {
    const [description, setDesc] = useState(props.description)
    const [num, setNum] = useState(0)
    const [showAll, setShowAll] = useState(false)
    const [index, setIndex] = useState(-1)

    useEffect(() => {
        for (var i = 210; i < description.length; i++) {
            if (description[i] == ' ') {
                setNum(i)
                break;
            }
        }
    }, [])

    const showFullText = () => {
        setShowAll(true)
    }
    useEffect(() => {
        if (props.address) {
            let tempIndex = props.address.indexOf(", USA");
            if (tempIndex > index)
                setIndex(tempIndex)
        }
    }, [props.address])
    let hours = null;
    if (props.hours) {
        hours = props.hours.weekday_text.map((hour, x) => {
            return (
                <p style={{ fontSize: `2.5vmin`, margin: 0, color: '#aab' }} key={x}>{hour}</p>
            )
        })
    }

    return (
        <React.Fragment>
            <div style={{ width: `90vw`, margin: '0 auto', color: `#667`, fontWeight: `400` }}>
                <p style={{ marginLeft: `0vw`, fontSize: `4.2vmin`, fontWeight: `500` }}>Location Information:</p>
                {(showAll || description.length) < 210 ?
                    <p style={{ fontSize: `3vmin`, color: `#889`, lineHeight: `3.4vmin` }}>{description}</p>
                    : <p style={{ fontSize: `3vmin`, color: `#889`, lineHeight: `3.4vmin` }}>{description.substring(0, num)}
                        <span style={{ color: '#2196f3', cursor: 'pointer' }} onClick={showFullText}> see more</span></p>
                }
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '45%', alignSelf: 'flex-start', fontSize: '3vmin', marginRight: '10%' }}>
                        <p className={props.bold ? "AnimateWord" : null} style={{ fontWeight: 'bold', overflowWrap: 'normal', marginBottom: '1vh', color: '#889' }}>{props.name ? props.name : null}</p>
                        <List style={{ marginTop: `0vh` }}>
                            <List.Item>
                                <List.Icon style={{ margin: 0, position: 'relative', bottom: `0.5vh`, marginRight: `1vw`, color: '#aab' }} size="large" name="map marker alternate" />
                                <List.Content style={{ color: 'red', fontSize: `2.5vmin`, color: '#aab', fontWeight: '500' }}>
                                    {props.address ? props.address.substring(0, index) ? props.address.substring(0, index) : null : "Failed to load address."}
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon style={{ margin: 0, position: 'relative', bottom: `0.5vh`, marginRight: `1vw`, color: '#aab' }} size="large" name="volume control phone" />
                                <List.Content style={{ color: 'red', fontSize: `2.5vmin`, color: '#aab', fontWeight: '500' }}>{props.phone ? props.phone : null}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon style={{ margin: 0, position: 'relative', bottom: `0.5vh`, marginRight: `1vw`, color: '#aab' }} size="large" name="globe" />
                                <List.Content style={{ color: 'red', fontSize: `2.5vmin`, color: '#aab', fontWeight: '500' }}>
                                    {props.website ? props.website.substring(props.website.indexOf('www'), props.website.lastIndexOf('') - 1) : null}</List.Content>
                            </List.Item>
                        </List>
                    </div>
                    <div style={{ width: '45%', alignSelf: 'flex-start', fontSize: '3vmin' }}>
                        <p className={props.bold ? "AnimateWord" : null} style={{ fontWeight: 'bold', marginBottom: '1vh', color: '#889' }}>Hours of Operation</p>
                        {hours}
                    </div>
                </div>
            </div>
            <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#9991', backgroundColor: '#9991', borderColor: '#9991' }} />
        </React.Fragment>
    )
}