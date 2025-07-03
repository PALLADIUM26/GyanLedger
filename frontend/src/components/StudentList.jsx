// src/components/StudentList.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/students/'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    student_class: '',
    phone: '',
    email: '',
    address: ''
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const res = await axios.get(API_URL)
    setStudents(res.data)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(API_URL, formData)
    setFormData({ name: '', student_class: '', phone: '', email: '', address: '' })
    fetchStudents()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}${id}/`)
    fetchStudents()
  }

  return (
    <div>
      <h2>📚 Student List</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="student_class" placeholder="Class" value={formData.student_class} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.student_class}) — {s.phone}
            <button onClick={() => handleDelete(s.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
