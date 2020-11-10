import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle } from "../styles/styles"
import "../styles/modal.scss"
import {modalStyles2} from "../styles/styles"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const inputStyles = {
  color: "#D9E4E8",
  fontFamily: "Montserrat"
}

export default function Modal(props) {
  const classes = modalStyles2();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(["", "", "", ""]);
  const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        if(!firstRender)
          handleClickOpen();
        else
          setFirstRender(false);
          // eslint-disable-next-line
    }, [props.modalOpen])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValues([])
  };
  const handleChange = (value) => {
    console.log(value)
    let _values = values;
    _values[props.imageIndex] = value;
    setValues(_values);
  }
  const handleSubmit = () => {
    setOpen(false)
    props.setImage(values, props.imageIndex);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} 
      PaperProps={{
        style: {
            backgroundColor: "#1c1c21",
            color: "#D9E4E8"
        }
    }}
    fullWidth={true}
    maxWidth="sm"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{padding: "16px 16px 0 16px"}}>
          Add image
      </DialogTitle>
      <DialogContent style={{display: "flex"}}>
        <FormControl fullWidth>
            <InputLabel style={inputStyles}>Image URL</InputLabel>
            <Input
              className={classes.inputColors}
              id="standard-adornment-password"
              type="text"
              value={values[props.imageIndex]}
              onChange={(e) => handleChange(e.target.value)}
              disableUnderline={true}
              autoFocus={true}
              style={inputStyles}
            />
        </FormControl>
      </DialogContent>
      <DialogActions>
          <Button autoFocus onClick={handleClose} style={{color: "#C80425", fontFamily: "Montserrat", fontWeight: "600"}}>
            Close
          </Button>
          <Button autoFocus onClick={handleSubmit} style={{color: "#D9E4E8", fontFamily: "Montserrat", fontWeight: "600"}}>
            Ok
          </Button>
      </DialogActions>
    </Dialog>
  );
}
