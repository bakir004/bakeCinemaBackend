import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle } from "../styles/styles"
import "../styles/modal.scss"
import InputField from "./inputField"
import Paper from '@material-ui/core/Paper';
import { editMovie } from "../services/movieService"

const generalValues = ["Title", "Year", "Rated", "Released", "Runtime", "Genres", "Plot", "Gif"]
const castValues = ["Director", "Writer", "Actors"]
const scoreValues = ["Metascore", "ImdbRating", "ImdbVotes"]
const imageValues = ["Image1", "Image2", "Image3", "Image4"]

export default function Modal(props) {
  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true)
  const [values, setValues] = useState({
    title: "",
    year: "",
    rated: "",
    released: "",
    runtime: "",
    genres: "",
    director: "",
    writer: "",
    actors: "",
    plot: "",
    gif: "",
    poster: "",
    metascore: "",
    imdbrating: "",
    imdbvotes: "",
    images: ["", "", "", ""]
  });

  useEffect(() => {
      if(!firstRender)
        handleClickOpen();
      else
        setFirstRender(false);

      setValues(props.movie)
        // eslint-disable-next-line
  }, [props.modalOpen])

  const handleClickOpen = () => {
    setOpen(true)
  };
  const emptyValues = () => {
    setValues({
      title: "",
      year: "",
      rated: "",
      released: "",
      runtime: "",
      genres: "",
      director: "",
      writer: "",
      actors: "",
      plot: "",
      poster: "",
      gif: "",
      metascore: "",
      imdbrating: "",
      imdbvotes: "",
      images: ["","","",""]
    })
  }
  const handleClose = () => {
    setOpen(false)
    emptyValues();
  };
  const setPropValue = (prop, value, index) => {
    if(prop.substring(0, 5) === "image") {
      let _values = values;
      _values.images[index] = value;
      setValues({...values, _values});
    } else { 
    let _values = values;
    _values[prop] = value;
    setValues({...values, _values});
    }
  }
  const autofill = () => {
    const _values = {
      title: "Breaking Bad",
      year: "2013",
      rated: "TV-14",
      released: "2008-01-20",
      runtime: "49",
      genres: "Crime, drama, thriller",
      director: "Vince Gilligan",
      writer: "Vince Gilligan",
      actors: "Bryan Cranston, Aaron Paul, Bob Odenkirk, Anna Gunn",
      plot: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's financial future.",
      poster: "https://ae01.alicdn.com/kf/HTB1sPxAhcnI8KJjSsziq6z8QpXaG/Crime-Movie-Breaking-Bad-Film-Propaganda-Posters-Kraft-Poster-Decorative-Wall-Sticker-Canvas-Painting-Home-Decoration.jpg",
      gif: "https://i.pinimg.com/originals/e3/69/70/e369709a2c570997787fb22d8294f626.gif",
      metascore: "100",
      imdbrating: "10",
      imdbvotes: "889,883",
      images: [
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgyMzI5NDc5Nl5BMl5BanBnXkFtZTgwMjM0MTI2MDE@._V1_SY1000_CR0,0,1498,1000_AL_.jpg",
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2NDkwNDk5NV5BMl5BanBnXkFtZTgwNDM0MTI2MDE@._V1_SY1000_CR0,0,1495,1000_AL_.jpg",
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM4NDcyNDMzMF5BMl5BanBnXkFtZTgwOTI0MTI2MDE@._V1_SY1000_CR0,0,1495,1000_AL_.jpg",
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzMTczMjM3NjFeQTJeQWpwZ15BbWU4MDc1MTI1MzAx._V1_SY1000_CR0,0,1495,1000_AL_.jpg"
      ]
    }
    setValues(_values)
  }
  const handleSubmit = () => {
    console.log(values.genres)
    const movie = {
      id: props.movie.id,
      title: values.title,
      year: values.year,
      rated: values.rated,
      released: values.released,
      runtime: values.runtime,
      genres: toArray(values.genres),
      director: values.director,
      writer: values.writer,
      actors: toArray(values.actors),
      plot: values.plot,
      gif: values.gif,
      poster: values.poster,
      metascore: values.metascore,
      imdbRating: values.imdbrating,
      imdbVotes: values.imdbvotes,
      images: [values.images[0], values.images[1], values.images[2], values.images[3]]
    }
    console.log(movie)
    editMovie(movie)
      .then(res => {
        props.sendUpdatedMovie(res.data);
      });
    setOpen(false);
    emptyValues();
    props.openSnackbar();
  }

  const toArray = string => {
    let stringValue = string + ",";
    let returnArray = [];
    let element = "";
    for (let i = 0; i < stringValue.length; i++) {
      const letter = stringValue[i];
      if(letter !== ",") {
        element += letter;
      } else {
        returnArray.push(element.trim().toLowerCase());
        element = "";
      }
    }
    return returnArray;
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} 
      PaperProps={{
        style: {
            backgroundColor: "#0C0C0E",
            color: "#D9E4E8"
        }
    }}
    fullWidth={true}
    maxWidth="md"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{padding: "16px 16px 0 16px"}}>
          <div style={{fontFamily: "Montserrat", fontSize: "30px", fontWeight: "600"}}>Create movie</div>
      </DialogTitle>
      <DialogContent style={{display: "flex"}}>
        <div className="modal-column" style={{padding: "0 10px 0 5px"}}>

          <Paper style={{backgroundColor: "#1C1C21", padding: "20px", margin: "0 0 20px 0"}}>
            <div className="section-header">General Info</div>
            {generalValues.map((item, i) => {
              return <InputField key={i} name={item} setValues={setPropValue} value={values[item.toLowerCase()]}></InputField>
            })}
          </Paper>

          <Paper style={{backgroundColor: "#1C1C21", padding: "20px", marginTop: "20px"}}>
            <div className="section-header">Images</div>
            {imageValues.map((item, i) => {
              return <InputField key={i} index={i} name={item} setValues={setPropValue} value={values["images"][i]}></InputField>
            })}
            <div className="images-container" style={{marginTop: "20px"}}>
              <div className="modal-column">
                <div className="modal-image-div">
                  <img className="modal-image" alt="" src={values.images[0]}></img>
                </div>
                <div className="modal-image-div">
                  <img className="modal-image" alt="" src={values.images[1]}></img>
                </div>
              </div>
              <div className="modal-column">
                <div className="modal-image-div">
                  <img className="modal-image" alt="" src={values.images[2]}></img>
                </div>
                <div className="modal-image-div">
                  <img className="modal-image" alt="" src={values.images[3]}></img>
                </div>
              </div>
            </div>
          </Paper>
        </div>
        
        <div className="modal-column" style={{padding: "0 5px 0 10px" }}>

          <Paper style={{backgroundColor: "#1C1C21", padding: "20px", marginBottom: "20px"}}>
            <div className="section-header">Rating Info</div>
            {scoreValues.map((item, i) => {
              return <InputField key={i} name={item} setValues={setPropValue} value={values[item.toLowerCase()]}></InputField>
            })}
          </Paper>

          <Paper style={{backgroundColor: "#1C1C21", padding: "20px", marginBottom: "20px"}}>
            <div className="section-header">Cast Info</div>
            {castValues.map((item, i) => {
              return <InputField key={i} name={item} setValues={setPropValue} value={values[item.toLowerCase()]}></InputField>
            })}
          </Paper>

          <Paper style={{backgroundColor: "#1C1C21", padding: "20px"}}>
            <div className="section-header">Poster</div>
            <InputField name="Poster" setValues={setPropValue} value={values["poster"]}></InputField>
            {values.poster.length > 0 ? 
            <div className="poster-image-div">
              {/* eslint-disable-next-line */}
              <img className="poster-image" key={values.poster} src={values.poster}></img>
            </div> 
            :
            <div className="poster-no-image-div">
              <div className="no-image">No image</div>
            </div>
            }
          </Paper>

        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={autofill} style={{color: "#D9E4E8", fontFamily: "Montserrat", fontWeight: "600"}}>
          Autofill
        </Button>
        <Button onClick={handleClose} style={{color: "#C80425", fontFamily: "Montserrat", fontWeight: "600"}}>
          Close
        </Button>
        <Button onClick={handleSubmit} style={{color: "#D9E4E8", fontFamily: "Montserrat", fontWeight: "600"}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
