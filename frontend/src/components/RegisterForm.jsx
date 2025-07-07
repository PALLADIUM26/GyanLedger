import React, { useState } from 'react'
import axios from 'axios'

const REGISTER_API = 'http://localhost:8000/api/register/'
const LOGIN_API = 'http://localhost:8000/api-token-auth/'

export default function RegisterForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(REGISTER_API, formData)
      setSuccess(true)

      // Auto-login after register
      const res = await axios.post(LOGIN_API, {
        username: formData.username,
        password: formData.password
      })

      const token = res.data.token
      localStorage.setItem('token', token)
      onLogin(token)
    } catch (err) {
      setError('Registration failed. Try a different username.')
    }
  }

  return (
    <div>
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registered successfully! Logging in...</p>}
    </div>
  )
}
