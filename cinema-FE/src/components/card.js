import React from 'react';
import "../styles/card.scss"
import { Link } from "react-router-dom"

export default function Card(props) {
    return (
        <div className="card">
            <Link className="card-image-div" to={props.to}>
                <img className="card-image" src={props.image} alt="Poster"></img>
            </Link>
            {/* <div className="card-title">
                {props.title}
            </div> */}
        </div>
    )
}