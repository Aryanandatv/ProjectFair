import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import {Row,Col} from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { deleteProject, userProjects } from '../services/allApi'
import { addprojectResponseContext } from '../../Context Api/Contextapi'
import { editprojectResponseContext } from '../../Context Api/Contextapi'
import { toast } from 'react-toastify'

function Dashboard() {
  const {addProjectResponse,setAddProjectResponse}=useContext(addprojectResponseContext)
  const {editProjectResponse,setEditProjectResponse}=useContext(editprojectResponseContext)
  const [user,setUser]=useState("")
  const [projects,setProjects]=useState([])
  useEffect(()=>{
    setUser(sessionStorage.getItem("username"))
    getData() 
  
  },[addProjectResponse,editProjectResponse])
  console.log(projects)
  const getData=async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result=await userProjects(header)
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }
  console.log(user,"username")

  const handleDelete = async(id)=>{
    const token=sessionStorage.getItem('token')
    console.log(id)
    const header ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result =await deleteProject(id,header)
    if(result.status==200){
      toast.success("Project Deleted Successfully")
      getData()
    }
    else{
      console.log(result)
      toast.error(result.response.data)
    }
  }
  return (
   <>
   <Header/>
   <div className='p-2'>
     <h1>Welcome <span className='text-warning'>{user}</span></h1>
   </div>
   <div className='' >
   <Row>
      <Col sm={12} md={6} className='p-3'>
      <h3>your projects</h3>
       <div className='border border-3 p-4'>
        <Add/>

        {
          projects.length > 0 ?

          projects.map(item => (
          <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded' style={{backgroundColor:'#F7CCDC'}}>
              <h4>{item.title}</h4>
              <div>
                <a href={item.github} className='btn mt-3'>
                  <i className="fa-brands fa-github fa-xl" />
                </a>
                <Edit project={item}/>

                 <button className='btn mt-3' onClick={()=>{handleDelete(item?._id)}}>
                     <i className="fa-solid fa-trash fa-xl" style={{color:"#e1141e"}}/>
                  </button>
              </div>
           </div> 

          ))
          :
          <h3 className='text-center text-center'>No Projects Available</h3>
        }
 

        {/* <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded' style={{backgroundColor:'#F7CCDC'}}>
          <h4>project title 1</h4>
          <div>
            <a href="" className='btn mt-3'>
            <i className="fa-brands fa-github fa-xl" />
            </a>
            <Edit/>
            <button className='btn mt-3'>
            <i className="fa-solid fa-trash fa-xl" />
            </button>
          </div>
        </div> */}

      </div>
      </Col>
      <Col sm={12} md={6}>
       <Profile/>
      </Col>
  </Row>  
   </div>
  

   </>
  )
}

export default Dashboard