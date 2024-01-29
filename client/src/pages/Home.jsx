import React, { useState, useEffect, useRef } from "react";
import '../styling/Home.css';
import Header from '../component/Header.jsx';
import LoadingBar from "../component/Loading.jsx";

function HomePage(){

    const [apiData, setApiData] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {

        const apiUrl = 'https://cmpmarketplacebackend.onrender.com/items';
        const options = {
            method: 'GET'
        }

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            setApiData(data['data']);
            setStatus(true);
        }).catch(error => {
            console.log("Error in Fetching Data");
        });

    }, []);

    console.log(apiData);

    function changeLocation(id){
        window.location.href = `/item/${id}`;
    }

    const [search, setSearch] = useState('');
    function userSearch(value){
        setSearch(value);
        console.log(value)
    }

    function finding(){
        window.location.href = `/items/search/${search}`;
    }

    function loginPage(){
        window.location.href = `/login`;
    }

    function logout(){
        console.log('working');
    }
    

    const validImageTypes = ['png', 'jpeg', 'jpg'];
    const isValidImageType = validImageTypes.includes(validImageTypes);

    return(
        <>
            <Header search={userSearch} clickSearch={finding} toLoginPage={loginPage} logout={logout} />
            
            {status ? <div className="itemCard">
                {/* <ul>
                    {apiData.map((object, index) => <li key={object._id}>{object.userName} {object.phoneNumber} {object.title} {object.Address}<br />
                                                <img src={object['image-1'].data} style={{width: 100, height: 100}} />
                                                <img src={object['image-2'].data} style={{width: 100, height: 100}} />
                                                <img src={object['image-3'].data} style={{width: 100, height: 100}} />
                                            </li>)}
                </ul> */}

                {apiData.map((object) => <div className="item" key={object._id} onClick={() => changeLocation(object._id)}>
                    {/* <img src={object['image-1'].data || `data:image/${isValidImageType};base64,${object['image-1'].data}`} alt="image testing" className="itemImage" /> */}
                    {<img src={object['image-1']} alt="image testing" className="itemImage" />}
                    <h1 className="itemName">{object.title}</h1>
                    <p className="itemOverView">{object.overview}</p>
                    <p className="itemLocation">{object.state}</p>
                </div>)}


                {/* 2nd option*/}


                {/* {apiData.map((object) => <div className="cardproduct" key={object._id} onClick={() => changeLocation(object._id)}>
                
                    <img src={object['image-1'].data || `data:image/${isValidImageType};base64,${object['image-1'].data}`} alt="Avatar"/>
                    <div class="container">
                        <h1 className="">{object.title}</h1>
                        <p className="">{object.overview}</p>
                        <p className="">{object.state}</p>
                    </div>
                </div>)} */}



            </div> : <LoadingBar />}
        </>
    );
}

export default HomePage;