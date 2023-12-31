import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContactsContextProvider } from './context/contactContext';
import { AuthContextProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
      <ContactsContextProvider>
        <App />
      </ContactsContextProvider> 
  </AuthContextProvider>
   
  </React.StrictMode>
);


