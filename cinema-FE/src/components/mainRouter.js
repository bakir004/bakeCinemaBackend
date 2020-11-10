import React from 'react';
import { Route } from "react-router-dom"
import Home from "./home"
import MovieView from "./movieView"

export default function MainRouter() {
    return (
        <div>
            <Route path="/movie/:id" component={MovieView}></Route>
            <Route exact path="/" component={Home}></Route>
        </div>
    )
}