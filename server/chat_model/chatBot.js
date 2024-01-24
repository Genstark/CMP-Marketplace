global.fetch = require('node-fetch');
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const natural = require('natural');
const path = require('path');

const WordNet = new natural.WordNet();

async function loadModel() {
    const modelPath = path.resolve(__dirname, 'model.json');
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    return model;
}

async function initialize() {
    const model = await loadModel();
    const words = JSON.parse(fs.readFileSync('./words.json')); // Corrected readFileSync
    const classes = JSON.parse(fs.readFileSync('./classes.json')); // Corrected readFileSync
    const intents = JSON.parse(fs.readFileSync('./intents.json')); // Corrected readFileSync

    return { model, words, classes, intents };
}

function cleanUpSentence(sentence) {
    const sentenceWords = natural.word_tokenize(sentence); // Corrected function call
    const lemmatizedWords = sentenceWords.map(word => WordNet.lemmatize(word.toLowerCase()));
    return lemmatizedWords;
}

function bow(sentence, words, showDetails = true) {
    const sentenceWords = cleanUpSentence(sentence);
    const bag = new Array(words.length).fill(0);

    for (const s of sentenceWords) {
        const index = words.indexOf(s);
        if (index !== -1) {
            bag[index] = 1;
            if (showDetails) {
                console.log(`found in bag: ${s}`);
            }
        }
    }

    return bag;
}

function predictClass(sentence, model, words) {
    const p = bow(sentence, words, false);
    const res = model.predict(tf.tensor2d([p])); // Corrected tf.tensor2d
    const predictions = Array.from(res.dataSync());
    const errorThreshold = 0.25;

    const results = predictions
        .map((value, index) => [index, value])
        .filter(([index, value]) => value > errorThreshold);

    results.sort((a, b) => b[1] - a[1]);

    const returnList = results.map(result => ({
        intent: classes[result[0]],
        probability: result[1].toString()
    }));

    return returnList;
}

function getResponse(ints, intentsJson) {
    const tag = ints[0].intent;
    const list_of_intents = intentsJson.intents;

    for (const intent of list_of_intents) {
        if (intent.tag === tag) {
            return randomChoice(intent.responses);
        }
    }

    return null;
}

function randomChoice(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

async function chatbotResponse(text) {
    const { model, words, classes, intents } = await initialize();
    const lemmatizedWords = text.split(' ').map(word => WordNet.lemmatize(word));
    const ints = predictClass(lemmatizedWords.join(' '), model, words);
    const res = getResponse(ints, intents);
    return res;
}

// Example usage
async function main() {
    const userInput = 'Hello, how are you?';
    const response = await chatbotResponse(userInput);
    console.log(response);
}

main();