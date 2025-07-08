import torch
import numpy as np
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax
import urllib.request
import csv
import os
from pathlib import Path

# Global variables to store loaded model and tokenizer
model_loaded = None
tokenizer = None

def load_model_and_tokenizer():
    """Load the sentiment analysis model and tokenizer from HuggingFace"""
    global model_loaded, tokenizer
    
    if model_loaded is None or tokenizer is None:
        print("Loading sentiment analysis model from HuggingFace...")
        
        # Download and cache the model from HuggingFace
        model_name = "cardiffnlp/twitter-roberta-base-sentiment"
        
        try:
            # This will download the model if not cached, or use cached version
            model_loaded = AutoModelForSequenceClassification.from_pretrained(model_name)
            tokenizer = AutoTokenizer.from_pretrained(model_name)
            
            print("✅ Model and tokenizer loaded successfully!")
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise e
    
    return model_loaded, tokenizer

# Iterate on lines of a file and return a list of lines
def read_file(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()
    return lines

# Function that takes a text and preprocess it
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

# Function to do all processing on the file and input it into the model
def process_file(file_path):
    # Ensure model is loaded
    model, tokenizer = load_model_and_tokenizer()
    
    texts = read_file(file_path)

    sentiments = []
    for text in texts:
        text = preprocess(text)
        encoded_input = tokenizer(text, return_tensors='pt')
        output = model(**encoded_input)
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