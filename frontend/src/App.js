// src/App.js
import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import StudentList from './components/StudentList.jsx'
import PaymentList from './components/PaymentList.jsx'
console.log(PaymentList)

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (receivedToken) => {
    setToken(receivedToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="App">
      <h1>🎓 GyanLedger - Tuition Manager</h1>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <StudentList token={token} />
          <hr />
          <PaymentList token={token} />
        </>
      )}
    </div>
  )
}


export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
