from flask import Flask, render_template,session,redirect,url_for
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.secret_key = "pswd"

socket_io = SocketIO(app)



@app.route('/chat')
def chatting():
    return render_template('index.html')

@socket_io.on("message")
def request(message):
    print("message : " + message)
    to_client = dict()
    if message == 'new_connect':
        to_client['message'] = "welcome tester"
        to_client['type'] = 'connect'
    else:
        to_client['message'] = message
        to_client['type'] = 'normal'
    send(to_client, broadcast = True)

if __name__ == '__main__':
    socket_io.run(app, host='0.0.0.0', port=5000, debug=True)