import re
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences


# Iterate on lines of a file and return a list of lines
def read_file(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()
    # for line in lines:
    #     line.decode("utf-8")
    return lines

# Iterate on list of lines and apply regex to clean the data
def clean_data(lines):
    cleaned_lines = []
    NON_ALPHANUM = re.compile(r'[\W]')
    NON_ASCII = re.compile(r'[^a-z0-1\s]')
    for line in lines:
        lower = line.lower()
        no_punctuation = NON_ALPHANUM.sub(r' ', lower)
        no_non_ascii = NON_ASCII.sub(r'', no_punctuation)
        strip_lines = no_non_ascii.strip()
        # Only append the line if it is not empty
        if strip_lines != "":
            cleaned_lines.append(strip_lines)
    return cleaned_lines

# Tokenize the cleaned_lines
def tokenize_data(cleaned_lines):
    MAX_FEATURES = 12000
    tokenizer = Tokenizer(num_words=MAX_FEATURES)
    tokenizer.fit_on_texts(cleaned_lines)
    tokenize_data = tokenizer.texts_to_sequences(cleaned_lines)
    return tokenize_data

# Pad sequence to make all sequences of same length
def pad_sequence(tokenized_data):
    MAX_LENGTH = 255
    padded_data = pad_sequences(tokenized_data, maxlen=MAX_LENGTH)
    return padded_data

# Function to do all processing on the file and input it into the model
def process_file(file_path):
    lines = read_file(file_path)
    cleaned_lines = clean_data(lines)
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
        if i > 0.5:
            positive = positive +1
        else:
            negative = negative+1
    result = {
        "positive" : positive,
        "negative" : negative
    }
    return result


    