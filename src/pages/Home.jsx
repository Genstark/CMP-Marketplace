import React from "react";
import '../styling/Home.css';
import userImge from '../image/user.png';

function HomePage(){

    return(
        <>
            <div className="home-page">
                <h3 className="heading">Compro Marketplace</h3>
                <input type="input" className="userinput" />

                <select name="types" id="productType" className="productTypeClass">
                    <option value="" selected>Choose Type</option>
                    <option value="Electronics" style={{fontSize: 30}}>Electronics</option>
                    <option value="Bike">Bike</option>
                </select>

                <button className="searchButton">Search</button>

                <div className="loginClass">
                    <img src={userImge} className="userImage" alt='user "profile" image' />
                    <span className="loginRegister">Login / Register</span>
                </div>
            </div>

            {/* <div className="itemCard">
                <div className="card">
                    
                </div>
            </div> */}
            
        </>
    );
}

export default HomePage;