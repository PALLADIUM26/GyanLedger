import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

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
  const [loading, setLoading] = useState(false)

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await axios.get(STUDENTS_API, config)
      await new Promise(res => setTimeout(res, 1000));
      toast("Student records fetched")
      setStudents(res.data)
    } catch (err) {
      toast.error('❌ Failed to fetch students')
      // alert('❌ Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateEmail = (email) => {
    return email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone) => {
    return phone === '' || /^\d{10}$/.test(phone)
  }  

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number.')
      return
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.')
      // alert('Please enter a valid email address.')
      return
    }

    try{
      if (editId) {
        await axios.put(`${STUDENTS_API}${editId}/`, formData, config)
        toast.info('Student record modified')
        setEditId(null)
      } else {
        await axios.post(STUDENTS_API, formData, config)
        toast.info('Student record added')
      }
      setFormData({ name: '', student_class: '', phone: '', email: '', address: '', monthly_fee: '' })
      fetchStudents()
    } catch (err) {
      toast.error('❌ Failed to add or modify student')
      // alert('❌ Failed to add student: ' + JSON.stringify(err.response?.data || err.message))
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
    toast.info('Selected student record deleted')
    fetchStudents()
  }

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_class.toLowerCase().includes(searchTerm.toLowerCase())
  )
  

  return (
    <div>
      <h2>📚 Student List</h2>
      <div className='records'>
    
      <input
        type="text"
        placeholder="🔍 Search by name or class"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="student_class" placeholder="Class" type="number" value={formData.student_class} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" type="number" value={formData.phone} onChange={handleChange} />
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

      {loading ? (
        <div className="spinner"></div>
        ) : filteredStudents.length > 0 ? (
          <ul>
            {filteredStudents.map((s) => (
              <li key={s.id}>
                {s.name} ({s.student_class}) — {s.phone} - ₹{s.monthly_fee}
                <button onClick={() => handleEdit(s)}>✏️</button>
                <button onClick={() => handleDelete(s.id)}>❌</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No students found.</p>
      )}
    </div>
    </div>
  )
}
