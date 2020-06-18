import React, { useEffect, useState, useContext } from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { OfferContext } from '../../context/OfferProvider';


export default function OfferOptions(props) {
    const { setCurrentOption } = useContext(OfferContext)
    const [value, setValue] = useState(props.options[0].id || null)

    const handleChange = (e) => { 
        setValue(e.target.value)
        let newOption = props.options.filter(O => O.id == e.target.value)
        setCurrentOption(newOption[0])
    }

    const NewRadio = withStyles({
        root: {
            color: deepPurple[700]
        },
    })((props) => <Radio color="default" {...props} />)

    const useStyles = makeStyles({
        root: {
            width: `90vw`,
            marginLeft: `5vw`,
        },
        fonts: {
            border: `2px solid red`,
        },
        checkboxLabel: {
            fontSize: `4vmin`,
            lineHeight: `1.2em`,
            marginLeft: `1vw`,
            marginTop: `0.5vh`,
            color: '#445',
        }
    })
    const classes = useStyles();

    const dealOffers = props.options.map(($O, indx) => {
        // let numPurchased = null;
        // if ($O.amountPurchased > 10)
        //     numPurchased = $O.amountPurchased - ($O.amountPurchased % 10);
        return (
            <React.Fragment key={indx}>
                <FormControlLabel classes={{ label: classes.checkboxLabel }} value={indx} control={<NewRadio />} label={$O.variant_title} />
                <div style={{ width: `80vw`, height: `4vh`, margin: '0 auto', display: 'flex', justifyContent: "space-between" }}>
                    <p style={{ margin: 0, marginLeft: `5vw`, alignSelf: 'center', color: "#889", fontSize: `3.5vmin`, display: 'inline-block', fontWeight: `400` }}>{null}</p>
                    <div style={{ display: 'flex' }}>
                        <p style={{ alignSelf: 'center', float: 'right', margin: 0, textDecorationLine: 'line-through', color: "#889", fontSize: `4.5vmin` }}>${$O.compareAtPrice}</p> &nbsp;&nbsp;&nbsp;
                        <p style={{ alignSelf: 'center', margin: 0, color: "#512da8", fontSize: `6vmin` }}>${$O.price}</p>
                    </div>
                </div>
                <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#b8b8b85', backgroundColor: '#b8b8b85', borderColor: '#b8b8b85' }} />
            </React.Fragment>
        )
    })

    return (
        <div style={{ width: `100vw` }}>
            <FormControl classes={{ root: classes.root }}>
                <RadioGroup aria-label="option" name="option" onChange={null} value={0}>
                    {dealOffers}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

// return (
//     <div style={{ width: `100vw`, backgroundColor: "#eee5" }}>
//         <FormControl classes={{ root: classes.root }}>
//             <RadioGroup aria-label="option" name="option" onChange={handleChange} value={value}>
//                 <FormControlLabel classes={{ label: classes.checkboxLabel }} value="First" control={<NewRadio />} label="52% OFF Two Hours of Bowling &amp; Shoe Rental For One" />
//                 <div style={{ width: `80vw`, height: `4vh`, margin: '0 auto', display: 'flex', justifyContent: "space-between" }}>
//                     <p style={{ margin: 0, marginLeft: `5vw`, alignSelf: 'center', color: "#888", fontSize: `3.5vmin`, display: 'inline-block', fontWeight: `400` }}>650+ &nbsp;purchased</p>
//                     <div style={{ display: 'flex' }}>
//                         <p style={{ alignSelf: 'center', float: 'right', margin: 0, textDecorationLine: 'line-through', color: "#888", fontSize: `4.5vmin` }}>$49</p> &nbsp;&nbsp;&nbsp;
//                     <p style={{ alignSelf: 'center', margin: 0, color: "#2196f3", fontSize: `6vmin` }}>$19</p>
//                     </div>
//                 </div>
//                 <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#9991', backgroundColor: '#9991', borderColor: '#9991' }} />
//                 {/************************************/}
//                 <FormControlLabel classes={{ label: classes.checkboxLabel }} value="Second" control={<NewRadio />} label="65% OFF a Two Hour Bowling Session For Two, Plus Two Free Appetizers" />
//                 <div style={{ width: `80vw`, height: `4vh`, margin: '0 auto', display: 'flex', justifyContent: "space-between" }}>
//                     <p style={{ margin: 0, marginLeft: `5vw`, alignSelf: 'center', color: "#888", fontSize: `3.5vmin`, display: 'inline-block', fontWeight: `400` }}>30+ &nbsp;purchased</p>
//                     <div style={{ display: 'flex' }}>
//                         <p style={{ alignSelf: 'center', float: 'right', margin: 0, textDecorationLine: 'line-through', color: "#888", fontSize: `4.5vmin` }}>$100</p> &nbsp;&nbsp;&nbsp;
//                     <p style={{ alignSelf: 'center', margin: 0, color: "#2196f3", fontSize: `6vmin` }}>$35</p>
//                     </div>
//                 </div>
//                 <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#9991', backgroundColor: '#9991', borderColor: '#9991' }} />
//                 {/************************************/}
//                 <FormControlLabel classes={{ label: classes.checkboxLabel }} value="Third" control={<NewRadio />} label="84% OFF PARTYING @ the Playboy Mansion" />
//                 <div style={{ width: `80vw`, height: `4vh`, margin: '0 auto', display: 'flex', justifyContent: "space-between" }}>
//                     <p style={{ margin: 0, marginLeft: `5vw`, alignSelf: 'center', color: "#888", fontSize: `3.5vmin`, display: 'inline-block', fontWeight: `400` }}>10+ &nbsp;purchased</p>
//                     <div style={{ display: 'flex' }}>
//                         <p style={{ alignSelf: 'center', float: 'right', margin: 0, textDecorationLine: 'line-through', color: "#888", fontSize: `4.5vmin` }}>$31,500</p> &nbsp;&nbsp;&nbsp;
//                     <p style={{ alignSelf: 'center', margin: 0, color: "#2196f3", fontSize: `6vmin` }}>$2,999</p>
//                     </div>
//                 </div>
//                 <hr style={{ width: `90vw`, margin: `1vh auto`, color: '#9991', backgroundColor: '#9991', borderColor: '#9991' }} />
//             </RadioGroup>
//         </FormControl>
//     </div>
// )