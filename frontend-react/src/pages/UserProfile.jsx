import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import Logout from '../components/Logout'

function UserProfile() {
  const [loading, setLoading] = useState(false)
  const [UserData, setUserData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=> {
    const fetchUserData = async ()=> {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/profile/me/')
        setUserData(response.data)
      }
      catch (error) {
        setError("Failed to fetch user data")
      }
      finally {
        setLoading(false)
      }
    }
    fetchUserData();
  }, [])

  if (loading) {
    return <div className='page-container'>Loading...</div>
  }

  return (
    <div  className='page-container'>
      {error && <div>{error}</div>}

      {UserData && (
        <>
        <div className='user-data'>
          <h3>{UserData.username}</h3>
          <img src={UserData.profile_pic} alt='profile_pic' className='user-profile-pic' />
          <p>{UserData.first_name} {UserData.last_name}</p>
          <Logout />
        </div>
        <div>
          {UserData.uploads?.map((upload)=> (
            <div key={upload.id} className='each upload'>
              <p className='upload-title'>{upload.title}</p>
              <div className='upload-file'>
                {upload.file_type === 'image' && (
                  <img src={upload.file} alt={upload.title} className='uploaded-image' />
                )}
                {upload.file_type === 'pdf' && (
                  <a href={upload.file} target='_blank' rel='noreferrer' className='pdf-link'>View PDF</a>
                )}
                {upload.file_type === 'zip' && (
                  <a href={upload.file} target='_blank' rel='noreferrer' className='zip-download-btn' >Download ZIP</a>
                )}
              </div>
              <div className='upload-caption-date'>
                <p>{upload.caption}</p>
                <p>{upload.created_at}</p>
              </div>
              <p>{upload.share_token}</p>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  )
}

export default UserProfile
