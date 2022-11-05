#run.py
import sys
import config
import logging
import pymysql
import dbinfo
import json
from flask_cors import CORS

from flask import Flask, redirect, request, jsonify, url_for, render_template
from db_connect import db

def create_app(test_config=None):
    app = Flask(__name__)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    api = Api(app)
		# Config 설정
    if test_config is None:
        app.config.from_object(config)
    else:
        app.config.update(test_config)
		
    db.init_app(app)

def create_connection():
    return pymysql.connect(
    host = dbinfo.db_host,
    user = dbinfo.db_username,
    passwd = dbinfo.db_password,
    db = dbinfo.db_name,
    port = dbinfo.db_port
    )

def lambda_handler(event, context):
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select * from User;") # SQL 문장을 DB 서버에 보냄

        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용

        for row in rows:
            print(f"{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]} {row[6]} {row[7]} ")
            
        results = [{
            'name' : row[0],
            'nickname' : row[1],
            'passwd' : (row[2]),
            'birthdate' : (row[3]),
            'email' : (row[4]),
            'phoneno' : (row[5]),
            'profile url' : (row[6]),
            'id' : (row[7]),
        }for row in rows]
        return {
        'statusCode': 200,
        'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(results),
            "isBase64Encoded": False
        }
    finally:
        cursor.close()
    

def db_fetch():
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select M_Starting_point, M_Destination from Meeting;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]} ")
            
        results = [{
            'departure' : row[0],
            'arrival' : row[1]
        }for row in rows]
        

        return {
        
        'body': json.dumps(results)
        }
    finally:
        cursor.close()


app = Flask(__name__, static_url_path='')



@app.route('/', methods=['GET'])
def index():
     return '가장 처음 뜨는 화면입니다. 타용에 대한 설명이 나옵니다.'

@app.route('/login', methods=['GET'])
def index1():
     return '로그인 페이지 입니다.'

@app.route('/signin', methods=['GET'])
def index2():
     return '회원가입을 하는 페이지 입니다.'

@app.route('/signinsuccess', methods=['GET'])
def index3():
     return '회원가입을 완료하고 축하하는 페이지 입니다.'

@app.route('/mypage', methods=['GET'])
def index4():
     return '내 정보를 볼 수 있는 페이지 입니다.'

@app.route('/chatlist', methods=['GET'])
def index5():
     return '채팅방 리스트를 볼 수 있는 페이지 입니다.'

@app.route('/chat', methods=['GET'])
def index6():
     return db_fetch()

@app.route('/main', methods=['GET'])
def index7():
     return '메인 홈페이지 입니다. 위치를 지정할 수 있습니다.'

@app.route('/list')
def index8():
     return db_fetch()

@app.route('/addmeeting')
def index9():
     return '새로운 모임 모집글을 작성하는 페이지 입니다. '

@app.route('/detail', methods=['GET'])
def index10():
     return '하나의 모임 모집글에 대한 자세한 설명이 뜨는 페이지 입니다.'

@app.route('/mypage', methods=['GET'])
def index11():
     return '마이 페이지 입니다.'


if __name__ == '__main__':
 if len(sys.argv) > 1:
     app.debug = True
     app.jinja_env.auto_reload = True
     app.config['TEMPLATES_AUTO_RELOAD'] = True
     app.run(host='0.0.0.0', port=4000)
     create_app().run()
 else:
     app.run(host='0.0.0.0')