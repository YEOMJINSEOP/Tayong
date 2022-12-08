#run.py
import sys
import config
import logging
import pymysql
import dbinfo
import json
# from Flask_Cors import CORS,cross_origin

from flask import Flask, flash, redirect, request, jsonify, url_for, render_template, session, logging
from db_connect import db
from forms import RegisterForm

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

loginVal='0'
nowId='0'
    

def showparticipate():
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select * from Meetparticipate2;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]}")
            
        results = [{

            'id': row[0],
            'randomKey':row[1]
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

def deleteparticipate():
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("delete from Meetparticipate2;") # SQL 문장을 DB 서버에 보냄
        connection.commit()

   
        

        return {
        
        'statusCode': 200,
        'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': '*',
            "isBase64Encoded": False
        }
    finally:
        cursor.close()


def db_meeting(): 
    connection = create_connection()
    
    try:
        cursor=connection.cursor()
        cursor.execute("select * from Meetings2;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]} {row[6]} {row[7]} {row[8]} ")
            
        results = [{
            'remainingTime' : row[0],
            'arrival' : row[1],
            'departure' : row[2],
            'recruitment' : row[3],
            'title' : row[4],
            'content' : row[5],
            'transport' : row[6],
            'id': row[7],
            'randomKey':row[8]
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
        cursor.execute("select * from Meetings2;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]} {row[6]} {row[7]} {row[8]}")
            
        results = [{
            'remainingTime' : row[0],
            'arrival' : row[1],
            'departure' : row[2],
            'recruitment' : row[3],
            'title' : row[4],
            'content' : row[5],
            'transport' : row[6],
            'id': row[7],
            'randomKey':row[8]
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



app = Flask(__name__, static_url_path='')


def handle_post():
    connection = create_connection()
    try:
        cursor=connection.cursor()
        params = json.loads(request.get_data(), encoding='utf-8')
        if len(params) == 0:
            return 'No parameter'
        #params_str=params['arrival']

        
        sql_sentence="insert into Meetings2 values (\"{}\",\"{}\",\"{}\",{},\"{}\",\"{}\",\"{}\",\"{}\",\"{}\");".format(params['remainingTime'],params['arrival'],params['departure'],params['recruitment'],params['title'],params['content'],params['transport'],nowId,params['randomKey'])
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

def getparticipate(): #참여하기 버튼
    connection = create_connection()
    try:
        cursor=connection.cursor()
        params = json.loads(request.get_data(), encoding='utf-8')
        if len(params) == 0:
            return 'No parameter'
        #params_str=params['arrival']

        sql_sentence="insert into Meetparticipate2 values (\"{}\",\"{}\");".format(params['loginId'],params['randomKey'])
        # Pk를 Id에, 모임정보에 randomKey값을,
        cursor.execute(sql_sentence)
        connection.commit( )
        #params_str =''
        # for key in params.keys():
        #     params_str += '{}:{} \n'.format(key,params[key])
        return sql_sentence
    finally:
        cursor.close()
        
def sendparticipate(): #현재 참여자 보내기
    connection = create_connection()
    try:
        cursor=connection.cursor()
        cursor.execute("select * from Meetparticipate2 ;") # SQL 문장을 DB 서버에 보냄
        rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용
        for row in rows:
            print(f"{row[0]} {row[1]} ")
            
        results = [{
            'Id' : row[0],
            'randomKey' : row[1],
  
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
    
        
def exitparticipate():  #모임 나가기 버튼
    connection = create_connection()
    try:
        cursor=connection.cursor()
        params = json.loads(request.get_data(), encoding='utf-8')
        if len(params) == 0:
            return 'No parameter'

        sql_sentence="delete from Meetparticipate2 where Id = \"{}\");".format(params['loginId'])     
        cursor.execute(sql_sentence)
        connection.commit( )
        return sql_sentence
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


# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    connection = create_connection()
    global loginVal
    global nowId
    loginVal='0'
    nowId='0'
    try: 
        cursor=connection.cursor()
        params = json.loads(request.get_data(), encoding='utf-8')
        if len(params) == 0:
            return 'No parameter'
        cursor.execute("SELECT * FROM new_user WHERE email = \"{}\"".format(params['email']))
        ##cursor.execute("SELECT * FROM new_user")
        rows = cursor.fetchall()
        for row in rows:
            print(f"{row[0]}  ")
        
 
        results = [{
            'email' : row[0],
            'password' : row[1]
        }for row in rows]

        if results[0]['email']==params['email']: #아이디가 같으면
            #비밀번호 맞는지 구현
            if results[0]['password']==params['password']: 
                loginVal=1
                nowId=results[0]['email']
                return "로그인 성공"
            else:
                loginVal=0
                return "비번 틀림"
        else: #아이디가 없으면
            loginVal=0
            return "아이디 없음"
        # cmd = "SELECT * FROM new_user WHERE \"email\" = \"{}\"".format(params['email'])
        # result=cursor.execute(cmd)
        #result1=cursor.fetchall()
        #connection.commit() #여기????
        # Get user by username
        # SAFE TRANSACTION
        # result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        # if result >= 0: 
        #     # Get stored hash
        #     data = cursor.fetchone()
        #     password = params['password']
        #     return password
        #     # Compare Passwords
        #     # if sha256_crypt.verify(password_candidate, password): #로그인 성공
        #     #     # Passed
        #     #     session['logged_in'] = True
        #     #     session['email'] = params['email']

        #     #     return "good"
        #     # else:                                        #로그인 실패
        #     #     error = 'Invalid login'
        #     #     return error
        # else:
        #     error = 'Username not found'
        #     return error
    

    finally:
        cursor.close()


@app.route('/loginValue', methods=['GET'])
def loginValue():
   
    if loginVal==1:
        result={"loginSuccess":"1",
                "loginId":"%s"%(nowId)}
        return result
    else:
        result={"loginSuccess":"0",
                "loginId":'0'}
        return result


# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    connection = create_connection()
    try:
        cursor=connection.cursor()
        params = json.loads(request.get_data(), encoding='utf-8')
        
        if len(params) == 0:
            return 'No parameter'

        sql_sentence="insert into new_user values (\"{}\",\"{}\",\"{}\");".format(params['email'],params['password'],params['nickname'])
        cursor.execute(sql_sentence)
        connection.commit( )
        return sql_sentence

    finally:
        cursor.close()




# Check if user logged in

@app.route('/', methods=['GET'])
def index22(): 
     return "f"


@app.route('/getlocation',methods=['GET'])
def index9():
     return db_location()

@app.route('/getmeeting', methods=['GET'])
def index10():
     return db_meeting()

@app.route('/getmeetdetail', methods=['GET'])
def index11():
     return db_meetdetail()
@app.route('/deleteparticipate', methods=['GET','POST'])
def index26():   
     return deleteparticipate()
 
@app.route('/participate', methods=['GET','POST'])
def index23():
     return getparticipate()
 
@app.route('/showparticipate', methods=['GET','POST'])
def index27():
     return showparticipate()
 
@app.route('/exitparticipate', methods=['GET','POST'])
def index55():
     return exitparticipate()
 
@app.route('/sendparticipate', methods=['GET','POST'])
def index56():
     return sendparticipate()
 
@app.route('/postform',methods = [ 'GET','POST'])
def index12():
     return handle_post()

@app.route('/delete',methods = [ 'GET'])
def delete():
    connection = create_connection()
    try:
        cursor=connection.cursor()
        
        sql_sentence="delete from Meetings2;"
        cursor.execute(sql_sentence)
        connection.commit( )
        return sql_sentence

    finally:
        cursor.close()

if __name__ == '__main__':
 if len(sys.argv) > 1:
     app.debug = True
     app.jinja_env.auto_reload = True
     app.config['TEMPLATES_AUTO_RELOAD'] = True
     app.run(host='0.0.0.0', port=4000)
     create_app().run()
 else:
     app.run(host='0.0.0.0')
