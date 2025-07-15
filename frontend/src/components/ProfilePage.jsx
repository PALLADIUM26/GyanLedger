import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PROFILE_API = 'http://localhost:8000/api/profile/'
const PASSWORD_API = 'http://localhost:8000/api/change-password/'
const IMAGE_BASE = 'http://localhost:8000/media/';

export default function ProfilePage({ token }) {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: ''
  })
  const [message, setMessage] = useState('')
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '' })
  const [passMsg, setPassMsg] = useState('')
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

//   const config = {
//     headers: {
//       Authorization: `Token ${token}`,
//       'Content-Type': 'multipart/form-data'
//     }
//   };

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
        const res = await axios.get(PROFILE_API, config)
        setProfile(res.data)
        if (res.data.image) {
        setImagePreview(`${IMAGE_BASE}${res.data.image}`);
      }
    } catch (err) {
        console.error('Error fetching profile:', err);
    }
  }

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedImage) return;

//     const formData = new FormData();
//     formData.append('image', selectedImage);

//     try {
//       await axios.put(PROFILE_API, formData, config);
//       alert('✅ Profile picture updated!');
//       fetchProfile();
//     } catch (err) {
//       alert('❌ Upload failed');
//       console.error(err);
//     }
//   };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.put(PROFILE_API, profile, config)
    setMessage(res.data.message)
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(PASSWORD_API, passwordData, config)
      setPassMsg(res.data.message)
      setPasswordData({ old_password: '', new_password: '' })
    } catch (err) {
      setPassMsg(err.response.data.error || '❌ Error changing password')
    }
  }

  return (
    <div>
      <h2>👤 Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={profile.username} disabled />
        <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
        <input name="first_name" value={profile.first_name} onChange={handleChange} placeholder="First Name" />
        <input name="last_name" value={profile.last_name} onChange={handleChange} placeholder="Last Name" />
        <button type="submit">Update Profile</button>
        {/* {imagePreview && <img src={imagePreview} alt="Profile" width={120} height={120} />} */}
      </form>
      {message && <p>{message}</p>}

      {/* <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload New Picture</button>
      </form> */}

      <hr />

      <h3>🔐 Change Password</h3>
      <form onSubmit={handlePasswordSubmit}>
        <input type="password" name="old_password" placeholder="Old Password" value={passwordData.old_password} onChange={handlePasswordChange} required />
        <input type="password" name="new_password" placeholder="New Password" value={passwordData.new_password} onChange={handlePasswordChange} required />
        <button type="submit">Change Password</button>
        {passMsg && <p>{passMsg}</p>}
      </form>
    </div>
  )
}
