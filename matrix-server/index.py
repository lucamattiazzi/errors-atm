from flask import Flask, request, render_template
from lib import write_word, clean_all


app = Flask(__name__, static_url_path='')

is_writing = False

@app.route('/', methods=["POST"])
def post_text():
    global is_writing
    if is_writing:
        return "busy"
    content = request.json
    text = content["text"]
    color = content["color"]
    is_writing = True
    clean_all()
    write_word(text, color)
    clean_all()
    is_writing = False
    return "done"


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
