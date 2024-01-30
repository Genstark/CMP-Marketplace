import nltk
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

import pickle
import numpy as np
import tensorflow



# nltk.download('all')
all_nltk_packages = nltk.data.find("corpora").split()

# Check if a specific package is installed
def check_nltk_package(package_name):
    try:
        nltk.data.find(package_name)
        print(f"{package_name} is already installed.")
        return True
    except LookupError:
        print(f"{package_name} is not installed.")
        return False

# Check and install all NLTK packages
def check_and_install_all_nltk_packages(package_names):
    packages_to_install = [package for package in package_names if not check_nltk_package(package)]
    
    if packages_to_install:
        print("Installing missing packages...")
        nltk.download(packages_to_install)
        print("All packages have been installed.")
    else:
        print("All NLTK packages are already installed.")

# Check and install all NLTK packages
check_and_install_all_nltk_packages(all_nltk_packages)


# model = tensorflow.keras.models.load_model('model.h5')

import json
import random
import os

print(os.getcwd())

# Load the trained model, words, and classes
model = tensorflow.keras.models.load_model(os.path.join(os.getcwd(), 'ChatBot', 'model.h5'))
intents = json.loads(open(os.path.join(os.getcwd(), 'ChatBot', 'intents.json')).read())
words = pickle.load(open(os.path.join(os.getcwd(), 'ChatBot', 'words.pkl'), 'rb'))
classes = pickle.load(open(os.path.join(os.getcwd(), 'ChatBot', 'classes.pkl'), 'rb'))

# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()

def clean_up_sentence(sentence):
    # Tokenize the pattern - split words into an array
    sentence_words = nltk.word_tokenize(sentence)
    # Stem each word - create a short form for the word
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

# Return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
def bow(sentence, words, show_details=True):
    # Tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # Bag of words - matrix of N words, vocabulary matrix
    bag = [0]*len(words) 
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s: 
                # Assign 1 if the current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)

def predict_class(sentence, model):
    # Filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # Sort by the strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

def chatbot_response(text):
    ints = predict_class(text, model)
    res = getResponse(ints, intents)
    return res