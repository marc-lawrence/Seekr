import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import './LoginPage.css'

function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container2'>
      <section className='section'>
        <form onSubmit={handleSubmit}>
          <h1 className='h1'>Seekr</h1>
          <p>Please enter your credentials</p>
          <div className="form-group2">
            <input type="text" placeholder='Email' id='email' name='email' onChange={handleChange} value={email} />
          </div>
          <div className='form-group2'>
            <input type="password" placeholder='Password' id='password' name='password' onChange={handleChange} value={password} />
          </div>
          <div>
            <button type='submit' className="button">Log in</button>
          </div>
        </form>
      </section>
      <p className='p2'>New to Seekr?</p>
      <Link to='/register'><button className='button2'>Create Account</button></Link>
    </div>
  )
}

export default LoginPage