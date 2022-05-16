import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UpdatePage from './pages/UpdatePage'
import AccountPage from './pages/AccountPage'
import Applications from './components/Applications'


function App() {
  return (
    <>
      <Router>
        <div className='container' style={{ width: '1200px', padding: 0 }}>
          <Routes>
            <Route path='/' element={<Applications />} />
            <Route path='/:id' element={<UpdatePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account/:id' element={<AccountPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
