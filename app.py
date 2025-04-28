from flask import Flask, render_template
import json

app = Flask(__name__, static_folder='static', static_url_path='')
app.url_map.strict_slashes = False

@app.after_request
def add_cors_headers(response):
    # Headers needed for Godot projects
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response

# Homepage
@app.route('/')
def home():
    return render_template('player.html', page_number=0)

# Link to individual episode
@app.route('/<int:page>')
def permalink(page):
    return render_template('player.html', page_number=page)

# Level select
@app.route('/episodes')
def episode_list():
    episode_list = []
    i = 1
    found = True
    while (found):
        try:
            info = json.loads(open("static/episodes/" + str(i) + "/info.json", 'r').read())
            info["index"] = i
            if not "thumbnail" in info:
                info["thumbnail"] = "/episodes/" + str(i) + "/thumbnail.png"
            episode_list.append( info )
            i += 1

        except Exception as e:
            found = False
    
    return render_template('episodes.html', episode_list=episode_list)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
