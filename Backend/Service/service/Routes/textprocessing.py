import re
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

from service import app

# Function to apply regex to clean the data
def clean_data(text):
    cleaned_text = []
    NON_ALPHANUM = re.compile(r'[\W]')
    NON_ASCII = re.compile(r'[^a-z0-1\s]')
    lower = text.lower()
    no_punctuation = NON_ALPHANUM.sub(r' ', lower)
    no_non_ascii = NON_ASCII.sub(r'', no_punctuation)
    strip_lines = no_non_ascii.strip()
    # Only append the line if it is not empty
    if strip_lines != "":
        cleaned_text.append(strip_lines)
    return cleaned_text

# Tokenize the cleaned_text
def tokenize_data(cleaned_text):
    MAX_FEATURES = 12000
    tokenizer = Tokenizer(num_words=MAX_FEATURES)
    tokenizer.fit_on_texts(cleaned_text)
    tokenize_text = tokenizer.texts_to_sequences(cleaned_text)
    return tokenize_text

# Pad sequence to make all sequences of same length
def pad_sequence(tokenized_text):
    MAX_LENGTH = 255
    padded_text = pad_sequences(tokenized_text, maxlen=MAX_LENGTH)
    return padded_text

# Function to do all processing on the text and input it into the model
def process_text(text):
    cleaned_text = clean_data(text)
    tokenized_text = tokenize_data(cleaned_text)
    padded_text = pad_sequence(tokenized_text)

    # Import model and predict
    model = load_model("/service/service/Routes/model.h5")
    result = []
    for line in padded_text:
        prediction = model.predict(np.array([line]))
        result.append(prediction)
    sentiments = []
    for i in result:
        sentiments.append(i[0][0])
    negative = 0
    positive = 0
    for i in sentiments:
        if i > 0.5:
            positive = positive + 1
        else:
            negative = negative + 1
    result = {
        "positive" : positive,
        "negative" : negative
    }
    return result
