import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const REGISTER_API = 'http://localhost:8000/api/register/'
const LOGIN_API = 'http://localhost:8000/api-token-auth/'

export default function RegisterForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  // const [error, setError] = useState('')
  // const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateEmail = (email) => {
    return email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      // alert('Please enter a valid email address.')
      return
    }
    try {
      await axios.post(REGISTER_API, formData)
      // setSuccess(true)

      const res = await axios.post(LOGIN_API, {
        username: formData.username,
        password: formData.password
      })

      const token = res.data.token
      localStorage.setItem('token', token)
      onLogin(token)
      toast.success("Registered successfully!");
    } catch (err) {
      toast.error("Registration failed. Try a different username or valid email.");
      // setError('Registration failed. Try a different username or valid email.')
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
      {/* {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registered successfully! Logging in...</p>} */}
    </div>
  )
}
