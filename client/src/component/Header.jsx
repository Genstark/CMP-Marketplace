import React, { useState, useEffect } from "react";
import '../styling/Header.css';
import userImge from '../image/user.png';


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
    const [selectedOption, setSelectedOption] = useState(null);
  
    const options = ['Option 1', 'Option 2', 'Option 3'];
  
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
  
    return (
        <div className="custom-dropdown">
            <div className="loginRegister" onClick={toggleDropdown} style={{marginTop: 8}}>
                {selectedOption || 'username'}
            </div>
            {isOpen && (
                <ul className="dropdown-options">
                    {/* {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>{option}</li>
                    ))} */}
                    <li onClick={() => console.log('Profile')}>Profile</li>
                    <li onClick={() => console.log('Add Item')}>Add Item</li>
                    <li onClick={() => console.log('Logout')}>Logout</li>
                </ul>
            )}
        </div>
    );
};


function Header({search, clickSearch, toLoginPage, logout}){

    const [loginOrNot, setLoginOrNot] = useState('Login/Register');
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        function userLogin(){
            const data = sessionStorage.getItem('data');
            if(data !== null){
                setLoginOrNot(data);
                setLoginStatus(true);
            }
            else{
                setLoginOrNot('Login/Register');
                setLoginStatus(false);
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
                <option value="Bike" alt="Bike" onClick={() => console.log('bike')}>Bike</option>
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