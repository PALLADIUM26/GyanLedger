import React, { useState, useEffect } from 'react'
import axios from 'axios'

const STUDENTS_API = 'http://localhost:8000/api/students/'

export default function StudentList({ token }) {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    student_class: '',
    phone: '',
    email: '',
    address: '',
    monthly_fee: ''
  })
  const [editId, setEditId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const res = await axios.get(STUDENTS_API, config)
    setStudents(res.data)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateEmail = (email) => {
    return email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }
    try{
      if (editId) {
        await axios.put(`${STUDENTS_API}${editId}/`, formData, config)
        setEditId(null)
      } else {
        await axios.post(STUDENTS_API, formData, config)
      }
      setFormData({ name: '', student_class: '', phone: '', email: '', address: '', monthly_fee: '' })
      fetchStudents()
    } catch (err) {
      alert('❌ Failed to add student: ' + JSON.stringify(err.response?.data || err.message))
    }
  }

  const handleEdit = (student) => {
    setEditId(student.id)
    setFormData({
      name: student.name,
      student_class: student.student_class,
      phone: student.phone,
      email: student.email,
      address: student.address,
      monthly_fee: student.monthly_fee,
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await axios.delete(`${STUDENTS_API}${id}/`, config)
    fetchStudents()
  }

  return (
    <div>
      <h2>📚 Student List</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="🔍 Search by name or class"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="student_class" placeholder="Class" value={formData.student_class} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="monthly_fee" placeholder="Monthly Fee" type="number" value={formData.monthly_fee} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add Student'}</button>

        {editId && (
          <button type="button" onClick={() => {
            setEditId(null)
            setFormData({ name: '', student_class: '', phone: '', email: '', address: '', monthly_fee: '' })
          }}>Cancel Edit</button>
        )}
      </form>

      <ul>
        {students
        .filter((s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.student_class.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((s) => (
          <li key={s.id}>
            {s.name} ({s.student_class}) — {s.phone} - ₹{s.monthly_fee}
            <button onClick={() => handleEdit(s)}>✏️</button>
            <button onClick={() => handleDelete(s.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
