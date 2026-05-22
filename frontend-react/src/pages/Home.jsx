import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'

function Home() {
  const [token, setToken] = useState('')
  const [accesskey, setAccesskey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e)=> {
    e.preventDefault();

    if (!token) {
      setError("Please provide link")
      setTimeout(()=> {setError('')}, 3000)
      return
    }
    if (!accesskey) {
      setError("please provide access key")
      setTimeout(()=> {setError('')}, 3000)
        return
    }

    setLoading(true)

    const formData = new FormData;
    formData.append('share_token', token)
    formData.append('access_key', accesskey)

    try {
      const response = await axiosInstance.post('/shared-file/', formData)
      window.open(response.data.file_url, '_blank')
      setError('')
    }
    catch (error) {
      setError("Invalid token or accesskey")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='page-container home-page'>
      <h1>Up Cloud</h1>
      <div className='share-container'>
        <form onSubmit={handleSubmit} className='link-form' >
          <h3 className='share-title'>Paste the Shared Link</h3>
          <div className='share-box'>
            <div className='upload-input-box'>
              <label>Link</label>
              <input type='text' className='upload-inputs' value={token} onChange={(e)=> setToken(e.target.value)} />
            </div>
            <div className='upload-input-box'>
              <label>Access key</label>
              <input type='text' className='upload-inputs' value={accesskey} onChange={(e)=> setAccesskey(e.target.value)} />
            </div>
            <div className='upload-btn-box'>
              <button type='submit' className='btn-get-file upload-btn'>Get File</button>
              <button type='button' className='btn-reset upload-btn' onClick={()=> 
                {
                  setToken('') 
                  setAccesskey('') 
                  setError('')
                }}>reset</button>
            </div>
          </div>
        </form>
        <div>{error && <span className='link-error'>{error}</span>}</div>
      </div>
    </div>
  )
}

export default Home
