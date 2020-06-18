import React from 'react';

export default function DealDescription(props) {

    return (
        <React.Fragment>
            <div style={{ width: `90vw`, margin: '2vh auto 0 auto', color: `#667`, fontWeight: `400` }}>
                <p style={{ marginLeft: `0vw`, fontSize: `4.2vmin`, fontWeight: `500` }}>About This Deal:</p>
                <div style={{ marginLeft: `5vw`, fontSize:'3.6vmin', width: `84vw`, lineHeight:`4.4vmin` }}>
                    <div dangerouslySetInnerHTML={{ __html: props.desc }} /> {/*CAREFUL OF XSS} */}
                </div>
            </div>
            <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#9991', backgroundColor: '#9991', borderColor: '#9991' }} />
        </React.Fragment>
    )
}