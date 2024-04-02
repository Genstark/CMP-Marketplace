import React, {useState} from "react";
import '../styling/Signup.css'
import { useNavigate } from "react-router-dom";

function Signup(){

    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupButton, setsignupButton] = useState('Signup');
    const navigate = useNavigate();


    function getUserName(event){
        setUserName(event.target.value);
        console.log(event.target.value);
    }

    function getUserNumber(event){
        setUserNumber(event.target.value);
        console.log(event.target.value);
    }

    function getUserEmail(event){
        setUserEmail(event.target.value);
        console.log(event.target.value);
    }

    function getUserPassword(event){
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    function checkingData(){
        if(userName.trim() === ''){
            alert('name is empty');
            return;
        }
        else if(validPhoneNumber(userNumber) === false){
            alert("phone number must be 10 digits");
            return;
        }
        else if(userEmail.trim() === ''){
            alert('email is empty');
            return;
        }
        else if(password.length < 8){
            alert("password should be greater than or equal to 8 characters");
            return;
        }
        else{            
            
            const userData = {
                'UserName': userName,
                'PhoneNumber': userNumber,
                'UserEmail': userEmail,
                'Password': password,
            }
            return userData;
        }
    }

    function validPhoneNumber(number){
        const numberChecking = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return numberChecking.test(number);
    }

    function signup(){

        const Data = checkingData();
        
        const apiUrl = 'http://localhost:2000/signIn';
        const options = {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(Data)
        }

        setsignupButton('Wait...')
        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setsignupButton('Signup');
            if(data.status === 'ok'){
                window.location.href = '/login';
                setUserName('');
                setUserNumber('');
                setUserEmail('');
                setPassword('');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    function Homepage(){
        // window.location.href = "/";
        navigate('/');
    }

    function loginPage(){
        // window.location.href = '/login';
        navigate('/login');
    }

    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => navigate('/')}>Compro Marketplace</h3>
            </div>

            <div className="signupPage">
                <label htmlFor="userName" className="nameLabel">User Name:</label><br />
                <input type="input" placeholder="user name" value={userName} id="userName" className="inputName" onChange={getUserName} /><br />

                <label htmlFor="userNumber" className="numberLabel">Phone Number:</label><br />
                <input type="input" placeholder="Phone number" value={userNumber} id="userNumber" className="inputNumber" onChange={getUserNumber} /><br />

                <label htmlFor="userEmail" className="emailLabel">Email:</label><br />
                <input type="input" placeholder="user email" id="userEmail" value={userEmail} className="inputEmail" onChange={getUserEmail} /><br />

                <label htmlFor="userPassword" className="passwordLabel">Password:</label><br />
                <input type="password" placeholder="Password" id="userPassword" value={password} className="inputPassword" onChange={getUserPassword} /><br />

                <button className="loginButton" onClick={signup} >{signupButton}</button>
                <p style={{fontWeight: 'bolder', textAlign: 'center'}}>Don't have an account? <span className="mousepointer" onClick={() => navigate('/login')}>Login</span></p>
            </div>
        </>
    );
}

export default Signup;