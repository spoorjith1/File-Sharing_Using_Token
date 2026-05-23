import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'

function EditAccess() {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [dataError, setDataError] = useState('')
  const [accessError, setAccessError] = useState('')
  const [accesskey, setAccesskey] = useState('')
  const navigate = useNavigate()

  useEffect(()=> {
    const fetchUserData = async ()=> {
      try {
        const response = await axiosInstance.get(`/edit/access-key/${id}/`)
        setUserData(response.data)
        setAccesskey(response.data.access_key)
      }
      catch (error) {
        setDataError("Failed to load Data")
      }
    }
    fetchUserData();
  }, [id])

  const handleUpdate = async ()=> {
    if (!accesskey) {
      setAccessError("Access key required")
      setTimeout(()=> {setAccessError('')}, 3000)
      return
    }
    if (accesskey.length < 8) {
      setAccessError("minimum 8 characters")
      setTimeout(()=> {setAccessError('')}, 3000)
      return
    }
    if (accesskey.length > 20) {
      setAccessError("maximum characters are 20")
      setTimeout(()=> {setAccessError('')}, 3000)
      return
    }
    try {
      await axiosInstance.patch(`/edit/access-key/${id}/`, {access_key: accesskey})
      alert("Update successfully")
      navigate('/profile')
    }
    catch (error) {
      setAccessError("Failed to update, try again.")
    }
  }

  return (
    <div className='page-container edit-access-page'>
      {dataError && <div>{dataError}</div>}
      {userData && 
      <div className='access-content-box'>
        <h2 className='access-title'>{userData.title}</h2>
        {userData.file_type === 'image' && (<img src={userData.file} alt={userData.title} className='access-image access-file' />)}
        {userData.file_type === 'pdf' && (<a href={userData.file} target='_blank' rel='noreferrer' className='link access-file'>
          View PDF</a>)
        }
        {userData.file_type === 'zip' && (<a href={userData.file} target='_blank' rel='noreferrer' className='link access-file'>
          Download ZIP</a>)
        }
        <p className='access-share-token'>{userData.share_token}</p>
        <div className='access-mid-box'>
          <p className='access-file-type'>File type : <u>{userData.file_type}</u></p>
          <p className='access-date'>{new Date(userData.created_at).toLocaleDateString('en-GB')}</p>
        </div>
        <div className='access-input-box'>
          <input type='text' value={accesskey} onChange={(e)=> setAccesskey(e.target.value)} className='access-input' 
          minLength={8} maxLength={20} />
          <button onClick={handleUpdate} className='access-save-btn'>Save</button>
          {accessError && <div className='access-error'>{accessError}</div>}
        </div>
      </div>
      }
    </div>
  )
}

export default EditAccess
