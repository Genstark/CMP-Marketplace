import React, { useState, useEffect } from "react";
import '../styling/Header.css';
import userImge from '../image/user.png';

function Header({search, clickSearch, toLoginPage}){

    const [loginOrNot, setLoginOrNot] = useState('Login/Register');

    useEffect(() => {
        function userLogin(){
            const data = sessionStorage.getItem('data');
            if(data !== null){
                setLoginOrNot(data);
            }
            else{
                setLoginOrNot('Login/Register');
            }
        }
        userLogin();
    }, []);

    function Homepage(){
        window.location.href = "/";
    }

    return(
        <div className="home-page">
            <h3 className="heading" onClick={Homepage}>Compro Marketplace</h3>
            <input type="input" className="userinput" placeholder="search item" onChange={(e) => search(e.target.value)} />

            <select name="types" id="productType" className="productTypeClass" alt="choose product type" title="choose product type">
                <option value="none" alt="nothing">Choose Type</option>
                <option value="Electronics" alt="Electronics">Electronics</option>
                <option value="Bike" alt="Bike">Bike</option>
            </select>

            <button className="searchButton" onClick={() => clickSearch()}>Search</button>

            <div className="loginClass" onClick={() => toLoginPage()}>
                <img src={userImge} className="userImage" alt='user "profile" image' />
                <span className="loginRegister">{loginOrNot}</span>
            </div>
        </div>
    );
}


export default Header;