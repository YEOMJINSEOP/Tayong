#from msilib import Table


aws_db = {
    "user": "{admin}",
    "password": "{answnsrl}",
    "host": "{tayong.crdccaacc4cs.ap-northeast-2.rds.amazonaws.com}",
    "port": "3306", # Maria DB의 포트
    "database": "{tayong}",
}

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{aws_db['user']}:{aws_db['password']}@{aws_db['host']}:{aws_db['port']}/{aws_db['database']}?charset=utf8"
