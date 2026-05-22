import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { formToJSON } from 'axios'
import { useNavigate } from 'react-router-dom'

function AddFile() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [accesskey, setAccessKey] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e)=> {
    e.preventDefault();

    if (!file) {
      setError("Please select a file")
      setTimeout(()=> {setError('')}, 3000)
      return
    }
    if (!accesskey) {
      setError("access key must be provided")
      setTimeout(()=> {setError('')}, 3000)
      return
    }
    if (!title) {
      setError("Title is required")
      setTimeout(() => {setError('')}, 3000)
      return
    }

    setloading(true)

    const formData = new FormData()

    formData.append('file', file)
    formData.append('title', title)
    formData.append('caption', caption)
    formData.append('access_key', accesskey)
    
    try {
      await axiosInstance.post('/upload/', formData)
      setSuccess("File added successfully")
      setTimeout(()=> {setSuccess('')}, 3000)
      setError('')

      setTitle('')
      setFile(null)
      setCaption('')
      setAccessKey('')
    }
    catch (error) {
      setError("Falied to upload. try again")
      setTimeout(()=> {setError('')}, 3000)
      setSuccess('')
    }
    finally {
      setloading(false)
    }
  }

  return (
    <div className='page-container add-file-page'>
      <div className='upload-container'>
        <h3 className='add-file-title'>Add File</h3>
        <form onSubmit={handleSubmit} className='upload-form'>
          <div className='upload-box'>
            <div className='upload-input-box'>
              <label>Title</label>
              <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} className='upload-inputs' />
            </div>
            <div className='upload-input-box'>
              <label>File</label>
              <input type='file' onChange={(e)=> setFile(e.target.files[0])} className='upload-inputs-file' />
            </div>
            <div className='upload-input-box'>
              <label>Caption</label>
              <input type='text' value={caption} onChange={(e)=> setCaption(e.target.value)} className='upload-inputs' />
            </div>
            <div className='upload-input-box'>
              <label>Access key</label>
              <input type='text' value={accesskey} onChange={(e)=> setAccessKey(e.target.value)} maxLength={20} className='upload-inputs' />
            </div>
            <div className='upload-input-box'>
              <button type='submit' className='upload-btn'>Upload</button>
            </div>
          </div>
        </form>
        <div>{success && <span className='upload-success'>{success}</span>}</div>
        <div>{error && <span className='upload-error'>{error}</span>}</div>
      </div>
    </div>
  )
}

export default AddFile
