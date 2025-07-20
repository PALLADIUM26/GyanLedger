import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PROFILE_API = 'http://localhost:8000/api/profile/'
const PASSWORD_API = 'http://localhost:8000/api/change-password/'
const IMAGE_API = 'http://localhost:8000/api/profile-image/'
const IMAGE_UPLOAD_API = 'http://localhost:8000/api/profile-image/upload/'
const DELETE_API = 'http://localhost:8000/api/delete-account/'

export default function ProfilePage({ token, setToken, setTheme, theme  }) {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    image: ''
  })
  // const [message, setMessage] = useState('')
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '' })
  // const [passMsg, setPassMsg] = useState('')
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

  const config2 = {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  useEffect(() => {
    fetchProfile()
    fetchProfileImage()
    toast('Profile details loaded')
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await axios.get(PROFILE_API, config)
      setProfile(res.data)
    } catch (err) {
      toast.error('Error fetching profile');
      // console.error('Error fetching profile:', err);
    }
  }

  const fetchProfileImage = async () => {
    try {
      const imageRes = await axios.get(IMAGE_API, {
        headers: { Authorization: `Token ${token}` },
        responseType: 'blob'
      })
      const imgUrl = URL.createObjectURL(imageRes.data)
      setImagePreview(imgUrl)
    } catch (err) {
      toast.error('❌ Error fetching image')
      // console.error('❌ Error fetching image:', err.response?.status, err.response?.data)
      setImagePreview(null)
    }
  }

  const handleQuickUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('Select an image');
      return;
    }
  
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      await axios.put(IMAGE_UPLOAD_API, formData, config2);
      toast.info('✅ Profile picture updated!');
      fetchProfile();
    } catch (err) {
      toast.error('❌ Upload failed');
    }
  };
  

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.put(PROFILE_API, profile, config)
    toast.info('Profile details updated')
    // setMessage(res.data.message)
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(PASSWORD_API, passwordData, config)
      // setPassMsg(res.data.message)
      setPasswordData({ old_password: '', new_password: '' })
      toast.info('Password updated')
    } catch (err) {
      // setPassMsg(err.response.data.error || '❌ Error changing password')
      toast.error('❌ Error changing password')
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('⚠️ Are you sure you want to delete your account? This action is irreversible.')) return;
  
    try {
      await axios.delete(DELETE_API, config);
      // alert('👋 Account deleted successfully!');
      toast.success('👋 Account deleted successfully!')
      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
    } catch (err) {
      toast.error('❌ Failed to delete account.')
      // alert('❌ Failed to delete account.');
      console.error(err);
    }
  }

  return (
    <div className='profile_records'>
      
      <h2>👤 Your Profile</h2>
      <div className='sectiona'>
      <div className='section1'>
        {imagePreview && <img src={imagePreview} alt="Profile" width={120} height={120} />}
        <button className='pic' type="button" onClick={() => document.getElementById('hiddenImageInput').click()}>✏️</button>
      </div>

      <div className='section2'>
        <h3>🪪 Update Profile details</h3>
        <form onSubmit={handleSubmit}>
          <input name="username" value={profile.username} disabled />
          <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
          <input name="first_name" value={profile.first_name} onChange={handleChange} placeholder="First Name" />
          <input name="last_name" value={profile.last_name} onChange={handleChange} placeholder="Last Name" />
          <button type="submit">Update Profile</button>
          <button className='deleteBtn' onClick={handleDeleteAccount}>🗑️ Delete My Account</button>
        </form>
      </div>

      <input
        id="hiddenImageInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleQuickUpload}
      />

      <div className='section3'>
        <h3>🔐 Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <input type="password" name="old_password" placeholder="Old Password" value={passwordData.old_password} onChange={handlePasswordChange} required />
          <input type="password" name="new_password" placeholder="New Password" value={passwordData.new_password} onChange={handlePasswordChange} required />
          <button type="submit">Change Password</button>
        </form>
      </div>
      </div>

      <div className='section4'>
        <h3>🛞 Appearance</h3>
        {/* <button className='toggleBtn' onClick={() => toggleTheme()}>
          🌓 Toggle Theme
        </button> */}
        {/* <button className='toggleBtn' onClick={onToggleTheme}>
          🌓 Toggle {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
        </button> */}
        <button className='toggleBtn' onClick={setTheme}>
          Toggle Theme ({theme === 'light' ? '🌞' : '🌙'})
        </button>
      </div>
    </div>
  )
}
