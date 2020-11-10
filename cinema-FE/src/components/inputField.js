import React, { useState, useEffect } from 'react';
import {modalStyles2} from "../styles/styles"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const inputStyles = {
    color: "#D9E4E8",
    fontFamily: "Montserrat"
}

export default function InputField(props) {
    const classes = modalStyles2();
    const [value, setValue] = useState("")
    
    const handleChange = (value) => {
        setValue(value);
        props.setValues(props.name.toLowerCase(), value, props.index)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <FormControl fullWidth>
            <InputLabel style={inputStyles}>{props.name}</InputLabel>
            <Input
                className={classes.inputColors}
                id="standard-adornment-password"
                type="text"
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                disableUnderline={true}
                autoFocus={true}
                style={inputStyles}
                multiline={props.name === "Plot" || props.name === "Actors" ? true : false}
            />
            {props.name === "Genres" ? 
            <FormHelperText style={{ color: "#D9E4E8", margin: "0", fontFamily: "Montserrat", fontSize: "10px" }}>If there are more than one, seperate them using commas ( , )</FormHelperText>
            : props.name === "Actors" ? 
            <FormHelperText style={{ color: "#D9E4E8", margin: "0", fontFamily: "Montserrat", fontSize: "10px" }}>If there are more than one, seperate their full names using commas ( , )</FormHelperText>
            : props.name === "Runtime" ?
            <FormHelperText style={{ color: "#D9E4E8", margin: "0", fontFamily: "Montserrat", fontSize: "10px" }}>In minutes</FormHelperText>
            : props.name === "Released" ? 
            <FormHelperText style={{ color: "#D9E4E8", margin: "0", fontFamily: "Montserrat", fontSize: "10px" }}>Format: yyyy-mm-dd</FormHelperText>
            : null}
        </FormControl>
    )
}