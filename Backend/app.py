from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
app.secret_key = 'secret_key' 
CORS(app,supports_credentials=True) 

DATABASE = 'users.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def create_user_table():
    conn = get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                 username TEXT NOT NULL,
                 userID TEXT NOT NULL, 
                 password TEXT NOT NULL)''')
    conn.commit()
    conn.close()


create_user_table()



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    userID = data.get('userID')
    password = data.get('password')

    if not username or not password or not userID:
        return jsonify({'message': '모든 내용을 입력해야 합니다'}), 400

    conn = get_db_connection()
    existing_username = conn.execute('SELECT * FROM users WHERE username=?', (username,)).fetchone()
    existing_userID = conn.execute('SELECT * FROM users WHERE userID=?', (userID,)).fetchone()
    if existing_userID:
        return jsonify({'message': '이미 존재하는 사용자입니다'}), 409
    if existing_username:
        return jsonify({'message': '이미 존재하는 사용자입니다'}), 409    

    conn.execute('INSERT INTO users (username, userID, password) VALUES (?, ?, ?)', (username, userID, password))
    conn.commit()
    conn.close()

    return jsonify({'message': '사용자가 성공적으로 생성되었습니다'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    userID = data.get('userID')
    password = data.get('password')
    username = data.get('username')

    if not userID or not password:
        return jsonify({'message': '아이디 또는 비밀번호가 누락되었습니다'}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE userID=?', (userID,)).fetchone()
    conn.close()

    if user and user['password'] == password:
        session['username'] = user['username'] #username 킵
        return jsonify({'message': '로그인 성공'}), 200
    else:
        return jsonify({'message': '아이디 또는 비밀번호가 잘못되었습니다'}), 401

if __name__ == '__main__':
  
    app.run(debug=True, host='localhost', port=5000)
