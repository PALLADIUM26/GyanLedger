import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import StudentList from './components/StudentList.jsx'
import PaymentList from './components/PaymentList.jsx'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import DueList from './components/DueList'
import MonthlySummary from './components/MonthlySummary'
import ProfilePage from './components/ProfilePage'
import LandingPage from './components/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './App.css'


function AppWrapper(){
  return (
    <Router>
      <App />
    </Router>
  )
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  // const [showRegister, setShowRegister] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const navigate = useNavigate();
  // const location = useLocation();
  // const isLanding = location.pathname === '/';
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleLogin = (receivedToken) => {
    setToken(receivedToken)
    localStorage.setItem('token', receivedToken)
    setShowLoginModal(false)
    setShowRegisterModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged out successfully')
    navigate('/');
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.body.classList.add(storedTheme);
  }, []);
  
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.body.className = newTheme
    localStorage.setItem('theme', newTheme)
  }

  // return (
  //   <Router>
  //     <div className="App">
  //       <h1>🎓 GyanLedger - Tuition Manager</h1>

  //       {!token ? (
  //         <>
  //           {showRegister ? (
  //             <>
  //               <RegisterForm onLogin={handleLogin} />
  //               <p>
  //                 Already have an account?{' '}
  //                 <button onClick={() => setShowRegister(false)}>Login</button>
  //               </p>
  //             </>
  //           ) : (
  //             <>
  //               <LoginForm onLogin={handleLogin} />
  //               <p>
  //                 New user?{' '}
  //                 <button onClick={() => setShowRegister(true)}>Register</button>
  //               </p>
  //             </>
  //           )}
  //         </>
  //       ) : (
  //         <>
  //           <nav>
  //             <Link to="/home">🏠 Home</Link> |{' '}
  //             <Link to="/dashboard">🛹 Dashboard</Link> |{' '}
  //             <Link to="/students">👨‍🎓 Students</Link> |{' '}
  //             <Link to="/payments">💸 Payments</Link> |{' '}
  //             <Link to="/dues">🕒 Due Payments</Link> |{' '}
  //             <Link to="/summary">📊 Summary</Link> |{' '}
  //             <Link to="/profile">👤 Profile</Link> |{' '}
  //             <button onClick={handleLogout}>Logout</button>
  //           </nav>
  //           <Routes>
  //             {/* <Route path="/" element={<Navigate to="/home" />} /> */}
  //             <Route path="/" element={token ? <Navigate to="/dashboard" element={<Dashboard token={token} />} /> : <LandingPage />} />
  //             <Route path="/home" element={<HomePage />} />
  //             {/* <Route path="/home" element={<Dashboard token={token} />} /> */}
  //             <Route path="/dashboard" element={<Dashboard token={token} />} />
  //             <Route path="/students" element={<StudentList token={token} />} />
  //             <Route path="/payments" element={<PaymentList token={token} />} />
  //             <Route path="/dues" element={<DueList token={token} />} />
  //             <Route path="/summary" element={<MonthlySummary token={token} />} />
  //             <Route path="/profile" element={<ProfilePage token={token} />} />
  //           </Routes>
  //         </>
  //       )}
  //     </div>
  //   </Router>
  // )
  return (
    // <Router>
      <div className="App">
        {/* 🧭 Navigation for logged in users */}
        {token && (
          <nav className="navbar">
            <h1 className="navbar-title">🎓 GyanLedger - Tuition Manager</h1>
            <div className="nav-links">
              <Link to="/home">🏠 Home</Link> |{' '}
              <Link to="/dashboard">🛹 Dashboard</Link> |{' '}
              <Link to="/students">👨‍🎓 Students</Link> |{' '}
              <Link to="/payments">💸 Payments</Link> |{' '}
              <Link to="/dues">🕒 Due Payments</Link> |{' '}
              <Link to="/summary">📊 Summary</Link> |{' '}
              <Link to="/profile">👤 Profile</Link> |{' '}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        )}

        <ToastContainer
          position="top-right"
          autoClose={1000}
          closeOnClick
          pauseOnHover
        />

        {/* 🌐 Routes */}
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/dashboard" element={<Dashboard token={token} />} />
              ) : (
                <>
                  <LandingPage
                    onLoginClick={() => setShowLoginModal(true)}
                    onRegisterClick={() => setShowRegisterModal(true)}
                  />

                  {/* 👇 Login Modal */}
                  {showLoginModal && (
                    <div className="modal">
                      <div className="modal-content">
                        <span className="close" onClick={() => setShowLoginModal(false)}>&times;</span>
                        <LoginForm onLogin={handleLogin} />
                      </div>
                    </div>
                  )}

                  {/* 👇 Register Modal */}
                  {showRegisterModal && (
                    <div className="modal">
                      <div className="modal-content">
                        <span className="close" onClick={() => setShowRegisterModal(false)}>&times;</span>
                        <RegisterForm onLogin={handleLogin} />
                      </div>
                    </div>
                  )}
                </>
              )
            }
          />
          
          {/* 🧭 Protected Routes */}
          {token && (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard token={token} />} />
              <Route path="/students" element={<StudentList token={token} />} />
              <Route path="/payments" element={<PaymentList token={token} />} />
              <Route path="/dues" element={<DueList token={token} />} />
              <Route path="/summary" element={<MonthlySummary token={token} />} />
              {/* <Route path="/profile" element={<ProfilePage token={token} setToken={setToken} setTheme={setTheme} theme={theme} />} /> */}
              <Route path="/profile" element={<ProfilePage token={token} setToken={setToken} setTheme={toggleTheme} theme={theme} />} />
            </>
          )}
        </Routes>
      </div>
    // </Router>
  )
}

export default AppWrapper;
// export default App;
