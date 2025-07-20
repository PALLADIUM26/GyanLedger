import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const API = 'http://localhost:8000/api/monthly-summary/'

export default function MonthlySummary({ token }) {
  const [month, setMonth] = useState('')
  const [summary, setSummary] = useState(null)

  const fetchSummary = async () => {
    if (!month) {
      // alert("Please select a month first.")
      toast.error("Please select a month first.");
      return
    }
    const [y, m] = month.split('-')
    try {
      const res = await axios.get(`${API}?month=${m}&year=${y}`, {
      headers: { Authorization: `Token ${token}` }
      })
      toast("Monthly Summary ready");
      setSummary(res.data)
    } catch (err) {
      toast.error("⚠️ Could not fetch summary. Try again.");
      // alert("⚠️ Could not fetch summary. Try again.")
      console.error(err)
    }
  }

  return (
    <div>
      <h2>📊 Monthly Report</h2>
      <div className='records'>
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <button className='fetchBtn' onClick={fetchSummary}>Fetch Report</button>

      {summary && (
        <div>
          <p><b>Month:</b> {summary.month}</p>
          <p><b>Total Expected:</b> ₹{summary.expected}</p>
          <p><b>Total Collected:</b> ₹{summary.collected}</p>
          <p><b>Pending:</b> ₹{summary.pending}</p>
        </div>
      )}
    </div></div>
  )
}
