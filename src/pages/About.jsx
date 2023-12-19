import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

function AboutPage(){

    return(
        <div className="about-page">
            <h1>About Page</h1>

            <Link to='/'>go back home</Link>
        </div>
    );
}

export default AboutPage;