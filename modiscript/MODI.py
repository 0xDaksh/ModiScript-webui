#!/usr/bin/env python3

import os
import sys

from lexer import Lexer
from parser import Parser
from utils import ErrorHandler, FNF, usage
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys, io

DEBUG = False

app = Flask(__name__, static_url_path="/static")

CORS(app, resources={r"/*": {"origins": "*"}})

def compile_file(value, valueType="filename"):
    global DEBUG
    lex_out = Lexer(value, valueType).analyze()
    parse_out = Parser(lex_out).parse()
    return compile(parse_out, "<ast>", "exec")


def execute(ostdout, value, valueType="filename"):
    sys.stdout = io.StringIO()
    ast_module = compile_file(value, valueType)
    exec(ast_module)
    out = sys.stdout.getvalue()
    sys.stdout = ostdout
    return out

@app.route('/', methods=["GET"])
def index():
    return app.send_static_file("index.html")

@app.route('/', methods=["POST"])
def run_modi_script():
    ostdout = sys.stdout
    body = request.get_json(silent=True)
    code = body.get("code")

    if not code:
        return jsonify({ "error": "Code isn't provided." }), 402

    try:
        return jsonify({ "out": execute(ostdout, code, "code") }), 200
    except ErrorHandler as e:
        return jsonify({ "error": str(e) }), 402
