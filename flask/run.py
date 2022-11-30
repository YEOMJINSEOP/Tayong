#run.py
import sys
import config
import logging
import pymysql
import dbinfo
import json
from flask_cors import CORS,cross_origin

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
    


def db_location(): 
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select * from Location_table;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]}  ")
            
        results = [{
            'id' : row,
            'name' : row[0]
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

def db_meeting(): 
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select * from Meeting;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]} {row[6]} {row[7]} ")
            
        results = [{
            'id' : row[0],
            'userId' : row[1],
            'departure' : row[5],
            'arrival' : row[4],
            'recruitment' : row[6],
            'remainingTime' : row[3],
            'transport' : "택시"
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

def db_meetdetail(): 
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select * from Meeting;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]} {row[6]} {row[7]}{row[8]} ")
            
        results = [{
            'id' : row[0],
            'userId' : row[1],
            'departure' : row[5],
            'arrival' : row[4],
            'recruitment' : row[6],
            'remainingTime' : row[3],
            'transport' : "택시",
            'title':row[7],
            'content':row[8]

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


def handle_post():
    connection = create_connection()
    try:
        cursor=connection.cursor()
        params = json.loads(request.get_data(), encoding='utf-8')
        if len(params) == 0:
            return 'No parameter'
        #params_str=params['arrival']

        
        sql_sentence="insert into Meeting values (7,\"j2u3n4\",\"0\",\"{}\",\"{}\",\"{}\",{},\"{}\",\"{}\");".format(params['remainingTime'],params['arrival'],params['departure'],params['recruitment'],params['title'],params['content'])
        # 글번호(primary key라서 중복되면 안됨), 아이디("실제 user테이블에 있는 id여야함 "), 시작시간, 끝나는시간, 도착지,사람수(숫자여야함),제목,글내용
        #sql_location="insert into Location_table values (\"{}\",\"{}\");".format('청와대','일본') #OK

        cursor.execute(sql_sentence)
        connection.commit( )
        #params_str =''
        # for key in params.keys():
        #     params_str += '{}:{} \n'.format(key,params[key])
        return sql_sentence
    finally:
        
        cursor.close()









def db_write():
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("insert into Location_table values (\"Seoul\");") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        
        for row in rows:
            print(f"{row[0]}")
            
        results = [{
            
            'name' : row[0]

        }for row in rows]
        
        return {
        
        'body': json.dumps(results)
        }
    finally:
        cursor.close()

app = Flask(__name__, static_url_path='')



@app.route('/', methods=['GET'])
def index(): 
     return db_write()


@app.route('/getlocation',methods=['GET'])
def index9():
     return db_location()

@app.route('/getmeeting', methods=['GET'])
def index10():
     return db_meeting()

@app.route('/getmeetdetail', methods=['GET'])
def index11():
     return db_meetdetail()

@app.route('/postform',methods = [ 'GET','POST'])
def index12():
     return handle_post()

if __name__ == '__main__':
 if len(sys.argv) > 1:
     app.debug = True
     app.jinja_env.auto_reload = True
     app.config['TEMPLATES_AUTO_RELOAD'] = True
     app.run(host='0.0.0.0', port=4000)
     create_app().run()
 else:
     app.run(host='0.0.0.0')
