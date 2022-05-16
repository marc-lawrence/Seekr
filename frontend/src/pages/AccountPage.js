import React from 'react'
import Layout from '../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { deleteUser, logout, reset } from '../features/auth/authSlice'
import {
  Toolbar,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@mui/material'


function AccountPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { user } = useSelector((state) => state.auth)

  const handleDeleteUser = () => {
    dispatch(deleteUser(id))

    dispatch(logout())

    dispatch(reset())

    navigate('/login')

  }

  return (
    <>
      <Layout>
        <div style={{ width: '35%', marginLeft: '100px', marginTop: '100px', marginBottom: '0px' }}><button className='btn'><Link to='/'>Go back</Link></button></div>
        <TableContainer
          component={Paper}
          sx={{
            width: '1000px',
            marginLeft: '100px',
            marginTop: '10px',
            marginRight: '200px',
            height: '200px'
          }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2>Account</h2>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '60px',
                  height: '40px',
                  marginTop: '10px',
                  marginLeft: '10px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                className='deletebtn'
                onClick={handleDeleteUser}
              >Delete</button>
            </div>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow sx={{ display: 'flex' }}>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Name</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{user.name}</TableCell>
              </TableRow>
              <TableRow sx={{ display: 'flex' }}>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Email</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{user.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  )
}

export default AccountPage