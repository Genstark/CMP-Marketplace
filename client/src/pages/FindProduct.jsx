import React, { useState, useEffect, useRef } from "react";
import '../styling/Home.css';
import userImge from '../image/user.png';
import { Link } from "react-router-dom";
import Header from '../component/Header.jsx';
import LoadingBar from "../component/Loading.jsx";


function FindProduct(){

    const [apiData, setApiData] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlFilter = currentUrl.split('/').pop();
        const apiUrl = `http://localhost:2000/item/search/${urlFilter}`;
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
        const apiUrl = `http://localhost:2000/item/search/${urlFilter}`;
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
        window.location.href = `/item/${id}`;
    }

    function loginPage(){
        window.location.href = `/login`;
    }

    const validImageTypes = ['png', 'jpeg', 'jpg'];
    const isValidImageType = validImageTypes.includes(validImageTypes);

    return(
        <>
            <Header search={userSearch} clickSearch={finding} toLoginPage={loginPage} />

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