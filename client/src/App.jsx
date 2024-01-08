import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/Home.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Profile from "./pages/Profile.jsx";
import Task from "./pages/ToDoList.jsx";
import FindProduct from "./pages/FindProduct.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import AddItem from "./pages/AddItem.jsx";
import ImageClassification from "./pages/ImageClassification.jsx";


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
    				<Route exact path='/item/:id' element={< SingleProduct />}></Route>
                    <Route exact path='/profile/:username/:userid' element={< Profile />}></Route>
                    <Route exact path='/to-do-list' element={< Task />}></Route>
                    <Route exact path='/items/search/:query' element={< FindProduct />}></Route>
                    <Route exact path='/login' element={< Login />}></Route>
                    <Route exact path="/signup" element={< Signup />}></Route>
                    <Route exact path="/addItem" element={< AddItem />}></Route>
                    <Route exact path="/imageClassification" element={< ImageClassification />}></Route>
			    </Routes>

            </Router>

        </>
    );
}

export default App;