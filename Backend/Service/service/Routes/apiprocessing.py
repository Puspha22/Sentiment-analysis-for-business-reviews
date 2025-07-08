import re
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences


# Function that takes json data and converts it to a list of strings
def json_to_list(data):
    result = []
    for key in data:
        result.append(data[key])
    return result

# Function to apply regex to clean the data
def clean_data(result):
    cleaned_lines = []
    NON_ALPHANUM = re.compile(r'[\W]')
    NON_ASCII = re.compile(r'[^a-z0-1\s]')
    for line in result:
        lower = line.lower()
        no_punctuation = NON_ALPHANUM.sub(r' ', lower)
        no_non_ascii = NON_ASCII.sub(r'', no_punctuation)
        strip_lines = no_non_ascii.strip()
        # Only append the line if it is not empty
        if strip_lines != "":
            cleaned_lines.append(strip_lines)
    return cleaned_lines

# Tokenize the cleaned_text
def tokenize_data(cleaned_lines):
    MAX_FEATURES = 12000
    tokenizer = Tokenizer(num_words=MAX_FEATURES)
    tokenizer.fit_on_texts(cleaned_lines)
    tokenize_lines = tokenizer.texts_to_sequences(cleaned_lines)
    return tokenize_lines

# Pad sequence to make all sequences of same length
def pad_sequence(tokenized_lines):
    MAX_LENGTH = 255
    padded_lines = pad_sequences(tokenized_lines, maxlen=MAX_LENGTH)
    return padded_lines

# Function to do all processing on the text and input it into the model
def process_api(data):
    result = json_to_list(data)
    cleaned_lines = clean_data(result)
    tokenized_lines = tokenize_data(cleaned_lines)
    padded_lines = pad_sequence(tokenized_lines)

    # Import model and predict
    model = load_model("/service/service/Routes/model.h5")
    result = []
    for line in padded_lines:
        prediction = model.predict(np.array([line]))
        result.append(prediction)
    sentiments = []
    for i in result:
        sentiments.append(i[0][0])
    negative = 0
    positive = 0
    for i in sentiments:
        if i < 0.5:
            positive = positive +1
        else:
            negative = negative+1
    result = {
        "positive" : positive,
        "negative" : negative
    }
    return result