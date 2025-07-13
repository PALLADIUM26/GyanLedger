import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DUES_API = 'http://localhost:8000/api/dues/'

export default function DueList({ token }) {
  const [dues, setDues] = useState([])

  useEffect(() => {
    fetchDues()
  }, [])

  const fetchDues = async () => {
    const res = await axios.get(DUES_API, {
      headers: { Authorization: `Token ${token}` }
    })
    setDues(res.data)
  }

  return (
    <div>
      <h2>⚠️ Due Payments</h2>
      {dues.length === 0 ? (
        <p>No dues this month. 🎉</p>
      ) : (
        <ul>
          {dues.map((d) => (
            <li key={d.student_id}>
              {d.name} ({d.class}) has not paid ₹{d.monthly_fee} this month.
              {d.last_payment && <span> Last paid on {d.last_payment}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
