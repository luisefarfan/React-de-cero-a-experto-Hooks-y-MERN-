import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'

export const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    login('Luis Farfan')

    // Checks if the lastPath is in the local storage, lo redirect to that page
    const lastPath = localStorage.getItem('lastPath') || '/marvel'

    navigate(lastPath, {
      replace: true
    })
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button className='btn btn-primary' onClick={handleLogin}>Login</button>
    </div>
  )
}
