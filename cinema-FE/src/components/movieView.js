import React, { useEffect, useState } from 'react';
import "../styles/view.scss"
import axios from "axios"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from "./editModal"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SmallModal from "./smallModal"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MovieView(props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [smallModalOpen, setSmallModalOpen] = useState(false);
    const [movie, setMovie] = useState({});
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setModalOpen(!modalOpen)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setSnackbarOpen(false);
    };

    useEffect(() => {
        getAndSetMovie();
        // eslint-disable-next-line
    }, [])

    const openSnackbar = () => {
        setSnackbarOpen(true);
    };

    const getAndSetMovie = async () => {
        setOpen(true);
        const res = await axios.get(
            `http://localhost:8080/movie/${props.match.params.id}`
        );
        setTimeout(() => {
            if(res.data)
            setOpen(false);
            setMovie(res.data);
        }, 700);
    };

    const receiveUpdatedMovie = (movie) => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 700);
        setMovie(movie);
    }

    const openSmallModal = () => {
        setSmallModalOpen(!smallModalOpen)
    }

    const handleDelete = async () => {
        // eslint-disable-next-line
        const res = await axios.delete(`http://localhost:8080/movie/${movie.id}`).data;
        props.history.push('/');
    }

    return ( 
        <div className="background" style={{backgroundImage: `url(${movie.gif})`}}>
            {movie.title ? 
            <div className="background-overlay">
                <div className="view-container">
                    <div className="column" style={{display: "flex"}}>
                        <div className="column">
                            <div className="view-images-div">
                                <img className="view-image" src={movie.images ? movie.images[0] : ""} alt=""></img>
                            </div>
                            <div className="view-images-div">
                                <img className="view-image" src={movie.images ? movie.images[1] : ""} alt=""></img>
                            </div>
                        </div>
                        <div className="column">
                            <div className="view-images-div">
                                <img className="view-image" src={movie.images ? movie.images[2] : ""} alt=""></img>
                            </div>
                            <div className="view-images-div">
                                <img className="view-image" src={movie.images ? movie.images[3] : ""} alt=""></img>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="info-div">
                            <div className="view-title">{movie.title}</div>
                            <div className="view-genres-div">
                                {Array.isArray(movie.genres) ? movie.genres.map((item, i) => {
                                    return <span key={i} className="view-genres">{item.toUpperCase() + (i !== movie.genres.length - 1 ? " - " : "")} </span>
                                }) : null}
                            </div>
                            <div className="view-general-info-div">
                                {movie.year ? <span>{movie.year} | {movie.runtime} min | {movie.rated} | IMDB {movie.imdbRating}</span> : null}
                            </div>
                            {movie.director ? <div className="view-director-and-writer">Directed by: {movie.director}</div> : null}
                            {movie.writer ? <div className="view-director-and-writer">Directed by: {movie.writer}</div> : null}
                            {Array.isArray(movie.actors) ? <div className="view-actors">{movie.actors.map((item, i) => {
                                return <span key={i}>{item + (i !== movie.actors.length - 1 ? ", " : "")} </span>
                            })}</div> : null}
                            <div className="view-plot">{movie.plot}</div>
                            <div className="buttons">
                                <div className="button" onClick={openModal}>
                                    <span className="button-text">EDIT</span> 
                                </div>
                                <div className="button" style={{color: "#C80425"}} onClick={openSmallModal}>
                                    <div className="button-text" style={{color: "#C80425"}}>DELETE</div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
            <Backdrop style={{zIndex: 1}} open={open}>
                <CircularProgress style={{color: "#C80425"}} />
            </Backdrop>
            {movie.title ? <Modal modalOpen={modalOpen} openSnackbar={openSnackbar} movie={movie} sendUpdatedMovie={receiveUpdatedMovie}></Modal> : null}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{"horizontal": "left", "vertical": "bottom"}}>
                <Alert onClose={handleClose} style={{backgroundColor: "#1C1C21", fontFamily: "Montserrat", fontWeight: "600"}}>
                    Successfully edited movie
                </Alert>
            </Snackbar>
            <SmallModal modalAction={handleDelete} text={`Do you want to delete ${movie.title}?`} modalOpen={smallModalOpen}></SmallModal>
        </div>
    );
}