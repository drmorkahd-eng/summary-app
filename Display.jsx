import React, { useEffect, useState } from 'react'
import "./Display.css"
import { useAuth } from './hooks/useAuth'
import { replace, useNavigate } from 'react-router-dom';

const Display = () => {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")
  const [data, setData] = useState({"Summary": {"aiSummary": ""}})
  const [token, login, logout] = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true })
    }
  }, [token, navigate])


  const handleFileChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file first.")
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...")
      const response = await fetch("http://localhost:8000/summary/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });
      if (response.ok) {
        const resData = await response.json()
        setData(resData)
      }
      setStatus("Success!!")
    } catch (error) {
      setStatus("Error occured, try again.")
    }
  }

  return (
    <div className='display-grid'>
      <div className='upload-section'>
        <p>Upload a PDF file and our AI will summarize the contents and display it.</p>
        <form>
          <input
            accept='application/pdf'
            onChange={handleFileChange} type="file" placeholder='Select a PDF file.' />
          <button onClick={handleUpload}>Submit</button>
        </form>
      </div>

      <div className='output'>
        <h2>AI Output</h2>
        <div className='output-section'>
          {data.Summary.aiSummary}
        </div>
      </div>
    </div>
  )
}

export default Display