import sys
import logging
import pymysql
import dbinfo
import json

connection = pymysql.connect(
    host = dbinfo.db_host,
    user = dbinfo.db_username,
    passwd = dbinfo.db_password,
    db = dbinfo.db_name,
    port = dbinfo.db_port
    ) # db 접근 하기 위한 정보 
    
def lambda_handler(event, context):
    cursor = connection.cursor() # DB에 접속 및 DB 객체를 가져옴
    cursor.execute("select * from ips;") # SQL 문장을 DB 서버에 보냄

    rows = cursor.fetchall() # 데이터를 DB로부터 가져온 후, Fetch 된 데이터를 사용

    for row in rows:
        print(f"{row[0]} {row[1]} {row[2]} {row[3]}")
        
    results = [{
        'ip' : row[0],
        'created_at' : row[1],
        'updated_at' : str(row[2])
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