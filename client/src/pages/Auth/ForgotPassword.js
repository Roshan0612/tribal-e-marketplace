import React from 'react'
import Layouts from '../../components/Layout/Layouts'


import {toast}  from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  
        const [email,setEmail]=useState("");
        const [answer,setAnswer]=useState("");
        const [newpassword,setnewPassword]=useState("");
        const navigate =useNavigate();
     
        const handleSubmit=async(e)=>{
          e.preventDefault();
          try {
              const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                                             {email,answer,newpassword}
                                             
              );
              console.log(res);
              if(res.data.success){
                  toast.success(res.data.message);
                  navigate("/login");

              }else{
                  toast.error("something went wrong !");
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
             <label >RESET PASSWORD</label>
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
          <input type="text" 
                 value={answer}
                 onChange={(e)=> setAnswer(e.target.value)}
                 className="form-control" 
                  
                 placeholder='Enter your answer'
                 required  />
        </div>
        <div className="mb-3">
          <input type="password" 
                 value={newpassword}
                 onChange={(e)=> setnewPassword(e.target.value)}
                 className="form-control"  
                 placeholder='enter the new password '
                 required  />
          
        </div>
        <button type="submit" 
                className="btn btn-primary w-100"
                >RESET PASSWORD</button>
      </form>
    </div>
    </Layouts>
    </>
        )
      } 

  

export default ForgotPassword