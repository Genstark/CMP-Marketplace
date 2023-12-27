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

    function changeLocation(){
        window.location.href = '/item';
    }

    return(
        <>
            <div className="home-page">
                <h3 className="heading">Compro Marketplace</h3>
                <input type="input" className="userinput" placeholder="search item" />

                <select name="types" id="productType" className="productTypeClass" alt="choose product type" title="choose product type">
                    <option value="none" alt="nothing">Choose Type</option>
                    <option value="Electronics" alt="Electronics">Electronics</option>
                    <option value="Bike" alt="Bike">Bike</option>
                </select>

                <button className="searchButton">Search</button>

                <div className="loginClass">
                    <img src={userImge} className="userImage" alt='user "profile" image' />
                    <span className="loginRegister">Login/Register</span>
                </div>
            </div>

            <div className="itemCard">
                {/* <ul>
                    {apiData.map((object, index) => <li key={object._id}>{object.userName} {object.phoneNumber} {object.title} {object.Address}<br />
                                                <img src={object['image-1'].data} style={{width: 100, height: 100}} />
                                                <img src={object['image-2'].data} style={{width: 100, height: 100}} />
                                                <img src={object['image-3'].data} style={{width: 100, height: 100}} />
                                            </li>)}
                </ul> */}

                {apiData.map((object) => <div className="item" key={object._id} onClick={changeLocation}>
                    <img src={object['image-1'].data} alt="image testing" className="itemImage" />
                    <h1 className="itemName">{object.title}</h1>
                    <p className="itemOverView">{object.overview}</p>
                    <p className="itemLocation">{object.state}</p>
                </div>)}
            </div>
            
        </>
    );
}

export default HomePage;