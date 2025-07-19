import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SUMMARY_API = 'http://localhost:8000/api/summary/'

export default function Dashboard({ token }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchSummary = async () => {
      try {
        const res = await axios.get(SUMMARY_API, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        await new Promise(res => setTimeout(res, 1000));
        setSummary(res.data)
      } catch (err) {
        alert('Error fetching summary:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [token])

  if (!summary) return <div className="spinner"></div>
  // <p>Loading dashboard...</p>

  return (
    <div>
      <h2>📊 Dashboard Summary</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h3>👨‍🎓 Total Students</h3>
          <p>{summary.total_students}</p>
        </div>
        <div style={cardStyle}>
          <h3>💰 Payments This Month</h3>
          <p>{summary.total_payments} transactions</p>
        </div>
        <div style={cardStyle}>
          <h3>🪙 Total Amount</h3>
          <p>₹{summary.total_amount}</p>
        </div>
        <div style={cardStyle}>
          <h3>⚠️ Unpaid Students</h3>
          <p>{summary.unpaid_students}</p>
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '1rem',
  width: '200px',
  textAlign: 'center',
  // backgroundColor: '#f9f9f9',
  backgroundColor: 'var(--card-bg)',
  color: 'var(--text-color)',
}
