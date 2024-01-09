import React, {useState, useRef, useEffect} from "react";
import Header from "../component/Header.jsx";
import * as tf from '@tensorflow/tfjs';
import sound from '../image/test.mp3';
import '../styling/Image.css'


function ImageClassification(){

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

            {/* <button onMouseEnter={() => {setMouseX('mouse enter');
                                        const audio = new Audio(sound);
                                        audio.play();
                                    }} 
                    onMouseLeave={() => setMouseX('mouse out')}
                    ref={mouseRef}
                    onClick={() => {
                        if(mouseX === "mouse enter"){
                            const audio = new Audio(sound);
                            audio.play();
                        }
                    }}>
                {mouseX}
            </button> */}

            <div style={{
                position: 'relative',
                width: '50%', 
                height: '200px',
                border: '1px solid black',
                margin: 'auto',
                display: 'flex'
            }} className="">

                <div style={{
                    backgroundColor: 'red',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center'
                }} className="box1">1</div>

                <div className="box2">2</div>
            </div>
        </>
    );
}

export default ImageClassification;