import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { getApps } from '../features/apps/appSlice'
import Spinner from './Spinner'
import './Applications.css'
import Layout from './Layout'
import {
  Toolbar,
  TablePagination,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@mui/material';



function Applications() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { apps, isLoading, isError, message } = useSelector((state) => state.app)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    if (isError) {
      console.log(message)
    }

    dispatch(getApps())


  }, [isError, message, dispatch, user, navigate])



  if (isLoading) {
    return <Spinner />
  }


  return (
    <Layout>
      <TableContainer component={Paper} sx={{
        marginRight: '100px',
        marginTop: '100px',
        maxWidth: '1100px',
        '@media (max-width: 1500)': {
          marginRight: '2000px',
          maxWidth: '1100px'
        },
        '@media (max-width: 1000)': {
          marginRight: '2000px',
          maxWidth: '800px'
        }
      }}>
        <Toolbar><h2 style={{ padding: '10px', margin: 0 }}>Applications</h2></Toolbar>
        <Table aria-label="simple table" sx={{ minWidth: '1100px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bolder', width: '25%' }}>Company</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bolder', width: '25%' }}>Position</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bolder', width: '25%' }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bolder', width: '25%' }}>Application Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apps.length > 0 ? (
              apps.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((app) => (
                <TableRow
                  key={app._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  onClick={() => navigate(`/${app._id}`)}
                >
                  <TableCell component="th" scope="row" align="center">
                    {app.company}
                  </TableCell>
                  <TableCell align="center">{app.position}</TableCell>
                  <TableCell align="center">{app.date}</TableCell>
                  <TableCell align="center">{app.stage}</TableCell>
                </TableRow>
              ))
            ) : null}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={apps.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Layout>
  )
}

export default Applications