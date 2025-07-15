import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PROFILE_API = 'http://localhost:8000/api/profile/'

export default function ProfilePage({ token }) {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: ''
  })
  const [message, setMessage] = useState('')

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const res = await axios.get(PROFILE_API, config)
    setProfile(res.data)
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.put(PROFILE_API, profile, config)
    setMessage(res.data.message)
  }

  return (
    <div>
      <h2>👤 Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={profile.username} disabled />
        <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
        <input name="first_name" value={profile.first_name} onChange={handleChange} placeholder="First Name" />
        <input name="last_name" value={profile.last_name} onChange={handleChange} placeholder="Last Name" />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
