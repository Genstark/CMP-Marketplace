import React, {useState, useRef, useEffect} from "react";
import Header from "../component/Header.jsx";
import * as tf from '@tensorflow/tfjs';
import '../styling/TestingComponent.css'


const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
  
    const sendMessage = () => {
        if(userInput.trim() === ''){
            return;
        }
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: userInput, sender: 'user' },
            { text: 'Hello! I am a bot.', sender: 'bot' }
        ]);
  
        setUserInput('');
    };
  
    return (
        <div className="chatbox">
            <div className="chatlogs">
                {messages.map((message, index) => (
                    <div key={index} className={`chat ${message.sender}`}>
                        <p>{`${message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}: ${message.text}`}</p>
                    </div>
                ))}
            </div>
            <div className="chat-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="botbutton">Send</button>
            </div>
        </div>
    );
};
  


function ComponentTesting(){

    const [output, setOutput] = useState(null);

    useEffect(() => {
        // const data = tf.randomNormal([100, 1]);
        // const labels = tf.randomUniform([100, 1], 0, 2).round();

        // const model = tf.sequential();
        // model.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'sigmoid' }));

        // model.compile({ optimizer: 'Adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

        // model.fit(data, labels, { epochs: 10 }).then((history) => {
        //     console.log('Training complete:', history);

        //     const newData = tf.randomNormal([1, 1]);
        //     const prediction = model.predict(newData);

        //     setOutput(prediction.dataSync()[0]);
        // });

    }, []);

    const [mouseX, setMouseX] = useState('mouse is out');
    const mouseRef = useRef(null);

    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => window.location.href = '/'}>Compro Marketplace</h3>
            </div>

            <div>
                <p>Output: {output !== null ? output.toFixed(4) : 'Loading...'}</p>
            </div>

            <div style={{
                position: 'relative',
                width: '50%', 
                height: '200px',
                border: '1px solid black',
                margin: 'auto',
                display: 'flex'
            }} className="main">

                <div style={{
                    backgroundColor: 'red',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center'
                }} className="box1">1</div>

                <div className="box2">2</div>
            </div>

            {/* <Chatbox /> */}
        </>
    );
}

export default ComponentTesting;