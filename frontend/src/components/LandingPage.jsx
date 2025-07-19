import React from 'react';
import './LandingPage.css';

export default function LandingPage({ onLoginClick, onRegisterClick }) {
  return (
    <div className="landing-container">
      <h1>📘 GyanLedger</h1>
      <p>Manage your tuition center effortlessly – track students, collect fees, and view insights!</p>
      
      <div className="button-group">
        <button onClick={onLoginClick}>Login</button>
        <button onClick={onRegisterClick}>Get Started</button>
      </div>
    </div>
  );
}
