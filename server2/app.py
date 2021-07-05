import logging
import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from rq import Queue

from worker import conn
from routes import bp as routes

BASE_URL = "/demystify"
app = Flask(__name__, static_folder='../client/build', static_url_path=BASE_URL)
CORS(app)

q = Queue(connection=conn)

logging.basicConfig(level=logging.DEBUG)
app.register_blueprint(routes, url_prefix=BASE_URL+"/api")

@app.route(BASE_URL + "/")
def index():
    return app.send_static_file('index.html')

@app.route(BASE_URL + "/examples")
def get_all_examples():
    example_files = os.listdir("./examples")
    examples_names = list(map(lambda s: s[0:-5], example_files))
    return jsonify(examples_names)

if __name__ == "__main__":      
    app.run()                     