import React, {useEffect, useState} from "react";
import '../styling/SingleProduct.css';
import userImge from '../image/user.png';
import { Link } from 'react-router-dom';


function SingleProduct(){

    const [textareaValue, setTextareaValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');

    useEffect(() => {
        const element = document.getElementById('itemDetail'); // Replace with your textarea ID
    
        if (element) {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
            setTextareaHeight(element.style.height);
        }

    }, [textareaValue]);
    
    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const imagePosition = {
        marginLeft: 4, 
        marginTop: 3, 
        marginBottom: 3
    }

    return(
        <>
            <div className="home-page">
                <h3 className="heading">Compro Marketplace</h3>
                <input type="input" className="userinput" placeholder="search item" />

                <select name="types" id="productType" className="productTypeClass" alt="choose product type" title="choose product type">
                    <option value="none" alt="nothing">Choose Type</option>
                    <option value="Electronics" alt="Electronics">Electronics</option>
                    <option value="Bike" alt="Bike">Bike</option>
                </select>

                <button className="searchButton">Search</button>

                <div className="loginClass">
                    <img src={userImge} className="userImage" alt='user "profile" image' />
                    <span className="loginRegister">Login/Register</span>
                </div>
            </div>

            <div className="mainContainer">
                <div className="mainItemImage">
                    <button className="backButton">😂</button>
                    <img src={userImge} alt="main item display" className="image" />
                    <button className="forwardButton">🤣</button>
                </div>

                <div className="imageCollection">
                    <img src={userImge} style={imagePosition} alt="image 1" />
                    <img src={userImge} style={imagePosition} alt="image 2" />
                    <img src={userImge} style={imagePosition} alt="image 3" />
                </div>

                <div className="sellerCard">
                    <div style={{width: 'max-content'}}>
                        <img src={userImge} alt="user image" className="sellerImage" style={{marginLeft: 2, marginTop: 2, marginBottom: 2}} />
                    </div>
                    <div style={{width: 'max-content', marginLeft: 18}}>
                        <h3 style={{marginTop: 18}}>Name: Gautam</h3>
                        <h3 style={{marginTop: 30}}>Contact: 7065394965</h3>
                    </div>
                </div>

                <div className="priceAndOverview">
                    <div className="priceAndAddress">
                        <h2 style={{marginLeft: 4}}>Overview</h2>
                        <textarea name="product overview" id="overview" rows="8" className="overviewTextArea"></textarea>
                    </div>
                    <div className="overView">
                        <h2 style={{
                            marginLeft: 8
                        }}>price</h2>

                        <h3 style={{
                            marginLeft: 8,
                            fontWeight: 'bolder'
                        }}>address</h3>

                        <p style={{
                            marginLeft: 8,
                            fontWeight: 'bolder'
                        }}>state/city</p>
                    </div>
                </div>

                <div className="productDetial">
                    <h2>Details</h2>
                    <textarea id="myTextarea" value={textareaValue} onChange={handleChange} style={{ height: textareaHeight }}/>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;