import React from 'react'
import Layouts from '../../components/Layout/Layouts'
import {toast}  from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
      const [name,setName]=useState("");
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const [phonenumber,setPhonenumber]=useState("");
      const [address,setAddress]=useState("");
      const [answer,setAnswer]=useState("");
      const navigate =useNavigate();
      
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res =await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                                           {name,
                                            email,
                                            password,
                                            phonenumber,
                                            address,
                                            answer}
            );
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }else{
                toast.error("something went wrong");
            }
        } catch (error) {
            console.log(error)
        }
        
      }

  return (
    <>
    <Layouts title={"Register-Ecommerse App"}>
    <div className="d-flex justify-content-center align-items-center vh-100">
    
      <form  onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm" 
            style={{ width: '350px' }}>
      <div className="mb-3">
             <label >Register Form</label>
         </div>
        <div className="mb-3">
          <input type="text"
                 value={name}
                 onChange={(e)=>{setName(e.target.value)}} 
                 className="form-control" 
                  
                 placeholder='Enter your Name' 
                 required />
        </div>
        <div className="mb-3">
          <input type="email" 
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                 className="form-control" 
                  
                 placeholder='Enter your Email'
                 required  />
        </div>
        <div className="mb-3">
          <input type="password" 
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 className="form-control"  
                 placeholder='Enter your Password'
                 required  />
          
        </div>
        <div className="mb-3">
          <input type="text" 
                 value={phonenumber}
                 onChange={(e)=> setPhonenumber(e.target.value)}
                 className="form-control" 
                  
                 placeholder='Enter your Phone number'
                 required />
          
        </div>
        <div className="mb-3">
          <input type="text" 
                 value={address}
                 onChange={(e)=> setAddress(e.target.value)}
                 className="form-control" 
                 placeholder='Enter Your Address' 
                 required />
                 
        </div>
        <div className="mb-3">
          <input type="text" 
                 value={answer}
                 onChange={(e)=> setAnswer(e.target.value)}
                 className="form-control" 
                 placeholder='what is your good habit? ' 
                 required />
                 
        </div>
       
        <button type="submit" 
                className="btn btn-primary w-100"
                >Submit</button>
      </form>
    </div>
    </Layouts>
    </>
  )
}

export default Register