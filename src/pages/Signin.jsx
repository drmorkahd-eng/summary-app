import React from 'react'
import "./Auth.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../components/hooks/useAuth'

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [token, login, logout]= useAuth()
  const navigate = useNavigate()

  const handleSignin = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:8000/auth/signin", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    const resData = await response.json()
    if (!response.ok) {
      setError(resData.message)
    } else {
      setError("")
      setEmail("")
      setPassword("")
      login(resData.token)
      navigate("/")
    }
  }
  return (
    <div className='form-bg'>
      <h2 className='title'>Sign in</h2>

      <div className="form-item">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text" placeholder='Email' />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder='password' />
        <button onClick={handleSignin} className='btn'>submit</button>
      </div>
      <p className="footer-txt">Already have an account? <a href="-signup">Signup</a></p>
      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  )
}

export default Signin
