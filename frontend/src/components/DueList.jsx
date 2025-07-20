import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const DUES_API = 'http://localhost:8000/api/dues/'

export default function DueList({ token }) {
  const [dues, setDues] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDues()
  }, [])

  const fetchDues = async () => {
    setLoading(true)
    try {
      const res = await axios.get(DUES_API, {
        headers: { Authorization: `Token ${token}` }
      })
      await new Promise(res => setTimeout(res, 1000));
      toast("Due list ready");
      setDues(res.data)
    } catch (err) {
      // alert('❌ Failed to fetch due list')
      toast.error("❌ Failed to fetch due list");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>⚠️ Due Payments</h2>
      <div className='records'>
      {loading ? (
        <div className="spinner"></div>
        ) : dues.length === 0 ? (
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
    </div>
  )
}
