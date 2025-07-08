import os
from service import app

if __name__ == "__main__":
    debug = os.getenv("DEBUG", "False") == "True"
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    print(f"Starting Service app on {host}:{port} (debug={debug})")
    app.run(debug=debug, host=host, port=port)
