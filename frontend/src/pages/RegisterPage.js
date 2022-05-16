import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container2'>
      <section className='section'>
        <form onSubmit={handleSubmit}>
          <h1 className='h1'>Seekr</h1>
          <p>Please create an account</p>
          <div className="form-group2">
            <input type="text" placeholder='Enter your name' id='name' name='name' onChange={handleChange} value={name} />
          </div>
          <div className="form-group2">
            <input type="text" placeholder='Enter your email' id='email' name='email' onChange={handleChange} value={email} />
          </div>
          <div className='form-group2'>
            <input type="password" placeholder='Enter password' id='password' name='password' onChange={handleChange} value={password} />
          </div>
          <div className='form-group2'>
            <input type="password" placeholder='Confirm password' id='password2' name='password2' onChange={handleChange} value={password2} />
          </div>
          <div>
            <button type='submit' className="button">Submit</button>
          </div>
        </form>
      </section>
      <div style={{ width: '35%', marginLeft: '20px', marginTop: '10px' }}><button className='btn'><Link to='/login'>Go back</Link></button></div>
    </div>
  )
}

export default RegisterPage