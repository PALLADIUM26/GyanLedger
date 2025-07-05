import React, { useState } from 'react'
import axios from 'axios'

const LOGIN_API = 'http://localhost:8000/api-token-auth/'

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_API, formData)
      const token = response.data.token
      localStorage.setItem('token', token)  // 🔐 Save token in localStorage
      onLogin(token)  // 👈 Notify parent component
    } catch (err) {
      setError('Invalid credentials!')
    }
  }

  return (
    <div>
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
