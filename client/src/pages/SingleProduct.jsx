import React, {useEffect, useState} from "react";
import '../styling/SingleProduct.css';
import userImge from '../image/user.png';
import { Link } from 'react-router-dom';
import Header from '../component/Header.jsx';


function SingleProduct(){

    const [textareaValue, setTextareaValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [apiData, setApiData] = useState([]);

    useEffect(() => {

        const element = document.getElementById('itemDetail'); // Replace with your textarea ID
        
        if (element) {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
            setTextareaHeight(element.style.height);
        }

        const fetchData = async () => {
            try {
                const currentUrl = window.location.href;
                const urlFilter = currentUrl.split('/').pop();
                const apiUrl = `http://localhost:2000/items/${urlFilter}`;
                const options = {
                    method: 'GET',
                };

                const response = await fetch(apiUrl, options);
                const data = await response.json();

                // Update state after data is fetched
                setApiData([data['data']]);
                setTextareaValue(data['data'].details)
                console.log(data);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [textareaValue]);
    
    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const imagePosition = {
        marginLeft: 4, 
        marginTop: 3, 
        marginBottom: 3,
        width: 110
    }

    console.log(apiData);

    function ToProfilePage(id, username){
        window.location.href = `/profile/${username}/${id}`;
    }

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

            {apiData.map(object => <div className="mainContainer" key={object._id}>
                <div className="mainItemImage">
                    <button className="backButton">😂</button>
                    <img src={object['image-1'].data} alt="main item display" className="image" />
                    <button className="forwardButton">🤣</button>
                </div>

                <div className="imageCollection">
                    <img src={object['image-1'].data} style={imagePosition} alt="image 1" />
                    <img src={object['image-2'].data} style={imagePosition} alt="image 2" />
                    <img src={object['image-3'].data} style={imagePosition} alt="image 3" />
                </div>

                <div className="sellerCard">
                    <div style={{width: 'max-content'}}>
                        <img src={userImge} alt="user image" className="sellerImage" style={{marginLeft: 4, marginTop: 2, marginBottom: 2}} />
                    </div>
                    <div style={{width: 'max-content', marginLeft: 18}}>
                        <h3 style={{marginTop: 18, cursor: 'pointer'}} onClick={() => ToProfilePage(object.user_id, object.userName)}>Name: {object.userName}</h3>
                        <h3 style={{marginTop: 30}}>Contact: {object.phoneNumber}</h3>
                    </div>
                </div>

                <div className="priceAndOverview">
                    <div className="priceAndAddress">
                        <h2 style={{marginLeft: 4}}>Overview</h2>
                        <textarea name="product overview" id="overview" rows="8" value={object.overview} className="overviewTextArea" disabled></textarea>
                    </div>
                    <div className="overView">
                        <h2 style={{
                            marginLeft: 8
                        }}>Rs: {object.price}</h2>

                        <h3 style={{
                            marginLeft: 8,
                            fontWeight: 'bolder'
                        }}>Address: {object.Address}</h3>

                        <p style={{
                            marginLeft: 8,
                            fontWeight: 'bolder'
                        }}>{object.state}</p>
                    </div>
                </div>

                <div className="productDetial">
                    <h2 style={{marginLeft: 4}}>Details</h2>
                    <textarea id="itemDetail" className="textDetails" value={textareaValue} onChange={handleChange} style={{ height: textareaHeight }} disabled />
                </div>
            </div>)}
        </>
    );
}

export default SingleProduct;