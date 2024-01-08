import React, {useState, useRef, useEffect} from "react";
import Header from "../component/Header.jsx";
import * as tf from '@tensorflow/tfjs';


function ImageClassification(){

    const [output, setOutput] = useState(null);

    useEffect(() => {
        const data = tf.randomNormal([100, 1]);
        const labels = tf.randomUniform([100, 1], 0, 2).round();

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'sigmoid' }));

        model.compile({ optimizer: 'Adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

        model.fit(data, labels, { epochs: 10 }).then((history) => {
            console.log('Training complete:', history);

            const newData = tf.randomNormal([1, 1]);
            const prediction = model.predict(newData);

            setOutput(prediction.dataSync()[0]);
        });

    }, []);

    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => window.location.href = '/'}>Compro Marketplace</h3>
            </div>

            <div>
                <p>Output: {output !== null ? output.toFixed(4) : 'Loading...'}</p>
            </div>

            <p></p>
        </>
    );
}

export default ImageClassification;