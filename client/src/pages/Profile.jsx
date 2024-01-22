import React, {useState, useEffect} from "react";
import userImge from '../image/user.png';
import '../styling/Profile.css';
import Header from '../component/Header.jsx';
import LoadingBar from "../component/Loading.jsx";


function Profile(){

    const [apiData, setApiData] = useState([]);
    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUrl = window.location.href;
                const urlFilter = currentUrl.split('/').pop();
                console.log(urlFilter);
                const apiUrl = `https://cmpmarketplacebackend.onrender.com/item/profile/${urlFilter}`;
                const options = {
                    method: 'GET',
                };

                const response = await fetch(apiUrl, options);
                const data = await response.json();

                // Update state after data is fetched
                setApiData(data['data']);
                setUserName(data['data'][0]['userName']);
                setUserNumber(data['data'][0]['phoneNumber']);
                
                if(setUserAddress(data['data'][0]['userName'])){
                    setUserAddress(data['data'][0]['Address']);
                }

                setStatus(true);
                console.log(data);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

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

    const showDataOrNot = sessionStorage.getItem('data');
    function renderMainData(){
        if(showDataOrNot === null){
            return false;
        }
        else{
            return true
        }
    }

    const itemCard = {
        height: 210,
        margiTop: 0,
        border: '1px solid black',
        marginLeft: 8,
        marginRight: 0,
        width: '100%',
        marginBottom: 3,
        borderRadius: 10,
        cursor: 'pointer',
        overflow: 'hidden'
    };

    return(
        <>
            <Header search={userSearch} clickSearch={finding} toLoginPage={loginPage} />

            {status ? <div className="maincontainer">
                <div className="profileInfo">
                    <img src={userImge} alt="user image" className="userimage" />
                    <hr style={{
                        width: '99%',
                        color: 'black'
                    }} />

                    <h3 style={{
                        marginLeft: 16
                    }}>UserName: {userName}</h3>
                    <hr style={{
                        width: '99%',
                        color: 'black'
                    }} />

                    <h3 style={{
                        marginLeft: 16
                    }}>Contact: {renderMainData() ? userNumber : '**********'}</h3>
                    <hr style={{
                        width: '99%',
                        color: 'black'
                    }} />

                    <h3 style={{
                        marginLeft: 16
                    }}>Address: {renderMainData() ? userAddress : '**********'}</h3>
                </div>

                <div className="productListings">
                    {apiData.map((object) => <div className="item" key={object._id} onClick={() => changeLocation(object._id)}>
                        <img src={object['image-1'].data || `data:image/${isValidImageType};base64,${object['image-1'].data}`} alt="image testing" className="itemImage" />
                        <h1 className="itemName">{object.title}</h1>
                        <p className="itemOverView">{object.overview}</p>
                        <p className="itemLocation">{object.state}</p>
                    </div>)}
                </div>
            </div> : <LoadingBar />}

        </>
    );
}

export default Profile;