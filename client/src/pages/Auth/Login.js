import React from 'react'
import Layouts from '../../components/Layout/Layouts'
import {toast}  from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Login = () => {
       
        const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");
        const navigate =useNavigate();
        const location = useLocation()
        const [auth,setAuth] = useAuth();

        const handleSubmit=async(e)=>{
          e.preventDefault();
          try {
              const res =await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
                                             {email,password}
              );
              if(res.data.success){
                  toast.success(res.data.message);
                  setAuth({
                    ...auth,
                    user: res.data.user,
                    token:res.data.token,
                  });
                  
                  localStorage.setItem("auth",JSON.stringify(res.data));
                  navigate(location.state || "/");

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
             <label >Login form</label>
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
            <button type="button" 
                className="btn btn-primary w-100"
                onClick={() => {
                  navigate("/forgot-password");
                }}
                >FORGOT PASSWORD</button>
        </div>
        <button type="submit" 
                className="btn btn-primary w-100"
                >LOGIN</button>
      </form>
    </div>
    </Layouts>
    </>
  )
}

export default Login