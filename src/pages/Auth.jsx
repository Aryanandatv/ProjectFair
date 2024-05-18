import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useRegister, userLogin } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../../Context Api/AuthContext';


function Auth() {
    const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

    const [status, setStatus] = useState(true)

    const [data,setData]=useState({
        username:"",password:"",email:""
    })
    const navigate=useNavigate()
    // console.log(data)

    const changeStatus = () => {
        setStatus(!status)
    }
    
    const handleRegister = async ()=>{

        console.log(data)
        const { username,password,email} = data
        if ( !username || ! password || ! email ){
            // console.log("failed")
            toast.warning("Invalid Details!! Please fill Valid Details!")
        }
        else{
            // console.log("success")
            const result=await useRegister(data)
            console.log(result)
            if (result.status==201){
                toast.success("User Registration Successfull!")
                setData({username:"",password:"",email:""})
                setStatus(true)
            }
            else{
                toast.error(result.response.data)
            }

        }
    }

    const handleLogin=async()=>{
        const {email,password}=data
        if(!email ||!password){
            toast.warning("Invalid details!!... Enter Form Details Properly..")
        }
        else{
            const result=await userLogin({email,password})
            console.log(result)
            if(result.status==200){
                sessionStorage.setItem("token",result.data.token)
                console.log(result)
                sessionStorage.setItem("username",result.data.user)
                sessionStorage.setItem("useDetails",JSON.stringify(result.data.userDetails))
                toast.success("Login Successfully!!")
                setAuthStatus(true)
                navigate('/') 
            }
            else{
                toast.error(result.response.data)
            }
          
        

        }
        
    }
    

    return (
        <>

            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                <div className='shadow border w-50 p-4'style={{backgroundColor:"#FF8E8F"}}>
                    <Row>
                        <Col sm={12} md={6}>
                            <img src="https://static.vecteezy.com/system/resources/previews/006/405/794/non_2x/account-login-flat-illustration-vector.jpg" width={'990px'} height={'990px'} alt="" className='img-fluid' />
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                status ?
                                    <h3 className='' style={{fontSize:"35px",color:'#9B3922'}}>Login</h3>
                                    :
                                    <h3>Register</h3>

                            }

                            <div className='mt-4'>
                                {
                                    !status &&
                                    <FloatingLabel controlId="user" label="user name" className="mb-3" >
                                        <Form.Control type="text" placeholder="Enter Username" onChange={(e)=>{setData({...data,username:e.target.value})}} />
                                    </FloatingLabel>
                                }

                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
                                    <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>{setData({...data,email:e.target.value})}} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                                    <Form.Control type="password" placeholder=" Enter Password" onChange={(e)=>{setData({...data,password:e.target.value})}}  />
                                </FloatingLabel>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                                {/* <button className='btn btn-info'> */}
                                    {
                                        status ?
                                            <button className='btn btn-success' onClick={handleLogin}>
                                              <span className=''>Login</span>
                                            </button>
                                            :
                                            <button className='btn btn-info' onClick={handleRegister}>
                                               <span>Register</span>
                                             </button>
                                            
                                    }
                               
                                <button className='btn btn-link' onClick={changeStatus}>
                                    {
                                        status ?
                                            <span className='' style={{color:"#000000"}}>Are you new ?</span>
                                            :
                                            <span>Already a user ?</span>
                                    }
                                </button>

                            </div>
                        </Col>
                    </Row>
                   

                </div>
            </div>

        </>
    )
}

export default Auth