import React, { useState, useEffect } from 'react'
import axios from 'axios'

const STUDENTS_API = 'http://localhost:8000/api/students/'
const PAYMENTS_API = 'http://localhost:8000/api/payments/'

export default function PaymentList() {
  const [students, setStudents] = useState([])
  const [payments, setPayments] = useState([])
  const [formData, setFormData] = useState({
    student: '',
    amount: '',
    date: '',
    remarks: ''
  })

  useEffect(() => {
    fetchStudents()
    fetchPayments()
  }, [])

  const fetchStudents = async () => {
    const res = await axios.get(STUDENTS_API)
    setStudents(res.data)
  }

  const fetchPayments = async () => {
    const res = await axios.get(PAYMENTS_API)
    setPayments(res.data)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(PAYMENTS_API, formData)
    setFormData({ student: '', amount: '', date: '', remarks: '' })
    fetchPayments()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${PAYMENTS_API}${id}/`)
    fetchPayments()
  }

  return (
    <div>
      <h2>💰 Payment Records</h2>

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
        <button type="submit">Add Payment</button>
      </form>

      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            {p.student_name} paid ₹{p.amount} on {p.date} ({p.remarks})
            <button onClick={() => handleDelete(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
