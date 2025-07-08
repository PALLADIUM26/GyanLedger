import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h2>🏠 Welcome to GyanLedger</h2>
      <p>Select an option:</p>
      <ul>
        <li><Link to="/students">📚 Manage Students</Link></li>
        <li><Link to="/payments">💰 Manage Payments</Link></li>
      </ul>
    </div>
  )
}
