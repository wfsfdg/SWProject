from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app) 

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
                 password TEXT NOT NULL)''')
    conn.commit()
    conn.close()


create_user_table()



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': '아이디와 비밀번호를 입력해야 합니다'}), 400

    conn = get_db_connection()
    existing_user = conn.execute('SELECT * FROM users WHERE username=?', (username,)).fetchone()
    if existing_user:
        return jsonify({'message': '이미 존재하는 사용자입니다'}), 409

    conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
    conn.commit()
    conn.close()

    return jsonify({'message': '사용자가 성공적으로 생성되었습니다'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': '아이디 또는 비밀번호가 누락되었습니다'}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username=?', (username,)).fetchone()
    conn.close()

    if user and user['password'] == password:
        return jsonify({'message': '로그인 성공'}), 200
    else:
        return jsonify({'message': '아이디 또는 비밀번호가 잘못되었습니다'}), 401

if __name__ == '__main__':
  
    app.run(debug=True, host='localhost', port=5000)
