import logging
import os
import re
import json

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from rq import Queue

from worker import conn
from .routes import bp as routes

q = Queue(connection=conn, default_timeout=600)


def create_app():
    """
    Set up the basics of the API and some fundamental routes.
    """
    BASE_URL = "/demystify"
    app = Flask(
        __name__,
        static_folder="../../client/build",
        static_url_path=BASE_URL + "/",
    )

    CORS(app)
    app.url_map.strict_slashes = False

    logging.basicConfig(level=logging.DEBUG)
    app.register_blueprint(routes, url_prefix=BASE_URL + "/api")

    @app.route(BASE_URL + "/")
    def index():
        """
        /
        Serve the compiled react frontend as static pages.
        """
        return send_from_directory("../../client/build", "index.html")

    @app.route(BASE_URL + "/examples")
    def get_all_examples():
        """
        /examples
        List the names (without extension) of all the JSON files in the
        ./examples folder.
        """
        example_files = os.listdir("./examples")
        examples_names = list(map(lambda s: s[0:-5], example_files))
        return jsonify(examples_names)

    @app.route(BASE_URL + "/examples/<string:example_name>")
    def get_examples(example_name):
        """
        /examples/<name>
        Return the content of a particular example.
        """
        example_name = re.sub(r"[\W_]+", "", example_name)
        example_file = open("./examples/" + example_name + ".json", mode="r")
        example_string = example_file.read()
        example_file.close()
        example_data = json.loads(example_string)
        return jsonify(example_data)

    return app
