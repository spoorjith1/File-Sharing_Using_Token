import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import Logout from '../components/Logout'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
  const [loading, setLoading] = useState(false)
  const [UserData, setUserData] = useState(null)
  const [error, setError] = useState('')
  const [uploadMenu, setUploadMenu] = useState(null)
  const navigate = useNavigate()

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

  const deleteFile = async (id)=> {
    try {
      await axiosInstance.delete(`/file/delete/${id}/`)

      setUserData({
        ...UserData,
        uploads: UserData.uploads.filter((upload)=> upload.id !== id)
      })

      setUploadMenu(null)
    }
    catch (error) {
      alert("Failed to Delete file, try again.")
    }
  }

  return (
    <div  className='page-container'>
      {error && <div>{error}</div>}

      {UserData && (
        <>
        <div className='page-container profile-page'>
          <div className='user-data'>
            <div className='user-data-top'>
              <h3 className='user-up-cloud'>Up Cloud</h3>
              <Logout />
            </div>
            <div className='user-data-two'>
              <img src={UserData.profile_pic} alt='profile_pic' className='user-profile-pic' />
              <div className='user-names'>
                <h3 className='user-username'>@{UserData.username}</h3>
                <p className='user-fullname'>{UserData.first_name} {UserData.last_name}</p>
              </div>
            </div>
          </div>
          <div className='title-box'>
          <h3 className='user-uploads-title'>Uploads</h3>
          </div>
          <div className='user-uploads'>
            {UserData.uploads?.map((upload)=> (
              <div key={upload.id} className='single-upload'>
                <div className='upload-title-date'>
                  <p className='upload-title'>{upload.title}</p>
                  <p className='upload-date'>{new Date(upload.created_at).toLocaleDateString('en-GB')}</p>
                </div>
                <div className='upload-file'>
                  {upload.file_type === 'image' && (
                    <img src={upload.file} alt={upload.title} className='uploaded-image' />
                  )}
                  {upload.file_type === 'pdf' && (
                    <a href={upload.file} target='_blank' rel='noreferrer' className='link'>View PDF</a>
                  )}
                  {upload.file_type === 'zip' && (
                    <a href={upload.file} target='_blank' rel='noreferrer' className='link' >Download ZIP</a>
                  )}
                </div>
                <div className='single-upload-bottom'>
                  <div>
                    <p className='file-type'>File Type : <span className='file-type-span'>{upload.file_type}</span></p>
                    <i className='file-caption'>{upload.caption}</i>
                  </div>
                  <div>
                    <button onClick={()=> setUploadMenu(uploadMenu === upload.id ? null : upload.id)} className='three-dot-btn'><BsThreeDotsVertical /></button>
                  </div>
                </div>
                {uploadMenu === upload.id && 
                  <div className='onclick-btns'>
                    <button onClick={()=> navigate(`/edit/access_key/${upload.id}`)} className='edit-access-btn btns'>Edit Access Key</button>
                    <button onClick={()=> deleteFile(upload.id)} className='delete-file-btn btns'>Delete File</button>
                  </div>
                }
                <p className='file-share-token'><u>Share Token</u> <span className='token'>{upload.share_token}</span></p>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default UserProfile
