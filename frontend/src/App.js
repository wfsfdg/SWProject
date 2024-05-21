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
  const showPopup = () => {
    const popup = window.open("", "Popup", "width=300,height=200");
    popup.document.write(`
      <html>
      <head>
        <title>Popup</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
          button { margin-top: 20px; padding: 10px 20px; }
        </style>
      </head>
      <body>
        <p>${message}</p>
        <button onclick="window.close()">Close</button>
      </body>
      </html>
    `);
  };//메시지창 팝업전용
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const signup = async () => {
    try {
      if (!SignupUsername || !SignupPassword) {
        alert('Username and password are required');
        return;
      }
      const response = await axios.post('http://localhost:5000/signup', { username: SignupUsername, password: SignupPassword });
      if (response.status === 201) {
        alert('User created successfully');
        console.log(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Username already exists');
      } 
      else {
        alert('Signup error');
        console.log(error.response);
      }
    }
  };
  

  const login = async () => {
    try {
      if(!LoginPassword||!LoginUsername)
        {
          alert('Username and password are required');
          return;
        }
      const response = await axios.post('http://localhost:5000/login', { username: LoginUsername, password: LoginPassword });
      if (response.status === 200) {
        alert('Login successful');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Login error');
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

    </div>
  );
}

export default App;
