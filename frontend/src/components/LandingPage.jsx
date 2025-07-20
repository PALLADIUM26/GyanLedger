import React from 'react';
import './LandingPage.css';

export default function LandingPage({ onLoginClick, onRegisterClick }) {
  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <header className="landing-container">
        <h1>📘 GyanLedger</h1>
        <p>Manage your tuition center effortlessly - track students, collect fees, and view insights!</p>
        
        {/* CTA Buttons */}
        <div className="button-group">
          <button onClick={onLoginClick}>Login</button>
          <button onClick={onRegisterClick}>Get Started</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📋 Student Records</h3>
            <p>Add, edit, and manage all your students in one place.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Fee Tracking</h3>
            <p>Record payments, view pending fees, and send reminders.</p>
          </div>
          <div className="feature-card">
            <h3>📈 Insights & Reports</h3>
            <p>View monthly summaries and download performance reports.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} GyanLedger. Made with ❤️ by Tech Comrades.</p>
      </footer>
      
    </div>
  );
}
