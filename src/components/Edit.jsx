import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/server_url';
import { toast } from 'react-toastify';
import { editProject } from '../services/allApi';
import { editprojectResponseContext } from '../../Context Api/Contextapi';

function Edit({project}) {
  //  console.log(project,"from edit")
  const {editProjectResponse,setEditProjectResponse}= useContext(editprojectResponseContext)
  console.log(useContext(editprojectResponseContext))

  const [projectData,setProjectData]=useState({
    id:project._id, title: project.title,overview: project.overview,language: project.languages,github: project.github,demo: project.demo,projectImage:""
  })

  const [preview,setpreview]=useState("")
  const [imageStatus,setImageStatus]=useState(false)

  useEffect(()=>{
    if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png" ){
      setImageStatus(false)
      setpreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
      setImageStatus(true)
      setpreview("")
    }
   
  },[projectData.projectImage,editProjectResponse])

  const handleUpdate=async ()=>{
    console.log(projectData)
    const {title,overview,language,github,demo}=projectData
    if(!title || !overview || !language || !github || !demo ){
      toast.warning("Invalid Inputs!! Enter valid Input data in every fields ")
    }
    else{
      const formData=new FormData()
      formData.append("title",title)
      formData.append("overview",overview)
      formData.append("language",language)
      formData.append("github",github)
      formData.append("demo",demo)
      preview ?formData.append("image",projectData.projectImage):formData.append("image",project.image)

      const token=sessionStorage.getItem("token")
      if(preview){
        const reqHeader={
          "Content-Type":"multipart/formData",
          "Authorization":`Bearer ${token}`
        }
        const result = await editProject(projectData.id,formData,reqHeader)
        if(result.status==200){
          toast.success(`Project  ${projectData.title} Updated successfully !!`)
          handleClose()
          // setEditProjectResponse(result)
        }
        else{
          toast.warning(result.response.data)
        }

      }
      else{
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await editProject(projectData.id,formData,reqHeader)
        if(result.status==200){
          toast.success(`Project  ${projectData.title} Updated successfully !!`)
          handleClose()
          setEditProjectResponse(result)
        }
        else{
          toast.warning(result.response.data)
        }
      }
    }
  }


    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setpreview("")
      setProjectData({
       id:project._id, title:project.title,overview: project.overview,language: project.languages,github: project.github,demo: project.demo,projectImage:""
      })
    };
    const handleShow = () => setShow(true);
  
  return (
    <>
    
             <button className='btn mt-3' onClick={handleShow}>
               <i className="fa-solid fa-pen-to-square fa-xl" />
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
                       <label>
                          <input type="file"  name=''  onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}}/>
                          <img className='img-fluid' src={preview?preview:`${base_url}/uploads/${project.image}`} style={{height:'160px'}} alt=""></img>
                        </label>
                        {
                          imageStatus &&
                          <p className='text-danger'>Image Extension Invalid !! Image should be JPG,JEG or PNG</p>
                        }
                    </Col>
                    <Col>
                      <div>
                         <FloatingLabel controlId="titleinp" label="Title" className="mb-3" >
                             <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,title:e.target.value})}} value={projectData.title} placeholder="Project Title" />
                         </FloatingLabel>
                         <FloatingLabel controlId="overviewing" label="Overview">
                             <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,overview:e.target.value})}} value={projectData.overview} placeholder="Brief About Project" />
                         </FloatingLabel>
                         <FloatingLabel controlId="langinp" label="Languages">
                             <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,language:e.target.value})}} value={projectData.language} placeholder="Languages Used" />
                         </FloatingLabel>
                         <FloatingLabel controlId="githubinp" label="Github Url"  >
                             <Form.Control type="text"  onChange={(e)=>{setProjectData({...projectData,github:e.target.value})}}value={projectData.github} placeholder="Git hub Url" />
                         </FloatingLabel>
                    </div>

                    </Col>
                    <FloatingLabel controlId="Dempinp" label="Demo Url">
                     <Form.Control type="text"  onChange={(e)=>{setProjectData({...projectData,demo:e.target.value})}} value={projectData.demo}placeholder="Demo Url" />
                     </FloatingLabel>
                </Row>
            </div>
        
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

    
    </>
  )
  }

export default Edit