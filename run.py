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


@app.route('/', methods=['GET'])
def index():
     
     return '가장 처음 뜨는 화면입니다. 타용에 대한 설명이 나옵니다.'

@app.route('/login', methods=['GET'])
def index1():
     return '로그인 페이지 입니다.'

@app.route('/signin', methods=['GET'])
def index1():
     return '회원가입을 하는 페이지 입니다.'

@app.route('/signinsuccess', methods=['GET'])
def index1():
     return '회원가입을 완료하고 축하하는 페이지 입니다.'

@app.route('/mypage', methods=['GET'])
def index1():
     return '내 정보를 볼 수 있는 페이지 입니다.'

@app.route('/chatlist', methods=['GET'])
def index1():
     return '채팅방 리스트를 볼 수 있는 페이지 입니다.'

@app.route('/chat', methods=['GET'])
def index1():
     return '채팅방입니다.'

@app.route('/main', methods=['GET'])
def index1():
     return '메인 홈페이지 입니다. 위치를 지정할 수 있습니다.'

@app.route('/list', methods=['GET'])
def index1():
     return '택시를 타려는 모임의 목록이 뜨는 페이지 입니다.'

@app.route('/addmeeting', methods=['GET'])
def index1():
     return '새로운 모임 모집글을 작성하는 페이지 입니다. '

@app.route('/detail', methods=['GET'])
def index1():
     return '하나의 모임 모집글에 대한 자세한 설명이 뜨는 페이지 입니다.'



if __name__ == '__main__':
 if len(sys.argv) > 1:
     app.debug = True
     app.jinja_env.auto_reload = True
     app.config['TEMPLATES_AUTO_RELOAD'] = True
     app.run(host='0.0.0.0', port=4000)
     create_app().run()
 else:
     app.run(host='0.0.0.0')
