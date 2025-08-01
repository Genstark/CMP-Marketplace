const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const CryptoJS = require("crypto-js");
const path = require('path');
// const chatbot = require('./chat_model/chatBot.js');
require('dotenv').config();
const requestIp = require('request-ip');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use('/public', express.static(path.join(__dirname, 'public'), { 'extensions': ['html', 'js', 'css'] }));

// app.use(express.static('client/dist'));
app.use(express.static(path.join(__dirname, 'client'), { 'extensions': ['html', 'js', 'css'] }));

const corsOptions = [
    {
        origin: 'http://localhost:5173',
        methods: 'GET, PUT, PATCH, DELETE, POST',
        credentials: true,
    },
    {
        origin: 'https://cmpmarketplacebackend.onrender.com/',
        methods: 'GET, PUT, PATCH, DELETE, POST',
        credentials: true,
    },
    {
        origin: 'http://cmp-market-env.eba-puamekmh.ap-south-1.elasticbeanstalk.com/',
        methods: 'GET, PUT, PATCH, DELETE, POST',
        credentials: true,
    },
    // Add more configurations if needed
];

app.use(cors(corsOptions));

const middleWare = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req); 
    // console.log(clientIp);
    next();
};

app.use(middleWare);


const uri = "U2FsdGVkX19+f6CAlwEFqvnpO5Nz5122QT5AuJpE3FmjJayvf0iusYU4h5fDnBAp8NdbMvX+AEvC6k6J+BzNxI/Zn04BdsC6LWfxbPAFTznSx0GuNbdB/4j65BOHKFJiLKJB+hGvTTj5CshiP6pqPwHXFTBm8r4cEsSDbIbgyu2AnaIuyZfsz+vgCU4jS+mZ";

const PORT = process.env.PORT || 2000;

// const client = new MongoClient(Decry pt(uri));
// client.connect();
// console.log('Connected to MongoDB');

/*-------------------------------------------------------------------------------------------------------------------------------- */


/*-------------------------------------------------------------------------------------------------------------------------------- */



/*-------------------------------------------------------------------------------------------------------------------------------- */



/*-------------------------------------------------------------------------------------------------------------------------------- */

async function getAllItemsMongoDB(){
    const client = new MongoClient(Decrypt(uri));

    try{
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate changes in your code here
        const db = client.db('olx');
        const collection = db.collection('Items');
        return await collection.find({}, { writeConcern: { w: 'majority' } }).toArray();
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}

app.get('/items', (req, res) => {
    
    getAllItemsMongoDB().then(data => {
        // console.log(data);

        res.status(200).json({
            message: 'Success',
            data: data
        });
    }).catch(error => {
        // console.log(error);
        res.status(500).json({
            message: 'Server error',
            data: error
        });
    });
});


/*-------------------------------------------------------------------------------------------------------------------------------- */
//when user request for the product page

async function getIndividualProductData(productkey){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        return await collection.findOne({ _id : new ObjectId(productkey) });
    }
    finally{
        await client.close();
    }
}

app.get('/items/:id', (req, res) => {
    const requestId = req.params.id;
    // console.log(requestId);

    getIndividualProductData(requestId).then(data => {
        // console.log(data);
        res.status(200).json({
            message: 'success',
            data: data,
        });
    }).catch(error => {
        // console.log(error);
        res.status(500).json({
            message: 'Server error',
            data: error
        });
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function getUserDataWithProduct(userId){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        // const user =  await collection.findOne({ _id: new ObjectId(userId) });
        return await collection.find({user_id: userId}).toArray();
    }
    finally{
        await client.close();
    }
}

async function getUserProfileDataWithoutProduct(userId){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');

        // const user =  await collection.findOne({ _id: new ObjectId(userId) });
        return await collection.find({_id : new ObjectId(userId)}).toArray();
    }
    finally{
        await client.close();
    }
}

app.get('/item/profile/:itemId', (req, res) => {
    const requesId = req.params.itemId;
    // // console.log(requesId);
    
    getUserDataWithProduct(requesId).then(data => {
        let userOfUser = data['user_id'];
        // // console.log(data);

        if(data.length !== 0){
            res.status(200).json({
                message: 'ok',
                data: data,
                withItem: true
            });
        }
        else{
            getUserProfileDataWithoutProduct(requesId).then(data => {
                // // console.log(data);
                res.status(200).json({
                    message: 'ok',
                    data: [{userName: data[0].UserName, phoneNumber: data[0].PhoneNumber, Address: '**********'}],
                    withItem: false
                });
            }).catch(error => {
                // console.log(error);
            });
        }
    }).catch(err => {
        // console.log(err);
        res.status(500).json({
            message: 'Server error',
            done: false
        });
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function addDataMongodb(userdata){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');
        
        const emailfind = await collection.findOne({UserEmail: userdata['UserEmail']});
        
        if(emailfind === null){
            await collection.insertOne(userdata, { writeConcern: { w: 'majority' } });
            return 'Account is create';
        }
        else{
            return 'email is already exist please use another email';
        }
    }
    finally{
        await client.close();
    }
}

app.post('/signIn', (req, res) => {
    const userData = req.body;

    const passwordEncrypted = Encryption(userData['Password']);

    // userData['_id'] = generateId();
    userData['Password'] = passwordEncrypted;

    // console.log(userData);

    addDataMongodb(userData).then(data => {
        res.status(200).json({
            status: "ok",
            data: data
        });
    }).catch(error => {
        // console.log(error);
        res.status(400).json({
            status: "error",
            data: 'Server error'
        });
    });

});

/*-------------------------------------------------------------------------------------------------------------------------------- */
async function loginDataMongodb(useremail){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');
        return await collection.findOne({UserEmail: useremail}, { writeConcern: { w: 'majority' } });
    }
    finally{
        await client.close();
    }
}


app.post('/login', (req, res) => {
    const postData = req.body;
    // console.log(postData);

    loginDataMongodb(postData['email']).then(data => {
        const mongoData = data;
        // console.log(mongoData);

        if(mongoData !== null){
            if(mongoData['UserEmail'] === postData['email'] && Decrypt(mongoData['Password']) === postData['password']){
                res.status(200).json({
                    message: "email and password is correct",
                    done: true,
                    token: mongoData['_id'],
                    data: mongoData['UserName']
                });
            }
            else{
                res.status(401).json({
                    message: "wrong email or password",
                    done: false
                });
            }
        }
        else{
            res.status(401).json({
                message: 'Invalid Data',
                done: null
            });
        }
    }).catch(err => {
        // console.log(err);
        res.status(500).json({
            message: 'Server error',
            done: false
        });
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function userAddSellProduct(userdata, userId, user){
    const client = new MongoClient(Decrypt(uri));

    try{

        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        const data = {
            'userName' : user,
            // 'brandName': userdata['brandname'],
            'title': userdata['title'],
            'Address': userdata['address'],
            'phoneNumber': userdata['phonenumber'],
            'state': userdata['state'],
            // 'city': userdata['city'],
            'price': userdata['price'],
            'overview': userdata['overview'],
            'details': userdata['details'],
            'image-1': userdata['image-1'],
            'image-2': userdata['image-2'],
            'image-3': userdata['image-3'],
            'user_id': userId,
            'category': userdata['category'],
            'date': userdata['date']
        }

        await collection.insertOne(data, {writeConcern: {w: 'majority'}});
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}


const storage = multer.memoryStorage();
const upload = multer({storage: storage});


app.post('/addProduct', upload.array('files', 3),(req, res) => {

    const userData = req.body;
    // // console.log(userData);
    // const userId = req.body.token;
    const userId = Decrypt(req.body.token);
    const user = Decrypt(req.body.data);
    // const user = req.body.data;

    // let imageCollection = [];

    // if(req.files.length > 0){
    //     for(let i=0; i < req.files.length; i++){
    //         const fileData = req.files[i].buffer;
    //         const fileDocument = {
    //             filename: req.files[i].originalname,
    //             data: fileData
    //         }

    //         imageCollection.push(fileDocument);
    //     }
    // }
    
    userAddSellProduct(userData, userId, user).then(data => {
        res.status(200).json({
            message: 'success',
            data: 'product is ready to sell'
        });
    }).catch(error => {
        // console.log(error);
        res.status(500).json({
            message: 'Server error',
            data: error
        });
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function deleteItem(itemId){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();
        const db = client.db('olx');
        const collection = db.collection('Items');

        await collection.deleteOne({ _id : itemId });
    }
    finally{
        await client.close();
    }
}

app.delete('/item/delete/:itemId', (req, res) => {
    const deleterequest = req.params.itemId;

    deleteItem(deleterequest).then(data => {
        res.status(200).json({
            message: 'item is delete'
        });
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function filterItems(query){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();
        const db = client.db('olx');
        const collection = db.collection('Items');

        const data = await collection.find({title: query}).toArray();

        return data;
    }
    finally{
        await client.close();
    }
}


app.get('/item/search/:query', (req, res) => {
    const query = req.params.query;

    filterItems(query).then(data => {
        // // console.log(data);
        res.status(200).json({
            message: 'ok',
            data: data
        });

    }).catch(error => {
        // console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function categoryItems(query){
    const client = new MongoClient(Decrypt(uri));

    try{
        await client.connect();
        const db = client.db('olx');
        const collection = db.collection('Items');

        const data = await collection.find({category: query}).toArray();

        return data;
    }
    finally{
        await client.close();
    }
}

app.get('/item/search/:query', (req, res) => {
    const query = req.params.query;
    categoryItems(query).then(item => {
        if(data.length !== 0){
            res.status(200).json({
                message: 'ok',
                data: item,
                withItem: true
            });
        }
        else{
            res.status(200).json({
                message: 'ok',
                data: item,
                withItem: false
            });
        }
    }).catch(error => {
        // console.log(error);
        res.status(500).json({message:'Server error'});
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

function Encryption(password){
    const ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
    return ciphertext;
}


function Decrypt(passowrd){
    const bytes = CryptoJS.AES.decrypt(passowrd, 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}


/*---------------------------------------------------------------------------------------------*/
function generateId(){
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for(let i=0; i < 15; i++){
        result += character[Math.floor(Math.random() * character.length)];
    }
    return result;
}

function genrateProductKey(){
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = '';
    for(let i=0; i < 20; i++){
        result += character[Math.floor(Math.random() * character.length)];
    }
    return result;
}
/*---------------------------------------------------------------------------------------------*/



/*
/user               (get all data for landing or homepage)
/user/id            (get data of single product and single user)
/user/login         (when user login)
/user/signIn        (when user create new account)
/user/addItem       (when user logout)
/user/deleteItem    (when user delete item)
/user/deleteAccount (when user delete account)

--------------------------------------------------------------
When the user is a viewer
--------------------------------------------------------------

/item               (list of all product without login)
/item/id            (individual product page)
*/


//how to desgine sql and Nosql
//tips for creating mongodb tabel
//difference between sql and NoSql
//what is sql and mongodb

//structure query language
