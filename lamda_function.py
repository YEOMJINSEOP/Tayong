import sys
import logging
import pymysql
import config
import json

connection=pymysql.connect(host=config.db_host,port=3306)
user=config.aws_db['user']
passwd=config.aws_db['password']
db=config.aws_db['database']

def lambda_handler(evenr,context):
    cursor = connection.cursor()
    cursor.execute("select * from Transactions")

    rows=cursor.fetchall()

    for row in rows:
        print("{0} {1} {2}".format(row[0],row[1],row[2]))
        