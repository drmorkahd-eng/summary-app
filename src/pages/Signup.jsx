import React, { useState } from 'react'
import "./Auth.css"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
    if (!response.ok) {
      setError("An error occurred, please try again.")
    }
    setName("")
    setEmail("")
    setPassword("")
    setError("")
    navigate("/signin")
  }

  return (
    <div className='form-bg'>
      <h2 className='title'>Sign up</h2>

      <div className="form-item">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" placeholder='Name' />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text" placeholder='Email' />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder='Password' />
        <button onClick={handleSubmit} className="btn">Submit</button>
      </div>
      <p className="footer-txt">Already have an account? <a href="-signin">Signin</a></p>
    </div>
  )
}

export default Signup;
