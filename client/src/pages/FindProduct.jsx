import React, { useState, useEffect, useRef } from "react";
import '../styling/Home.css';
import userImge from '../image/user.png';
import { Link } from "react-router-dom";
import Header from '../component/Header.jsx';


function FindProduct(){

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlFilter = currentUrl.split('/').pop();
        const apiUrl = `http://localhost:2000/item/search/${urlFilter}`;
        const options = {
            method: 'GET'
        }

        fetch(apiUrl, options).then(res => {
            return res.json()  // 返回的是一个promise对象，所以我们可以在后面 then
        }).then(data => {
            console.log(data);
            setApiData([data['data']]);
        }).catch(error => {
            console.log('Error');
        });


    });

    const [search, setSearch] = useState('');
    function userSearch(value){
        setSearch(value);
        console.log(value)
    }

    function finding(){
        window.location.href = `/items/search/${search}`;
    }

    return(
        <>
            <Header search={userSearch} clickSearch={finding} />

            {apiData.map((object) => <div className="item" key={object._id} onClick={() => changeLocation(object._id)}>
                        <img src={object['image-1'].data} alt="image testing" className="itemImage" />
                        <h1 className="itemName">{object.title}</h1>
                        <p className="itemOverView">{object.overview}</p>
                        <p className="itemLocation">{object.state}</p>
            </div>)}
        </>
    );
}


export default FindProduct;