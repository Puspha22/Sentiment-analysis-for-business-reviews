import torch
import numpy as np
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax
import urllib.request
import csv

model_loaded = AutoModelForSequenceClassification.from_pretrained("service/cardiffnlp/twitter-roberta-base-sentiment", local_files_only=True)
tokenizer = AutoTokenizer.from_pretrained("service/saved_model")

# Function that takes json data and converts it to a list of strings
def json_to_list(data):
    result = []
    for key in data:
        result.append(data[key])
    return result

# Function that takes a text and preprocess it
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

# Function to do all processing on the file
def process_api(data):
    result = json_to_list(data)
    sentiments = []
    for text in result:
        text = preprocess(text)
        encoded_input = tokenizer(text, return_tensors='pt')
        output = model_loaded(**encoded_input)
        scores = output[0][0].detach().numpy()
        scores = softmax(scores)

        task='sentiment'
        labels=[]
        mapping_link = f"https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/{task}/mapping.txt"
        with urllib.request.urlopen(mapping_link) as f:
            html = f.read().decode('utf-8').split("\n")
            csvreader = csv.reader(html, delimiter='\t')
        labels = [row[1] for row in csvreader if len(row) > 1]

        ranking = np.argsort(scores)
        ranking = ranking[::-1]
        init_dict = {}
        for i in range(scores.shape[0]):
            l = labels[ranking[i]]
            s = scores[ranking[i]]
            init_dict[l] = s
        
        max_key = max(init_dict, key=init_dict. get)
        sentiments.append(max_key)

    positive = 0
    negative = 0
    neutral = 0
    for i in sentiments:
        if i == 'positive':
            positive = positive + 1
        elif i == 'negative':
            negative = negative + 1
        else:
            neutral = neutral + 1
    result = {"positive" : positive , "negative":negative , "neutral":neutral }
    return result
