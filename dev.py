from application import app, PORT

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port=PORT)