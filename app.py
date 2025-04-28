from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('index.html', page_number=-1)

@app.route('/<int:page>')
def permalink(page):
    return render_template('index.html', page_number=(page-1))

if __name__ == '__main__':
    app.run(host='localhost', port=2000)
