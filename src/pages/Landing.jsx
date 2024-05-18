import React,{useEffect, useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Projectcards from '../components/Projectcards'
import { homeProjects } from '../services/allApi'
import image from '../img/img.jpg'

function Landing() {

  const [token,setToken]=useState("")
  const [projects,setProjects]=useState([])
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
    getHomeProjects()
  },[])

  const getHomeProjects = async()=>{
    const result = await homeProjects()
    // console.log(result)
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }
  console.log(projects)


  return (
    <>
      <div className='w-100 d-flex p-5 align-items-center' style={{height:'100vh',backgroundColor:'#ffffff'}}>
        <Row>
            <Col className='align-items-center d-flex'>
                <div>
                    <h1 className='mb-2 display-4 ' style={{color:'#A4076B'}}>ProjectFair</h1>
                    <p style={{textAlign:'justify',color:'#000000',fontSize:'20px'}} className=''> It was popularised in the  with the release of Letraset sheets 
                    containing Lorem Ipsum passages,
                     and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    {/* <button className='btn ' style={{backgroundColor:'#EE850E',color:'#ffffff'}}>Start to explore.....</button> */}
                    {
                      token ?
                      <Link className='btn btn-warning' to={'/dash'}>Manage Your Projects</Link>
                      :
                      <Link className=' btn btn-success' to={'/auth'} >start To Explore</Link>
                    }
                    
                </div>
            </Col>
            <Col>
             <img src="https://media.istockphoto.com/id/1272623962/vector/website-development-concept-group-of-developers-and-designers-create-website-teamwork.jpg?b=1&s=170667a&w=0&k=20&c=8YuGQd0aZ2rLkD4SXe4fOcKWssOiAsrvDGkbxdbjId0="width={'990px'} height={'990px'}className='img-fluid' alt=''/>
            </Col>
        </Row>
      </div>
      <div className='p-5 w-100'>
        <h2 className='text-center mt-3 mb-3'style={{color:'#BC1854'}}>Projects for you...</h2>
        <marquee behavior='' direction=''>
            <div className='d-flex justify-content-evenly mt-2'>
              {
                projects.length>0 ?
                projects.map(item=>(
                  <Projectcards project={item}/>
                ))
                :
                <h5>No Projects Available</h5>
              }
             
             

               
               
            </div>
        </marquee>
        <div className='text-center mt-4' style={{fontSize:'20px'}}>
            <Link to={'/projects'}>Click for me</Link>
        </div>
      </div>
      

    
    </>
   
   
  )
}

export default Landing