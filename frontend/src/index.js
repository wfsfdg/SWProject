import React from 'react';
import ReactDOM from 'react-dom/client'; // 반드시 'react-dom/client'에서 import 해야 합니다
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
