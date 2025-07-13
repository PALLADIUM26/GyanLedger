import React, { useState, useEffect } from 'react'
import axios from 'axios'

const STUDENTS_API = 'http://localhost:8000/api/students/'
const PAYMENTS_API = 'http://localhost:8000/api/payments/'

export default function PaymentList({ token }) {
  const [students, setStudents] = useState([])
  const [payments, setPayments] = useState([])
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    student: '',
    amount: '',
    date: '',
    remarks: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

  useEffect(() => {
    fetchStudents()
    fetchPayments()
  }, [])

  const fetchStudents = async () => {
    const res = await axios.get(STUDENTS_API, config)
    setStudents(res.data)
  }

  const fetchPayments = async () => {
    const res = await axios.get(PAYMENTS_API, config)
    setPayments(res.data)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await axios.put(`${PAYMENTS_API}${editId}/`, formData, config)
      setEditId(null)
    } else {
      await axios.post(PAYMENTS_API, formData, config)
    }
    setFormData({ student: '', amount: '', date: '', remarks: '' })
    fetchPayments()
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await axios.delete(`${PAYMENTS_API}${id}/`, config)
    fetchPayments()
  }

  const handleEdit = (payment) => {
    setEditId(payment.id)
    setFormData({
      student: payment.student, // this should be the student id
      amount: payment.amount,
      date: payment.date,
      remarks: payment.remarks
    })
  }

  const filteredPayments = payments.filter((p) =>
    p.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.remarks.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>💰 Payment Records</h2>

      <input
        type="text"
        placeholder="Search by student or remarks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
        <select name="student" value={formData.student} onChange={handleChange} required>
          <option value="">-- Select Student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} />
        {/* <button type="submit">Add Payment</button> */}
        <button type="submit">{editId ? 'Update Payment' : 'Add Payment'}</button>

        {editId && (
          <button type="button" onClick={() => {
            setEditId(null)
            setFormData({ student: '', amount: '', date: '', remarks: '' })
          }}>Cancel Edit</button>
        )}
      </form>
      
      {filteredPayments.length > 0 ? (
        <ul>
          {filteredPayments.map((p) => (
            <li key={p.id}>
              {p.student_name} paid ₹{p.amount} on {p.date} ({p.remarks})
              <button onClick={() => handleEdit(p)}>✏️</button>
              <button onClick={() => handleDelete(p.id)}>❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>No payments found.</p>
      )}
    </div>
  )
}
