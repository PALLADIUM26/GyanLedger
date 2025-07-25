import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

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
        toast("Dashboard content ready");
        setSummary(res.data)
      } catch (err) {
        toast.error("Error fetching summary");
        // alert('Error fetching summary:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [token])

  return (
    <div>
      <h2>📊 Dashboard Summary</h2>
      {!summary ? ( <div className="spinner"></div> ) : (
        <div className="cards-container">
          <div className="card">
            <h3>👨‍🎓 Total Students</h3>
            <p>{summary.total_students}</p>
          </div>
          <div className="card">
            <h3>💰 Payments This Month</h3>
            <p>{summary.total_payments} transactions</p>
          </div>
          <div className="card">
            <h3>🪙 Total Amount</h3>
            <p>₹{summary.total_amount}</p>
          </div>
          <div className="card">
            <h3>⚠️ Unpaid Students</h3>
            <p>{summary.unpaid_students}</p>
          </div>
        </div>
      )}
    </div>
  )
}

