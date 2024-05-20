import React, { useState } from 'react';
import axios from 'axios';


function Popup({ message, onClose }) {
  return (
    <div className="popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}


function App() {
  const [SignupUsername, setSignupUsername] = useState('');
  const [SignupPassword, setSignupPassword] = useState('');
  const [LoginUsername, setLoginUsername] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const signup = async () => {
    try {
      if (!SignupUsername || !SignupPassword) {
        setMessage('Username and password are required');
        setIsPopupOpen(true);
        return;
      }
      const response = await axios.post('http://localhost:5000/signup', { username: SignupUsername, password: SignupPassword });
      if (response.status === 201) {
        setMessage('User created successfully');
        setIsPopupOpen(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Username already exists');
      } else {
        setMessage('Signup error');
      }
      setIsPopupOpen(true);
    }
  };
  

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username: LoginUsername, password: LoginPassword });
      if (response.status === 200) {
        setMessage('Login successful');
        setIsPopupOpen(true);
      } else {
        setMessage('Invalid username or password');
        setIsPopupOpen(true);
      }
    } catch (error) {
      setMessage('Login error');
      setIsPopupOpen(true);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input type="text" placeholder="Username" value={SignupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={SignupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
      <button onClick={signup}>Signup</button>

      <h1>Login</h1>
      <input type="text" placeholder="Username" value={LoginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      {isPopupOpen && <Popup message={message} onClose={closePopup} />} {/* 팝업 컴포넌트 조건적으로 렌더링 */}
    </div>
  );
}

export default App;
