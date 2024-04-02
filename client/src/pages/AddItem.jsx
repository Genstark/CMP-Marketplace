import React, {useState, useEffect, useRef} from "react";
import '../styling/AddItem.css';
import {ImageConvertUrl} from "../functions/ImageUrlApi.js";
import { useNavigate } from "react-router-dom";

function AddItem(){

    const [textareaValue, setTextareaValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const detailsTextareaRef = useRef(null);
    const imageInputRef = useRef(null);
    const [status, setStatus] = useState(false);

    const [button, setButton] = useState('Add Item');

    const navigate = useNavigate();

    useEffect(() => {
        const element = detailsTextareaRef.current;
        
        if(sessionStorage.getItem('data')){
            setStatus(true);
            if (element){
                element.style.height = 'auto';
                element.style.height = element.scrollHeight + 'px';
                setTextareaHeight(element.style.height);
            }
        }
        else{
            setStatus(false);
            // window.location.href = '/login';
            navigate('/login');
        }
    }, [textareaValue]);

    function Homepage(){
        window.location.href = "/";
    }

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState(0);
    const [overview, setOverview] = useState('');
    const [details, setDetails] = useState('');

    function checkProductInput(){
        if(title.trim() === ''){
            alert("Please enter a title for the product.");
            return;
        }
        else if(category === ''){
            alert("Please select a category for this item.");
            return;
        }
        else if(address === ''){
            alert("Please provide an address for where the product is located.");
            return;
        }
        else if(state === ''){
            alert("Please indicate the state in which the product is located.");
            return;
        }
        else if(validPhoneNumber(number) === false){
            alert("Please enter a valid phone number.");
            return;
        }
        else if(overview === ''){
            alert("Please add some information about the product to the overview field.");
            return;
        }
        else if(details === ''){
            alert("Please provide more details about the product in the details section.");
            return;
        }
        else{

            const currentDate = new Date();
            const dateTimeString = currentDate.toLocaleString();
            const dateTimeSplit = dateTimeString.split(',')[0];

            const data = {
                "title": title,
                "category": category,
                "price": price,
                "address": address,
                "state": state,
                "phonenumber": number,
                "overview": overview,
                "details": details,
                'date': dateTimeSplit
            }

            return data;
        }
    }

    function validPhoneNumber(number){
        const numberChecking = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return numberChecking.test(number);
    }

    // const [imagecollection, setImagecollection] = useState([]);
    
    // async function imageConvertUrl(){
    //     const imgdata = new FormData();

    //     for(let i=0; i < imageInputRef.current.files.length; i++){
    //         imgdata.append('file', imageInputRef.current.files[i]);

    //         const url = 'https://upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com/api/upload-image';
    //         const options1 = {
    //             method: 'POST',
    //             headers: {
    //                 Accept: '*/*',
    //                 'X-RapidAPI-Key': '55cfd3b5e1msh42db4a25dc6d649p1e5846jsnd7f392ecde15',
    //                 'X-RapidAPI-Host': 'upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com'
    //             },
    //             body: imgdata
    //         };
    //         try{
    //             const response = await fetch(url, options1);
    //             const data = await response.json();
    //             console.log(data);
    //             setImagecollection((prevApiData) => [...prevApiData, data]);
    //         } 
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
    // }
    
    
    function addProduct(event){
        event.preventDefault();

        setButton('Wait...');

        ImageConvertUrl(imageInputRef.current.files).then(res => {
            
            const data = checkProductInput();
            const formData = new FormData();
    
            formData.append('token', sessionStorage.getItem('token'));
            formData.append('data', sessionStorage.getItem('data'));
            formData.append('title', data['title']);
            formData.append('category', data['category']);
            formData.append('address', data['address']);
            formData.append('state', data['state']);
            formData.append('phonenumber', data['phonenumber']);
            formData.append('price', data['price']);
            formData.append('image-1', res[0]['link']);
            formData.append('image-2', res[1]['link']);
            formData.append('image-3', res[2]['link']);
            formData.append('overview', data['overview']);
            formData.append('details', data['details']);
            formData.append('date', data['date']);
    
            
            const apiUrl = 'http://localhost:2000/addProduct';
            const options = {
                method: 'POST',
                body: formData
            }

            try{
                fetch(apiUrl, options).then(res => {
                    return res.json();
                }).then(data => {
                    console.log(data);
                    // setTitle('');
                    // setCategory('');
                    // setAddress('');
                    // setState('');
                    // setNumber('');
                    // setPrice(0);
                    // setOverview('');
                    // setDetails('');
                    // setTextareaValue('');
                    setButton('Add Item');
                }).catch(error => {
                    console.log(error);
                });
            }
            catch{
                alert("Error in network while adding product");
            }

        });
    }

    function pressEnter(event){
        if (event.key === "Enter") {
            addProduct();
        }
    }


    // console.log(imagecollection);

    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={Homepage}>Compro Marketplace</h3>
            </div>

            {status ? <div className="itemAdd">
                <label htmlFor="title" className="labelName">Title:</label><br />
                <input type="text" id="title" name="name" className="inputData" placeholder="enter your full name" onChange={(e) => setTitle(e.target.value)} value={title} /><br />

                <label htmlFor="category" className="labelName">Category:</label><br />
                <select id="category" name="category" className="categoryDropdown" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choosr Product Type</option>
                    <option value="Electronics" alt="Electronics">Electronics</option>
                    <option value="Bike" alt="Bike">Bike</option>
                </select><br />

                <label htmlFor="address" className="labelName">Address:</label><br />
                <input type="text" id="address" name="address" placeholder="Street Address" className="inputData" onChange={(e) => setAddress(e.target.value)} value={address} /><br />

                <label htmlFor="state" className="labelName">State:</label><br />
                <input type="text" id="state" name="state" placeholder="enter your state" className="inputData" onChange={(e) => setState(e.target.value)} value={state} /><br />

                <label htmlFor="number" className="labelName">Number:</label><br />
                <input type="text" id="number" name="number" placeholder="enter your mobile number" className="inputData" onChange={(e) => setNumber(e.target.value)} value={number} /><br />

                <label htmlFor="price" className="labelName">Price:</label><br />
                <input type="number" id="price" name="price" placeholder="enter price of product" className="inputData" min={100} onChange={(e) => setPrice(e.target.value)} value={price} /><br />

                <label htmlFor="images" className="labelName">Images:</label>
                <input type="file" accept=".jpg,.jpeg,.png" multiple id="images" ref={imageInputRef} className="inputImageProduct" style={{marginLeft: 10, marginBottom: 13, border: 'none'}} /><br />

                <label htmlFor="overview" className="labelName">Overview:</label><br />
                <textarea name="overview" id="overview" className="inputData" style={{resize: 'none', height: 150, fontSize: 15, paddingTop: 4, overflowY: 'hidden'}} onChange={(e) => setOverview(e.target.value)} value={overview} /><br />

                <label htmlFor="details" className="labelName">Details:</label><br />
                <textarea className="inputData" id="details" name="details" value={textareaValue} onChange={(e) => {setTextareaValue(e.target.value);
                                                                                                                    setDetails(e.target.value);}} 
                    ref={detailsTextareaRef}
                    style={
                        {resize: 'none',
                        height: textareaHeight,
                        fontSize: 15,
                        paddingTop: 4,
                        overflowY: 'hidden'}
                    }

                    onKeyDown={pressEnter}
                />

                <button className="addProduct" onClick={addProduct}>{button}</button>

            </div> : ''}
        </>
    );
}

export default AddItem;