import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
      <>
       <div className='p-5 w-100 ' style={{backgroundColor:'#000000'}}>
        <Row>
            <Col>
            <h3 className='text-light'>project fair 2024</h3>
            <p style={{textAlign:'justify'}} className='text-light'>asdfrtgcvhbnjuygfthd</p>
            </Col>
            <Col className='d-flex flex-column alin-items-center'>
                <h3 className='text-light'> Links</h3>
                <Link to={'/'}>Landing</Link>
                <Link to={'/'}>Login</Link>
                <Link to={'/'}>Register</Link>
            </Col>
            <Col className='d-flex flex-column align-items-center'>
                <h3 className='text-light'>References</h3>
                <a href='https://react.dev/' target='_blank'>React</a>
                <a href='https://react-bootstrap.netlify.app/' target='_blank'>React-bootstrap</a>
            </Col>



            <div className='text-center'>
                <p> &copy; project fair 2024</p>
            </div>
        </Row>


       </div>
      </>
  )
}

export default Footer