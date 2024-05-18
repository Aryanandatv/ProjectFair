import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {Row,Col} from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { allProjects } from '../services/allApi'


function Projects() {
  const [projects,setProjects]=useState([])
  const [logStatus,setLogStatus]=useState()
  const [search,setSearch]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      getData()
      setLogStatus(true)
    }
    else{
      console.log("Login First")
      setLogStatus(false)
    }
  },[search])
  console.log(projects)


  const getData = async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result = await allProjects(header,search)
    console.log(result)
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }


  return (
      <>
         <Header status={true}/>
        
        <div className='p-5'>
           <div className='d-flex justify-content-between my-4 '>
           <h2>All projects</h2>
           <input type='text' name="" className =' form-control w-25 ' placeholder='Enter Languages for Project Search'onChange={(e)=>{setSearch(e.target.value)}} id=""/>
          </div>
          {
            logStatus ?
            <Row>
              {
                projects.length >0 ?
                projects.map(item =>(
                  <Col>
                     <Projectcards project={item}/>
                   </Col>

                ))
                :
                <h2 className='text-center text-danger'>No Projects Available </h2>
              }
            
            </Row>
            :
            <h1 className='text-center text-danger'>Please Login First To Get Projects !</h1>
          }
        </div>
      </>
  )
}

export default Projects