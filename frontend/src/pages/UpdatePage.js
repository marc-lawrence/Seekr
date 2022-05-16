import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateApp, deleteApp, getSingleApp } from '../features/apps/appSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {
  Toolbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  NativeSelect,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@mui/material';




function UpdatePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { user } = useSelector((state) => state.auth)
  const { apps } = useSelector((state) => state.app)
  const { _id, company, position, posting, recruiter, date, stage } = apps

  const [openModal, setOpenModal] = useState(false)
  const [Company, setCompany] = useState(company)
  const [Position, setPosition] = useState(position)
  const [Posting, setPosting] = useState(posting)
  const [Recruiter, setRecruiter] = useState(recruiter)
  const [Date, setDate] = useState(date)
  const [Stage, setStage] = useState(stage)


  useEffect(() => {
    dispatch(getSingleApp(id))

  }, [])


  const handleDelete = () => {
    dispatch(deleteApp(_id))
    navigate('/')
  }

  const handleEdit = () => {
    setOpenModal(true)
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateApp({ _id, Company, Position, Posting, Recruiter, Date, Stage }))

    setOpenModal(false)

  }


  return (
    <>
      <Layout>
        <div style={{ width: '35%', marginLeft: '500px', marginTop: '100px', marginBottom: '0px' }}><button className='btn'><Link to='/'>Go back</Link></button></div>
        <TableContainer
          component={Paper}
          sx={{
            width: '1000px',
            marginLeft: '500px',
            marginTop: '10px',
            marginRight: '600px',
            height: '400px'
          }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2>Edit application</h2>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: 'white',
                  width: '60px',
                  height: '40px',
                  marginTop: '10px',
                  marginLeft: '0px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                className='editbtn'
                onClick={handleEdit}>Edit</button>
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
                  cursor: 'pointer'
                }}
                className='deletebtn'
                onClick={handleDelete}>Delete</button>
            </div>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow sx={{ display: 'flex' }}>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Company Name</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{company}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Position</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{position}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Job Posting</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{posting}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Recruiter</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{recruiter}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Application Stage</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{stage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%', display: 'inline-block' }}>Date</TableCell>
                <TableCell sx={{ width: '75%', display: 'inline-block' }}>{date}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>

      {
        openModal && (
          <Dialog open fullWidth maxWidth="sm">
            <DialogTitle>Add Application</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="company"
                  label="Company Name *"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="position"
                  label="Position *"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="posting"
                  label="Job Posting URL"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={posting}
                  onChange={(e) => setPosting(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="recruiter"
                  label="Recruiter Contact Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  defaultValue={recruiter}
                  onChange={(e) => setRecruiter(e.target.value)}
                />
                <NativeSelect
                  fullWidth
                  defaultValue="Application Stage"
                  id="stage"
                  margin="dense"
                  variant="standard"
                  autoFocus
                  sx={{ marginTop: "20px", marginBottom: "20px" }}
                  defaultValue={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option value="Application Stage">Application Stage</option>
                  <option value="Application Sent">Application Sent</option>
                  <option value="No Offer">No Offer</option>
                  <option value="Phone Screen">Phone Screen</option>
                  <option value="On-Site">On-Site</option>
                  <option value="Offer">Offer</option>
                </NativeSelect>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    defaultValue={date}
                    onChange={(e) => setDate(e.toDateString())}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type='submit' >Save Application</Button>
              </DialogActions>
            </form>
          </Dialog>
        )
      }
    </>
  )
}

export default UpdatePage