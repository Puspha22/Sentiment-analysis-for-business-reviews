import os
from user import app

if __name__ == "__main__":
    debug = os.getenv("DEBUG", "False") == "True"
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    print(f"Starting User app on {host}:{port} (debug={debug})")
    app.run(debug=debug, host=host, port=port)
