import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { TokenAuthContext } from '../../Context Api/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header({status}) {

  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)
  const navigate=useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setAuthStatus(false)
    navigate('/')
  }
  return (
   <>
      <Navbar className="bg-body-tertiary">
        <Container className='d-flex justify-content-between' >
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project fa-xl" style={{color: "#63E6BE",}} />
          {' '}
          PROJECT FAIR
            </Navbar.Brand>
            <div>
              { !status &&
                <button className='btn btn-outline-info' onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket fa-xl" style={{color: "#e74813",}} />
                Logout
                </button>
              }
            </div>
        </Container>
      </Navbar>
   </>
  )
}

export default Header