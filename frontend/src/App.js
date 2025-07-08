import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import StudentList from './components/StudentList.jsx'
import PaymentList from './components/PaymentList.jsx'
import HomePage from './components/HomePage'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = (receivedToken) => {
    setToken(receivedToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <Router>
      <div className="App">
        <h1>🎓 GyanLedger - Tuition Manager</h1>

        {!token ? (
          <>
            {showRegister ? (
              <>
                <RegisterForm onLogin={handleLogin} />
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setShowRegister(false)}>Login</button>
                </p>
              </>
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                <p>
                  New user?{' '}
                  <button onClick={() => setShowRegister(true)}>Register</button>
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <nav>
              <Link to="/home">🏠 Home</Link> |{' '}
              <Link to="/students">👨‍🎓 Students</Link> |{' '}
              <Link to="/payments">💸 Payments</Link> |{' '}
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/students" element={<StudentList token={token} />} />
              <Route path="/payments" element={<PaymentList token={token} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  )
}

export default App;
