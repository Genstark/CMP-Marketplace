import React, { useState, useEffect, useRef } from "react";
import '../styling/Home.css';
import userImge from '../image/user.png';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header.jsx';
import LoadingBar from "../components/Loading.jsx";


function FindProduct(){

    const [apiData, setApiData] = useState([]);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlFilter = currentUrl.split('/').pop();
        const apiUrl = `http://localhost:2000/item/search/${urlFilter.toLowerCase()}`;
        const options = {
            method: 'GET'
        }

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setApiData(data['data']);
            setStatus(true);
        }).catch(error => {
            console.log('Error');
        });


    }, []);

    console.log(apiData);

    const [search, setSearch] = useState('');
    function userSearch(value){
        setSearch(value);
        console.log(value)
    }

    function finding(){
        window.location.href = `/items/search/${search}`;
        
        const currentUrl = window.location.href;
        const urlFilter = currentUrl.split('/').pop();
        const apiUrl = `http://localhost:2000/item/search/${urlFilter.toLowerCase()}`;
        const options = {
            method: 'GET'
        }

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setApiData(data['data']);
        }).catch(error => {
            console.log('Error');
        });
    }

    function changeLocation(id){
        // window.location.href = `/item/${id}`;
        navigate(`/item/${id}`);
    }

    function loginPage(){
        // window.location.href = `/login`;
        navigate(`/login`);
    }

    function clickEnter(event){
        if(event.key === "Enter"){
            finding();
        }
    }

    // const validImageTypes = ['png', 'jpeg', 'jpg'];
    // const isValidImageType = validImageTypes.includes(validImageTypes);

    return(
        <>
            <Header search={userSearch} clickSearch={finding} toLoginPage={loginPage} pressEnter={clickEnter} />

            {status ? <div className="itemCard">
                {apiData.map((object) => <div className="item" key={object._id} onClick={() => changeLocation(object._id)}>
                            <img src={object['image-1']} alt="image testing" className="itemImage" />
                            <h1 className="itemName">{object.title}</h1>
                            <p className="itemOverView">{object.overview}</p>
                            <p className="itemLocation">{object.state}</p>
                </div>)}
            </div> : <LoadingBar />}
        </>
    );
}


export default FindProduct;