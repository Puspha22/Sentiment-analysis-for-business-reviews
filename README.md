# Sentiment Analysis Platform

A full-stack web application for sentiment analysis using state-of-the-art NLP models. Users can upload text or files, provide an API endpoint for data extraction, receive sentiment predictions, and manage their accounts with secure authentication.

---

## Features

- User authentication (signup, login, password reset with OTP)
- Sentiment analysis using HuggingFace's CardiffNLP RoBERTa model (downloaded automatically at startup)
- File and text upload for batch or single sentiment analysis
- **API extraction:** Provide an API endpoint, extract data, and perform sentiment analysis on the fetched data
- Interactive data visualization (charts, dashboards)
- Modern React frontend
- Dockerized for easy deployment
- **Smart model caching:** Models are cached in Docker volumes for faster subsequent startups

---

## Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Backend:** Python, Flask, HuggingFace Transformers
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Other:** Nginx (for frontend static serving in production)

---

## Project Structure

```
Sentiment-Analysis/
  ├── Backend/
  │   ├── Service/      # Sentiment analysis API
  │   └── User/         # User authentication API
  ├── Frontend/         # React app
  ├── docker-compose.yml
  ├── docker-compose.dev.yml
  └── README.md
```

---

## Setup Instructions

### Prerequisites

- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)
- (For local dev without Docker) Node.js (v16+), Python 3.8+, pip

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Sentiment-Analysis.git
cd Sentiment-Analysis
```

---

### 2. Environment Variables

Create `.env` files as needed for backend and frontend.  
**Backend example (`Backend/Service/.env`):**
```
MONGO_URI=mongodb://mongo:27017/sentiment
SECRET_KEY=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
**Backend User example (`Backend/User/.env`):**
```
MONGO_URI=mongodb://mongo:27017/sentiment
SECRET_KEY=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
**Frontend example (`Frontend/.env`):**
```
REACT_APP_API_URL=http://localhost:5000
```

---

### 3. Running the Application

#### **Production Mode (Recommended for deployment/testing production build):**

```bash
docker-compose up --build
```
- **Frontend:** [http://localhost:3000](http://localhost:3000) (served by nginx)
- **Backend User:** [http://localhost:4001](http://localhost:4001)
- **Backend Service:** [http://localhost:4002](http://localhost:4002)

**Note:** On first run, the sentiment analysis model (~500MB) will be downloaded from HuggingFace. This may take 2-5 minutes depending on your internet connection. Subsequent runs will be much faster as the model is cached.

#### **Development Mode (Live reload, dev servers):**

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
- **Frontend:** [http://localhost:3000](http://localhost:3000) (React dev server)
- **Backend User:** [http://localhost:4001](http://localhost:4001) (Flask dev server)
- **Backend Service:** [http://localhost:4002](http://localhost:4002) (Flask dev server)

**Key differences:**
- In dev mode, code changes are reflected instantly (hot reload) due to mounted volumes and dev server commands.
- In prod mode, you must rebuild the images to see code changes.
- Both modes use the same `.env` files and service dependencies (`depends_on`).
- Model caching works in both modes for faster startup times.

---

## API Endpoints

### User Authentication

- `POST /signup` — Register new user
- `POST /login` — Login
- `POST /forgetpassword` — Request password reset (sends OTP)
- `POST /verifyuser` — Verify OTP
- `POST /resetpassword` — Reset password

### Sentiment Analysis

- `POST /process_text` — Analyze sentiment of provided text
- `POST /process_file` — Analyze sentiment of uploaded file
- `GET /reviews` — Get all reviews (example endpoint)

### API Extraction & Sentiment Analysis

- `POST /getApi` — Extract data from a user-provided API endpoint and perform sentiment analysis
  - **Headers:**
    - `authToken`: User authentication token (required)
  - **Payload:**
    ```json
    {
      "endPoint": "https://example.com/api/data"
    }
    ```
  - **How it works:**
    - The backend fetches the data from the provided `endPoint` (expects a JSON response with a `data` field containing key-value pairs of text).
    - Performs sentiment analysis on the extracted data.
    - Returns the sentiment counts (positive, negative, neutral).
  - **Example Response:**
    ```json
    {
      "code": 200,
      "message": "Endpoint saved",
      "data": {
        "positive": 3,
        "negative": 1,
        "neutral": 2
      },
      "error": "",
      "token": ""
    }
    ```
  - **Note:** The target API must return a JSON object with a `data` field containing the texts to analyze.

---

## Docker & Deployment

- All services are orchestrated via `docker-compose.yml` (production) and `docker-compose.dev.yml` (development override).
- For production, ensure you set secure environment variables and configure Nginx as needed.
- For development, use the override file for live reload and dev servers.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

## Contact

For questions or support, open an issue or contact [puspharajpandey@gmail.com](mailto:puspharajpandey@gmail.com).