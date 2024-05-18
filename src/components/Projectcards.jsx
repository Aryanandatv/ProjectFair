import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import server_url from '../services/server_url'

function Projectcards({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(project)
  return (
    <>
    
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" onClick={handleShow} className='img-fluid' src={project?.image?`${server_url}/uploads/${project.image}`:"https://www.pngitem.com/pimgs/m/145-1451255_web-designing-web-design-website-icon-hd-png.png"} style={{width:'100%',height:'200px'}} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col>
            <img className='img-fluid' src={project?.image?`${server_url}/uploads/${project.image}`:"https://www.pngitem.com/pimgs/m/145-1451255_web-designing-web-design-website-icon-hd-png.png"} style={{width:'100%',height:'200px'}} alt=''/>
            </Col>
            <Col>
            <h4>{project.title}</h4>
            <p>{project.overview}</p>
            <h6>{project.language}</h6>
            <div className='mt-3 p-3 d-flex justify-content-between'>
                <a href=''>
                 <i class="fa-brands fa-github fa-xl"></i>   
                </a>
                <a href=''>
                 <i class="fa-solid fa-link fa-xl"></i>
                </a>
            </div>
            </Col>
         </Row>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
   
    </>
    
  )
}

export default Projectcards