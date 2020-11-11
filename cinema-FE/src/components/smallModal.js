import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle } from "../styles/styles"
import "../styles/modal.scss"

export default function Modal(props) {
  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        if(!firstRender)
          handleOpen();
        else
          setFirstRender(false);
          // eslint-disable-next-line
    }, [props.modalOpen])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    handleClose();
    props.modalAction()
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
    maxWidth="xs"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{padding: "16px 16px 0 16px"}}>
          Add image
      </DialogTitle>
      <DialogContent style={{display: "flex"}}>
        <div className="small-modal-text">{props.text}</div>
      </DialogContent>
      <DialogActions>
          <Button autoFocus onClick={handleClose} style={{color: "#C80425", fontFamily: "Montserrat", fontWeight: "600"}}>
            Close
          </Button>
          <Button autoFocus onClick={handleClick} style={{color: "#D9E4E8", fontFamily: "Montserrat", fontWeight: "600"}}>
            Ok
          </Button>
      </DialogActions>
    </Dialog>
  );
}
