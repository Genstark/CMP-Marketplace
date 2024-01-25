export async function ImageConvertUrl(imageSendByUser){
    const imgdata1 = new FormData();
    imgdata1.append('file', imageSendByUser[0]);

    const imgdata2 = new FormData();
    imgdata2.append('file', imageSendByUser[1]);

    const imgdata3 = new FormData();
    imgdata3.append('file', imageSendByUser[2]);

    const url = 'https://upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com/api/upload-image';
    const options1 = {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'X-RapidAPI-Key': '55cfd3b5e1msh42db4a25dc6d649p1e5846jsnd7f392ecde15',
            'X-RapidAPI-Host': 'upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com'
        },
        body: imgdata1
    };

    const options2 = {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'X-RapidAPI-Key': '55cfd3b5e1msh42db4a25dc6d649p1e5846jsnd7f392ecde15',
            'X-RapidAPI-Host': 'upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com'
        },
        body: imgdata2
    };

    const options3 = {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'X-RapidAPI-Key': '55cfd3b5e1msh42db4a25dc6d649p1e5846jsnd7f392ecde15',
            'X-RapidAPI-Host': 'upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com'
        },
        body: imgdata3
    };

    try{
        // const response = await fetch(url, options1);
        // const data = await response.json();
        // console.log(data);
        // imageSendByUser = [...imagecollection, data];

        const request1 = fetch(url, options1);
        const request2 = fetch(url, options2);
        const request3 = fetch(url, options3);
        return Promise.all([request1, request2, request3]).then(res => {
            let result = res.map((r) => r.json());
            return Promise.resolve(Promise.all(result));
        });
    } 
    catch(error){
        console.log(error);
    }
}