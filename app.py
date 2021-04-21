from application import app, PORT
import waitress

if __name__ == "__main__":
    print(f'Serving app on PORT: {PORT}')
    waitress.serve(app, listen=f"0.0.0.0:{PORT}")