import React, { useState, useEffect, useRef } from "react";
import '../styling/Home.css';
import userImge from '../image/user.png';
import { Link } from "react-router-dom";


function HomePage(){

    const [apiData, setApiData] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        // if (isInitialRender) {
        //     setIsInitialRender(false);
        //     return;
        // }

        const apiUrl = 'http://localhost:2000/items';
        const options = {
            method: 'GET'
        }

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            setApiData(data['data']);

        }).catch(error => {
            console.log("Error in Fetching Data");
        });

    }, []);

    console.log(apiData);

    function getRandomNumber(min, max) {
        const randomNumber = Math.random();
        const scaledNumber = min + Math.floor(randomNumber * (max - min + 1));
        return scaledNumber;
    }

    return(
        <>
            <div className="home-page">
                <h3 className="heading">Compro Marketplace</h3>
                <input type="input" className="userinput" />

                <select name="types" id="productType" className="productTypeClass">
                    <option value="none">Choose Type</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Bike">Bike</option>
                </select>

                <button className="searchButton">Search</button>

                <div className="loginClass">
                    <img src={userImge} className="userImage" alt='user "profile" image' />
                    <span className="loginRegister">Login/Register</span>
                </div>
            </div>

            <div className="itemCard">
                <ul>
                    {apiData.map((object, index) => <li key={object._id}>{object.userName} {object.phoneNumber} {index} {object.title}
                                                <img src={object['image-1'].data} style={{width: 100, height: 100}} />
                                            </li>)}
                </ul>
            </div>
            
        </>
    );
}

export default HomePage;