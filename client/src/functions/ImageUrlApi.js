import React, {useState} from "react";

async function ImageConvertUrl(){
    const [imagecollection, setImagecollection] = useState([]);
    const imgdata = new FormData();

    for(let i=0; i < imageInputRef.current.files.length; i++){
        imgdata.append('file', imageInputRef.current.files[i]);

        const url = 'https://upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com/api/upload-image';
        const options1 = {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'X-RapidAPI-Key': '55cfd3b5e1msh42db4a25dc6d649p1e5846jsnd7f392ecde15',
                'X-RapidAPI-Host': 'upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com'
            },
            body: imgdata
        };
        try{
            const response = await fetch(url, options1);
            const data = await response.json();
            console.log(data);
            setImagecollection((prevApiData) => [...prevApiData, data]);
        } 
        catch(error){
            console.log(error);
        }
    }

    if(imagecollection.length === 3){
        return imagecollection;
    }
}

export default ImageConvertUrl;