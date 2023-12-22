import React, { useState, useEffect } from "react";
import '../styling/Home.css';
import userImge from '../image/user.png';
import { Link } from "react-router-dom";


function HomePage(){

    const [apiData, setApiData] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }
        
        const url = 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=Seattle';
        const options = {
        	method: 'GET',
        	headers: {
        		'X-RapidAPI-Key': '55cfd3b5e1msh42db4a25dc6d649p1e5846jsnd7f392ecde15',
        		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
        	}
        };

        // fetch(url, options).then(res => {
        //     return res.json();
        // }).then(data => {
        //     setApiData([...apiData, data]);
        //     console.log(apiData);
        // }).catch(error => {
        //     console.log("Error in Fetching Data");
        // });

    }, [isInitialRender]);

    // console.log(apiData);
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
                    {apiData.map((items, index) => {
                        return(
                            <li key={index}>{items.overall_aqi} {items.CO.aqi}</li>
                        )
                    })}
                </ul>
            </div>
            
        </>
    );
}

export default HomePage;