from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
import sqlite3
from flask_pymongo import PyMongo
from bson import ObjectId
import os
import uuid


app = Flask(__name__)
app.secret_key = 'secret_key'
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])  # 클라이언트 주소 추가

app.config["MONGO_URI_POSTDATA"] = "mongodb://localhost:27017/postdata"
mongo_postdata = PyMongo(app, uri="mongodb://localhost:27017/postdata")


DATABASE = 'users.db'
current_username = None  # 초기값을 None으로 설정

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


def save_file(file):
    # 파일 확장자를 포함하여 고유한 파일명 생성
    ext = file.filename.split('.')[-1] if '.' in file.filename else ''
    unique_filename = f"{uuid.uuid4().hex}.{ext}" if ext else uuid.uuid4().hex
    file_path = os.path.join('uploads', unique_filename)

    # 디렉토리가 존재하지 않으면 생성
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    file.save(file_path)
    return unique_filename

def get_username_by_userid(userID):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT username FROM users WHERE userID = ?', (userID,))
    result = cursor.fetchone()
    conn.close()
    if result:
        return result['username']
    else:
        return None

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
        return jsonify({'message': '이미 존재하는 ID입니다'}), 409
    if existing_username:
        return jsonify({'message': '이미 존재하는 사용자명입니다'}), 410    

    conn.execute('INSERT INTO users (username, userID, password) VALUES (?, ?, ?)', (username, userID, password))
    conn.commit()
    conn.close()

    return jsonify({'message': '사용자가 성공적으로 생성되었습니다'}), 201

@app.route('/login', methods=['POST'])
def login():
    global current_username  # 전역 변수 수정할 때 필요
    data = request.json
    userID = data.get('userID')
    password = data.get('password')

    if not userID or not password:
        return jsonify({'message': '아이디 또는 비밀번호가 누락되었습니다'}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE userID=?', (userID,)).fetchone()
    conn.close()

    if user and user['password'] == password:
        username = get_username_by_userid(userID)
        current_username = username  # 전역 변수에 저장
        print(f'f{current_username}')
        return jsonify({'message': '로그인 성공', 'username': username}), 200
    else:
        return jsonify({'message': '아이디 또는 비밀번호가 잘못되었습니다'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    global current_username  # 전역 변수 수정할 때 필요
    current_username = None  # 초기값으로 되돌림
    print(f'{current_username}')
    return jsonify({'message': '로그아웃 성공'}), 200

@app.route('/session', methods=['GET'])
def get_session():
    print(f'{current_username}')
    if current_username is None:
        return jsonify({'message': 'No user logged in'}), 401
    else:
        username = current_username
        return jsonify({'message': f'Hello {username}'}), 200
    
@app.route('/upload', methods=['POST'])
def upload_post():
    data = request.form
    files = request.files.getlist('files')
    
    # 모든 필드가 제대로 입력되었는지 검증
    if not (data.get('username') and data.get('title') and data.get('tag') and data.get('description') and files):
        return jsonify({'message': 'All fields and files are required.'}), 400

    file_names = []
    for file in files:
        # 저장하고 고유 파일 이름을 리스트에 추가
        if file and allowed_file(file.filename):
            unique_filename = save_file(file)
            file_names.append(unique_filename)

    new_post = {
        'username': data.get('username'),
        'title': data.get('title'),
        'tag': data.get('tag'),
        'description': data.get('description'),
        'files': file_names
    }

    # DB에 저장 (postdata 데이터베이스)
    result = mongo_postdata.db.posts.insert_one(new_post)

    # 생성된 문서의 ID를 반환
    return jsonify({'message': 'Post uploaded successfully!', 'post_id': str(result.inserted_id)}), 200

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}


@app.route('/api/posts', methods=['GET'])
def get_posts():
    limit = int(request.args.get('limit', 10))
    offset = int(request.args.get('offset', 0))
    tag = request.args.get('tag', None)

    query = {}
    if tag:
        query['tag'] = {'$regex': tag, '$options': 'i'}  # 태그에 검색어가 포함되는지 확인

    posts = mongo_postdata.db.posts.find(query).skip(offset).limit(limit)
    result = []
    for post in posts:
        post['_id'] = str(post['_id'])
        result.append(post)
    return jsonify(result), 200


@app.route('/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    post = mongo_postdata.db.posts.find_one({'_id': ObjectId(post_id)})
    if post:
        return jsonify({
            'username': post['username'],
            'title': post['title'],
            'tag': post['tag'],
            'description': post['description'],
            'files': post['files']
        }), 200
    else:
        return jsonify({'message': 'Post not found'}), 404
    
@app.route('/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.form
    files = request.files.getlist('files')

    update_fields = {}
    if data.get('username'):
        update_fields['username'] = data.get('username')
    if data.get('title'):
        update_fields['title'] = data.get('title')
    if data.get('tag'):
        update_fields['tag'] = data.get('tag')
    if data.get('description'):
        update_fields['description'] = data.get('description')
    if files:
        file_names = []
        for file in files:
            if file and allowed_file(file.filename):
                unique_filename = save_file(file)
                file_names.append(unique_filename)
        update_fields['files'] = file_names

    result = mongo_postdata.db.posts.update_one({'_id': ObjectId(post_id)}, {'$set': update_fields})

    if result.modified_count > 0:
        return jsonify({'message': 'Post updated successfully!'}), 200
    else:
        return jsonify({'message': 'No changes made to the post.'}), 400

@app.route('/uploads/<filename>')
def get_file(filename):
    return send_from_directory('uploads', filename)

@app.route('/usernames', methods=['GET'])
def get_usernames():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT username FROM users')
    usernames = cursor.fetchall()
    conn.close()

    username_list = [user['username'] for user in usernames]
    return jsonify(username_list), 200

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
