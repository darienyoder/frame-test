from flask import Flask, render_template

app = Flask(__name__, static_folder='static', static_url_path='')

@app.after_request
def add_cors_headers(response):
    # Headers needed for Godot projects
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response

# Homepage
@app.route('/')
def home():
    return render_template('index.html', page_number=0)

# Link to individual episode
@app.route('/<int:page>')
def permalink(page):
    return render_template('index.html', page_number=page)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
