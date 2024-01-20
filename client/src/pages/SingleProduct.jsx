import React, {useEffect, useState, useRef} from "react";
import '../styling/SingleProduct.css';
import userImge from '../image/user.png';
import { Link } from 'react-router-dom';
import Header from '../component/Header.jsx';
import LoadingBar from "../component/Loading.jsx";


function SingleProduct(){

    const [textareaValue, setTextareaValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [apiData, setApiData] = useState([]);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {

        const element = document.getElementById('itemDetail');

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
                setTextareaValue(data['data'].details);
                console.log(data);

                setImage1(data['data']['image-1'].data);
                setImage2(data['data']['image-2'].data);
                setImage3(data['data']['image-3'].data);
                setStatus(true);
            } 
            catch(error){
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
        console.log(value);
    }

    function finding(){
        window.location.href = `/items/search/${search}`;
    }


    const showDataOrNot = sessionStorage.getItem('data');
    function renderMainData(){
        if(showDataOrNot === null){
            return false;
        }
        else{
            return true;
        }
    }

    const imageRef = useRef(null);

    const validImageTypes = ['png', 'jpeg', 'jpg'];
    const isValidImageType = validImageTypes.includes(validImageTypes);

    return(
        <>
            <Header search={userSearch} clickSearch={finding} toLoginPage={() => window.location.href = `/login`} />

            {status ? apiData.map(object => <div className="mainContainer" key={object._id}>
                <div className="mainItemImage">
                    <button className="backButton">😂</button>
                    <img src={object['image-1'].data || `data:image/${isValidImageType};base64,${object['image-1'].data}`} alt="main item display" className="image" ref={imageRef}/>
                    <button className="forwardButton">🤣</button>
                </div>

                <div className="imageCollection">
                    <img src={object['image-1'].data || `data:image/${isValidImageType};base64,${object['image-1'].data}`} style={imagePosition} alt="image 1" onClick={() => imageRef.current.src = image1} />
                    <img src={object['image-2'].data || `data:image/${isValidImageType};base64,${object['image-2'].data}`} style={imagePosition} alt="image 2" onClick={() => imageRef.current.src = image2} />
                    <img src={object['image-3'].data || `data:image/${isValidImageType};base64,${object['image-3'].data}`} style={imagePosition} alt="image 3" onClick={() => imageRef.current.src = image3} />
                </div>

                <div className="sellerCard">
                    <div style={{width: 'max-content'}}>
                        <img src={userImge} alt="user image" className="sellerImage" style={{marginLeft: 4, marginTop: 2, marginBottom: 2}} />
                    </div>
                    <div style={{width: 'max-content', marginLeft: 18}}>
                        <h3 style={{marginTop: 18, cursor: 'pointer'}} onClick={() => ToProfilePage(object.user_id, object.userName)}>Name: {object.userName}</h3>
                        <h3 style={{marginTop: 30}}>Contact: {renderMainData() ? object.phoneNumber : '**********'}</h3>
                    </div>
                </div>

                <div className="priceAndOverview">
                    <div className="priceAndAddress">
                        <h2 style={{marginLeft: 4}}>Overview</h2>
                        {/* <textarea name="product overview" id="overview" rows="8" value={object.overview} className="overviewTextArea" disabled></textarea> */}
                        <p style={{marginLeft: 4}}>{object.overview}</p>
                    </div>
                    <div className="overView">
                        <h2 style={{
                            marginLeft: 8
                        }}>Rs: {object.price}</h2>

                        <h3 style={{
                            marginLeft: 8,
                            fontWeight: 'bolder'
                        }}>Address: {renderMainData() ? object.Address : '**********'}</h3>

                        <p style={{
                            marginLeft: 8,
                            fontWeight: 'bolder'
                        }}>{renderMainData() ? object.state : '**********'}</p>
                    </div>
                </div>

                <div className="productDetial">
                    <h2 style={{marginLeft: 4}}>Details</h2>
                    {/* <textarea id="itemDetail" className="textDetails" value={textareaValue} onChange={handleChange} style={{ height: textareaHeight }} disabled /> */}
                    <p style={{marginLeft: 4}}>{object.details}</p>
                </div>
            </div>) : <LoadingBar />}
        </>
    );
}

export default SingleProduct;