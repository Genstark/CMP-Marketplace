import React, {useState} from "react";
import '../styling/Login.css';
import { Encryption } from "../functions/Encryption.js";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userlogin, setUserlogin] = useState('Login');
    const  navigate = useNavigate();

    function getUserEmail(event){
        event.preventDefault();
        setUsername(event.target.value);
        console.log(username);
    }

    function getUserPassword(event){
        event.preventDefault();
        setPassword(event.target.value);
        console.log(password);
    }


    function checkData(){
        if(validateEmail(username) === false){
            alert('Please enter a valid email address');
            return;
        }
        else if(password.trim() === ''){
            alert('Please enter your password');
            return;
        }
        else{
            const loginData = {
                'email': username,
                'password': password
            }
            return loginData;
        }
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }


    function login(){
        const Data = checkData();
        
        const apiUrl = 'https://cmpmarketplacebackend.onrender.com/login';
        const options = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(Data),
        }

        setUserlogin('Wait...');
        
        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);

            if(data.done){
                sessionStorage.setItem("data", Encryption(data.data));
                sessionStorage.setItem('token', Encryption(data.token));
                window.location.href = '/';
                // window.history.back();
                // window.location.reload();
            }
            else{
                setUserlogin('Login');
                alert('Wrong Email or Password! Try again!');
            }

            setUserlogin('Login');
        }).catch(error => {
            console.log("Error in Fetching data from server");
        });
    }


    function Homepage(){
        // window.location.href = "/";
        navigate('/');
    }

    function registration(){
        // window.location.href = "/signup";
        navigate('/signup');
    }

    return(
        <>
            <div className="home-page">
                {/* <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={Homepage}>Compro Marketplace</h3>*/}
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => navigate('/')}>Compro Marketplace</h3> 
            </div>

            <div className="loginPage">
                <label htmlFor="userEmail" className="emailLabel">Email:</label><br />
                <input type="input" placeholder="Example@gmail.com" id="userEmail" className="inputEmail" onChange={getUserEmail} /><br />

                <label htmlFor="userPassword" className="passwordLabel">Password:</label><br />
                <input type="password" placeholder="Password" id="userPassword" className="inputEmail" onChange={getUserPassword} /><br />

                <button className="loginButton" onClick={login}>{userlogin}</button>
                {/* <p style={{fontWeight: 'bolder', textAlign: 'center'}}>Don't have an account? <span className="mousepointer" onClick={registration}>Register</span></p> */}
                <p style={{fontWeight: 'bolder', textAlign: 'center'}}>Don't have an account? <span className="mousepointer" onClick={() => navigate('/signup')}>Register</span></p>
            </div>
        </>
    );
}

export default Login;