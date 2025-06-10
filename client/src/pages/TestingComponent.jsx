import {useState, useRef} from "react";
import '../styling/TestingComponent.css';
import { useNavigate } from "react-router-dom";


const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [buttonDisable, setButtonDisable] = useState(false);
    const [buttonClick, setButtonClick] = useState('Send');
  
    const sendMessage = () => {
        if(userInput.trim() === ''){
            return;
        }

        const apiUrl = 'http://localhost:3000/chatbot';
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({"userQuery": userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase()})
        }

        setMessages((prevMessage) => [...prevMessage, {text: userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase(), sender: 'user'}]);

        setButtonDisable(true);
        setButtonClick('Wait..');

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setMessages((prevMessage) => [...prevMessage, {sender: 'bot', text: data['data']}]);
            setButtonDisable(false);
            setButtonClick('Send');
        }).catch(error => {
            console.log('model is not working');
            console.log(error);
            setButtonClick('Send');
        });

        // setMessages((prevMessages) => [
        //     ...prevMessages,
        //     { text: userInput, sender: 'user' },
        //     { text: 'Hello! I am a bot.', sender: 'bot' }
        // ]);

        // setMessages((prevMessage) => [...prevMessage, {text: getResponse(userInput), sender: 'bot'}]);
  
        setUserInput('');
    };

    function clickEnter(event){
        if(event.key === "Enter"){
            sendMessage();
        }
    }
  
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
                    onKeyDown={clickEnter}
                />
                <button onClick={sendMessage} className="botbutton" disabled={buttonDisable}>{buttonClick}</button>
            </div>
        </div>
    );
};
  


function ComponentTesting(){

    const [output, setOutput] = useState(null);

    const [mouseX, setMouseX] = useState('mouse is out');
    const mouseRef = useRef(null);
    const navigator = useNavigate();

    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => navigator('/')}>Compro Marketplace</h3>
            </div>

            {/* <div style={{
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
            </div> */}

            <Chatbox />
        </>
    );
}

export default ComponentTesting;