#run.py
import sys
import config

from flask import Flask, redirect, request, jsonify, url_for, render_template
from db_connect import db

def create_app(test_config=None):
    app = Flask(__name__)

		# Config 설정
    if test_config is None:
        app.config.from_object(config)
    else:
        app.config.update(test_config)
		
    db.init_app(app)




app = Flask(__name__, static_url_path='')


@app.route('/test', methods=['GET'])
def index():
     
     return '7시간을 투자해 만들어낸 소중한 페이지...'

@app.route('/', methods=['GET'])
def index1():
     return 'asdjdsdas'



if __name__ == '__main__':
 if len(sys.argv) > 1:
     app.debug = True
     app.jinja_env.auto_reload = True
     app.config['TEMPLATES_AUTO_RELOAD'] = True
     app.run(host='0.0.0.0', port=4000)
     create_app().run()
 else:
     app.run(host='0.0.0.0')
