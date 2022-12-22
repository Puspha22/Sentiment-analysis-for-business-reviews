# SentimentAnalysisFinalYearProject
This project aims to predict the sentiment of user reviews on any product.


## Installation

Install docker and docker-compose to run this project locally.
Install anaconda to run the ML codes.

## How to work on this project

```bash
# Clone the repo
git clone https://github.com/NCITFYP/Sentiment-Analysis.git
# Navigate inside the cloned directory named "SentimentAnalysisFinalYearProject"

# Create a local branch from the main 
git checkout -b local # Do your task in this branch

# When finished
git add .
git commit -m "Added these changes"
git pull origin main
git pull origin <your remote branch> # if any
# Rosolve any merge conflicts
git push origin <your remote branch>

# Create a pull request from GitHub with a proper description of changes.
```

## How to run this project
```bash
# Navigate to the cloned folder
docker-compose build
docker-compose up -d
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.