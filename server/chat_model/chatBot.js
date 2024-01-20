const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

const loadModel = async () => {
    try {
        const loadedModel = await tf.loadLayersModel('model.json');
        return loadedModel;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
};

const getModel = async () => {
    try {
        return await loadModel();
    } catch (error) {
        console.error('Error getting model:', error);
        throw error;
    }
};

const model = getModel();

const words = JSON.parse(fs.readFileSync('words.json')); // Adjust the path accordingly
const classes = JSON.parse(fs.readFileSync('classes.json')); // Adjust the path accordingly
const intents = JSON.parse(fs.readFileSync('intents.json')); // Adjust the path accordingly

const lemmatizer = (word) => word.toLowerCase();

const cleanUpSentence = (sentence) => {
    const sentenceWords = sentence.split(' ').map(lemmatizer);
    return sentenceWords;
};

const bow = (sentence, words) => {
    const sentenceWords = cleanUpSentence(sentence);
    const bag = Array(words.length).fill(0);

    sentenceWords.forEach((word) => {
        const index = words.indexOf(word);
        if (index !== -1) {
        bag[index] = 1;
        }
    });

    return bag;
};

const predictClass = (sentence) => {
    const p = bow(sentence, words);
    const res = model.predict(tf.tensor2d([p])).dataSync();
    const ERROR_THRESHOLD = 0.25;
    const results = res
        .map((probability, index) => ({ index, probability }))
        .filter(({ probability }) => probability > ERROR_THRESHOLD)
        .sort((a, b) => b.probability - a.probability);

        return results.map(({ index, probability }) => ({
            intent: classes[index],
            probability: probability.toString(),
        }));
};

const getResponse = (ints) => {
    const tag = ints[0].intent;
    const list_of_intents = intents.intents;

    for (const intent of list_of_intents) {
        if (intent.tag === tag) {
            return intent.responses[Math.floor(Math.random() * intent.responses.length)];
        }
    }

    return 'I am sorry, I do not understand.';
};

module.exports = getResponse;