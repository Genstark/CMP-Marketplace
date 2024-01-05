import React, {useState, useEffect, useRef} from "react";
import '../styling/AddItem.css';

function AddItem(){

    const [textareaValue, setTextareaValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const detailsTextareaRef = useRef(null);

    useEffect(() => {
        const element = detailsTextareaRef.current;
        
        if (element){
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
            setTextareaHeight(element.style.height);
        }
        
    }, [textareaValue]);

    function Homepage(){
        window.location.href = "/";
    }


    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={Homepage}>Compro Marketplace</h3>
            </div>

            <div className="itemAdd">
                <label htmlFor="title" className="labelName">Title:</label><br />
                <input type="text" id="title" name="name" className="inputData" placeholder="enter your full name" /><br />

                <label htmlFor="category" className="labelName">Category:</label><br />
                <select id="category" name="category" className="categoryDropdown">
                    <option value="Electronics" alt="Electronics">Electronics</option>
                    <option value="Bike" alt="Bike">Bike</option>
                </select><br />

                <label htmlFor="address" className="labelName">Address:</label><br />
                <input type="text" id="address" name="address" placeholder="Street Address" className="inputData" /><br />

                <label htmlFor="state" className="labelName">State:</label><br />
                <input type="text" id="state" name="state" placeholder="enter your state" className="inputData" /><br />

                <label htmlFor="number" className="labelName">Number:</label><br />
                <input type="text" id="number" name="number" placeholder="enter your mobile number" className="inputData" /><br />

                <label htmlFor="price" className="labelName">Price:</label><br />
                <input type="number" id="price" name="price" placeholder="enter price of product" className="inputData" min={100} /><br />

                <label htmlFor="images" className="labelName">Images:</label>
                <input type="file" accept=".jpg,.jpeg,.png" multiple id="images" style={{marginLeft: 10, marginBottom: 13}} /><br />

                <label htmlFor="overview" className="labelName">Overview:</label><br />
                <textarea name="overview" id="overview" className="inputData" style={{resize: 'none', height: 150, fontSize: 15, paddingTop: 4}} /><br />

                <label htmlFor="details" className="labelName">Details:</label><br />
                <textarea className="inputData" id="details" name="details" value={textareaValue} onChange={(event) => setTextareaValue(event.target.value)} 
                    ref={detailsTextareaRef}
                    style={
                        {resize: 'none', 
                        height: textareaHeight, 
                        fontSize: 15,
                        paddingTop: 4,
                        overflowY: 'hidden'}
                    }
                />

                <button className="addProduct">Add Item</button>

            </div>
        </>
    );
}

export default AddItem;