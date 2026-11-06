import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'


const Navbar = () => {
   const [token, login, logout] = useAuth()

  return (
    <nav className='navbar'>
        <h1 className='logo'>
          <Link to ="/" className='link'>summary App</Link>
        </h1>
        <ul className='nav-links'>
            {token ?
            <>
             <button onClick={() => {
                logout()
              }}>sign out</button>
            </>
             :
            <>
            <li><Link to ="/signup">sign up</Link></li>
            <li><Link to ="/signin">sign in</Link></li>
            </>
          } 
        </ul>
    </nav>
  )
}

export default Navbar
