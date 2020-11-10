import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./navbar"
import MainRouter from "./mainRouter"

export default function App() {
    return ( 
        <BrowserRouter>
            <Navbar></Navbar>
            <MainRouter></MainRouter>
        </BrowserRouter>
     );
}