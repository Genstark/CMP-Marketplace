import React, { useState, useEffect } from "react";
import '../styling/Header.css';
import userImge from '../image/user.png';
import { Link, useNavigate } from "react-router-dom";
import { Decrypt } from "../functions/Encryption.js";


function Logindropdown({logoutFunction, username}){

    const menuDesign = {
        backgroundColor: 'cadetblue',
        borderRadius: 8,
        borderWidth: 0,
        marginLeft: 10,
        fontSize: 18
    }

    return(
        <div className="loginClass">
            <img src={userImge} className="userImage" alt='user "profile" image' />
            {/* <select style={menuDesign}>
                <option value={username}>{username}</option>
                <option value="profile">Profile</option>
                <option value="Add Items">Add Items</option>
                <option value="logout" onClick={logoutFunction}>Logout</option>
            </select> */}

            <CustomDropdown name={username}/>
        </div>
    );
}


function WithoutLogin({toLoginPage}){
    return(
        <div className="loginClass" onClick={() => toLoginPage()}>
            <img src={userImge} className="userImage" alt='user profile image' />
            <span className="loginRegister">Login/Register</span>
        </div>
    );
}


function CustomDropdown({name}){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(name);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    function profilePage(){
        const data = sessionStorage.getItem('data');
        const token = sessionStorage.getItem('token');
        // window.location.href = `/profile/${Decrypt(data)}/${Decrypt(token)}`;
        navigate(`/profile/${Decrypt(data)}/${Decrypt(token)}`);
    }

    function logoutFunction(){
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div className="custom-dropdown">
            <div className="loginRegister" onClick={toggleDropdown} style={{marginTop: 8}}>
                {selectedOption || 'username'}
            </div>
            {isOpen && (
                <ul className="dropdown-options">
                    <li onClick={profilePage}>Profile</li>
                    <li onClick={() => navigate('/addItem')}>Add Item</li>
                    <li onClick={() => navigate('/testingComponent')}>Testing Component</li>
                    <li onClick={logoutFunction}>Logout</li>
                </ul>
            )}
        </div>
    );
};


function Header({search, clickSearch, toLoginPage, logout, pressEnter}){

    const [loginOrNot, setLoginOrNot] = useState('Login/Register');
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        function userLogin(){
            const data = sessionStorage.getItem('data');
            if(data !== null){
                setLoginOrNot(Decrypt(data));
                setLoginStatus(true);
            }
            else{
                setLoginOrNot('Login/Register');
                setLoginStatus(false);
            }
        }
        userLogin();
    }, []);

    return(
        <div className="home-page">
            <h3 className="heading" onClick={() => window.location.href = '/'}>Compro Marketplace</h3>
            <input type="input" className="userinput" placeholder="search item" onChange={(e) => search(e.target.value)} onKeyDown={pressEnter}/>

            <select name="types" id="productType" className="productTypeClass" alt="choose product type" title="choose product type">
                <option value="none" alt="nothing">Choose Type</option>
                <option value="Electronics" alt="Electronics">Electronics</option>
                <option value="Bike" alt="Bike">Bike</option>
            </select>

            <button className="searchButton" onClick={() => clickSearch()}>Search</button>

            {/* <div className="loginClass" onClick={() => toLoginPage()}>
                <img src={userImge} className="userImage" alt='user profile image' />
                <span className="loginRegister">{loginOrNot}</span>
            </div> */}

            {loginStatus ? <Logindropdown logoutFunction={logout} username={loginOrNot} /> : <WithoutLogin toLoginPage={toLoginPage} />}

            {/* <CustomDropdown /> */}
        </div>
    );
}


export default Header;