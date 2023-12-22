import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/about.jsx";
import MenuPage from "./pages/menu.jsx";
import Task from "./pages/ToDoList.jsx";


function App(){

    return(
        <>
            <Router>
                {/* <ul>
        			<li>
        				<Link to="/">Home</Link>
        			</li>
        			<li>
        				<Link to="/about">About Us</Link>
        			</li>
                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/to-do-list">To-Do-List</Link>
                    </li>
    			</ul> */}

                <Routes>
    				<Route exact path='/' element={< HomePage />}></Route>
    				<Route exact path='/about' element={< AboutPage />}></Route>
                    <Route exact path='/menu' element={< MenuPage />}></Route>
                    <Route exact path='/to-do-list' element={< Task />}></Route>
			    </Routes>

            </Router>

        </>
    );
}

export default App;