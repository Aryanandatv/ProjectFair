import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApi';
import { addprojectResponseContext } from '../../Context Api/Contextapi'

function Add() {
    const {addProjectResponse,setAddProjectResponse}= useContext(addprojectResponseContext)
    console.log(useContext(addprojectResponseContext))
    const [show, setShow] = useState(false);
    const [preview,setpreview]=useState("")
    const [projectData,setProjectData]=useState({
      title:"",overview:"",language:"",github:"",demo:"",projectImage:""
    })
    const [imageStatus,setImageStatus]=useState(false)
    // console.log(projectData)

    useEffect(()=>{
      console.log(projectData)
      if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png" ){
        // console.log("Image is correct formate")
        // console.log(URL.createObjectURL(projectData.projectImage))
        setImageStatus(false)
        setpreview(URL.createObjectURL(projectData.projectImage))
      }
      else{
        console.log("Invalid file format ! Image should be jpg,jpeg or png !!")
        setImageStatus(true)
        setpreview("")
      }
     
    },[projectData.projectImage])

    const handleAddProject=async ()=>{
      const {title,overview,language,github,demo,projectImage}=projectData
      if(!title || !overview || !language || !github || !demo || !projectImage){
        toast.warning("Invalid Inputs!! Enter valid Input data in every fields ")
      }
      else{
        const formData=new FormData()
        formData.append("title",title)
        formData.append("overview",overview)
        formData.append("language",language)
        formData.append("github",github)
        formData.append("demo",demo)
        formData.append("image",projectImage)

        const token=sessionStorage.getItem('token')
        const reqHeader={
          "Content-Type":"multipart/formData",
          "Authorization":`Bearer ${token}`
        }
        const result= await addProject(formData,reqHeader)
        if(result.status==200){
          toast.success("project Added Successfully!")
          setProjectData({
            title:"",overview:"",language:"",github:"",demo:"",projectImage:""
            
          })
          handleClose()
          setAddProjectResponse(result)
         
        }
        else{
          toast.error(result.response.data)
        }

        }

      }
        

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
    
        <button className='btn btn-success mb-4' onClick={handleShow}>
           Add Project
        </button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div>
                <Row>
                    <Col>
                       <label >
                        <input type="file" onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} style={{display:'none'}}/>
                          <img className='img-fluid' src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8DHWlJGoy-e3EZBAJE6GDC3QtuY74aC0MSusrfsGKlfb2EPdcl-lbNng259mrr8zZbQM&usqp=CAU"} style={{height:'160px'}} alt=""></img>
                        </label>
                        {
                          imageStatus &&
                          <p className='text-danger'>Invalid file format ! Image should be jpg,jpeg or png !!"</p>
                        }
                    </Col>
                    <Col>
                      <div>
                         <FloatingLabel controlId="titleinp" label="Title" className="mb-3" >
                             <Form.Control type="text" placeholder="Project Title" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
                         </FloatingLabel>
                         <FloatingLabel controlId="overviewing" label="Overview">
                             <Form.Control type="text" placeholder="Brief About Project" onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
                         </FloatingLabel>
                         <FloatingLabel controlId="langinp" label="Languages">
                             <Form.Control type="text" placeholder="Languages Used"onChange={e=>setProjectData({...projectData,language:e.target.value})} />
                         </FloatingLabel>
                         <FloatingLabel controlId="githubinp" label="Github Url"  >
                             <Form.Control type="text" placeholder="Git hub Url" onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
                         </FloatingLabel>
                    </div>

                    </Col>
                    <FloatingLabel controlId="Dempinp" label="Demo Url">
                     <Form.Control type="text" placeholder="Demo Url" onChange={e=>setProjectData({...projectData,demo:e.target.value})} />
                     </FloatingLabel>
                </Row>
            </div>
        
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddProject}>Save</Button>
        </Modal.Footer>
      </Modal>

    
    </>
  )
}

export default Add