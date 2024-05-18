import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../services/server_url'
import { toast } from 'react-toastify';
import { updateProfile } from '../services/allApi';

function Profile() {
  const [user,setUser]=useState({
    id:"",username:"",email:"",password:"",github:"",linkedin:"",profile:""
  })
  const [open,Setopen]=useState(false)
  const [existingProfile,setExistingProfile]=useState("")
  const [preview,setPreview]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      const userDetails=JSON.parse(sessionStorage.getItem('useDetails'))
      setUser({
        id:userDetails._id,username:userDetails.username,email:userDetails.email,password:userDetails.password
        ,github:userDetails.github,linkedin:userDetails.linkedin,profile:""})
        setExistingProfile(userDetails.profile)
        
    }
  },[open])
  // console.log(user)

  useEffect(()=>{
    if(user.profile){
      setPreview(URL.createObjectURL(user.profile))
    }
    else{
      setPreview("")
    }
  },[user,Profile])
  console.log(user)

  const handleProfileUpdate= async ()=>{
    console.log(user)
    const {username,password,email,github,linkedin,profile}=user
    if(!username || !password || !email || !github || !linkedin ||!profile){
      toast.warning("Enter valid inputs!")
    }
    else{
      const formData = new FormData()
      formData.append("username",username)
      formData.append("password",password)
      formData.append("email",email)
      formData.append("github",github)
      formData.append("linkedin",linkedin)
      preview?formData.append("profile",profile):formData.append("profile",existingProfile)
      

      const header={
        "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
        "Content-Type":preview?"multipart/form-Data":"application/json"
      }
      const result = await updateProfile(header,formData)
      if(result.status==200){
        console.log(result.data)
        toast.success("Profile Successfully Updated")
        sessionStorage.setItem("useDetails",JSON.stringify(result.data))
        Setopen(!open)
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
 
  return (
   <>
      <div className='p-5 border shadow border-3 m-3'>
        <div className='d-flex justify-content-between my-3'>
          <h2 className='' style={{color:"#e1141e"}}>Profile</h2>
         <button className='btn' onClick={()=>{ Setopen(!open)}}>
            {/* <i className="fa-solid fa-check" style={{color:'#106a30'}}></i> */}
            <i className="fa-solid fa-down-long"></i>
         </button>
        </div>
     {
          open &&
        <div>
           <label >
            <input type="file"  name='' onChange={(e)=>setUser({...user,profile:e.target.files[0]})} style={{display:'none'}} className="mb-3"/>

           {
            existingProfile=="" ?
            <img className='img-fluid' src={ preview?preview:"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"}  width={'150px'} alt=""></img>
            :
            <img className='img-fluid' src={preview?preview:`${server_url}/uploads/${existingProfile}`}  width={'150px'} alt=""></img>

           }
       
           </label>

       <FloatingLabel controlId="Username" label="Username" className="mb-3" >
            <Form.Control type="text" placeholder="User Name" value={user?.username} onChange={(e)=>setUser({...user,username:e.target.value})} />
        </FloatingLabel>
        <FloatingLabel controlId="git" label="GitLink">
           <Form.Control type="text" placeholder="Git Account Url" value={user?.github} className="mb-3" onChange={(e)=>setUser({...user,github:e.target.value})}  />
         </FloatingLabel>
         <FloatingLabel controlId="Linkedin" label="Linkd In Url">
           <Form.Control type="text" placeholder="LinkdIn Url" value={user?.linkedin} onChange={(e)=>setUser({...user,linkedin:e.target.value})} />
         </FloatingLabel> 
         <div className='d-grid mt-3'>
          <button className='btn btn-block btn-warning' onClick={handleProfileUpdate}>Update</button>
          </div>
          </div>
     
      }
      </div>
     
   </>
  )
}

export default Profile