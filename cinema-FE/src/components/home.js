import React, { useState, useEffect } from 'react';
import "../styles/home.scss"
import Card from "./card"
import Modal from "./createModal"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [movies, setMovies] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/movie")
            .then(res => {
                setTimeout(() => {
                    setMovies(res.data)
                    setOpen(false)
                }, 700)
            })
        if(movies.length === 0)
            setOpen(true)
        // eslint-disable-next-line
    }, [])

    const openModal = () => {
        setModalOpen(!modalOpen)
    }

    const openSnackbar = () => {
        setSnackbarOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setSnackbarOpen(false);
    };

    return (
        <div className="container">
            <div className="scrollable">
                <div className="add-card" onClick={openModal}>
                    +
                </div>
                {movies.length > 0 ? movies.map((item, i) => {
                    return <Card key={i} image={item.poster} title={item.title} to={`/movie/${item.id}`}></Card>
                }) : null}
            </div>
            <Modal modalOpen={modalOpen} openSnackbar={openSnackbar}></Modal>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{"horizontal": "left", "vertical": "bottom"}}>
                <Alert onClose={handleClose} style={{backgroundColor: "#1C1C21", fontFamily: "Montserrat", fontWeight: "600"}}>
                    Successfully added movie
                </Alert>
            </Snackbar>
            <Backdrop open={open} style={{zIndex: 1}}>
                <CircularProgress style={{color: "#C80425"}} />
            </Backdrop>
        </div>
    )
}