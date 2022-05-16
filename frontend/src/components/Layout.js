import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, NativeSelect } from '@mui/material';
import { createApp } from '../features/apps/appSlice'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';


const drawerWidth = 240;

function Layout({ children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [openDialog, setOpenDialog] = useState(false)
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [posting, setPosting] = useState('')
  const [recruiter, setRecruiter] = useState('')
  const [stage, setStage] = useState('')
  const [date, setDate] = useState(null)


  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createApp({ company, position, posting, recruiter, stage, date }))

    setCompany('')
    setPosition('')
    setPosting('')
    setRecruiter('')
    setStage('')
    setDate(null)

    setOpenDialog(false)

    navigate('/')

  }

  const onLogout = () => {
    dispatch(logout())

    dispatch(reset())

    navigate('/')
  }

  const handleAccount = () => {
    navigate(`/account/${user._id}`)
  }

  const handleDashboard = () => {
    navigate('/')
  }

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }



  }, [user, navigate])



  return (
    <>
      <Box sx={{ display: 'flex', height: '800px', justifyContent: 'center' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ backgroundColor: '#212121', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
              Seekr
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button onClick={handleOpen}><AddIcon sx={{ color: '#424242' }} />Add Application</ListItem>
              <ListItem button onClick={handleDashboard}><HomeIcon sx={{ color: '#424242' }} /> Dashboard</ListItem>
              <ListItem button onClick={handleAccount}><AccountCircleIcon sx={{ color: '#424242' }} />Account</ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <button className='btn btn-block' onClick={onLogout}>
                  <LogoutIcon />Log out
                </button>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box>
        <div className='appContainer'>
          {children}
        </div>
        {openDialog && (
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
                    onChange={(e) => setDate(e.toDateString())}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Add Application</Button>
              </DialogActions>
            </form>
          </Dialog>
        )}
      </Box>
    </>
  )
}

export default Layout