import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../spinner/Spinner';
import { useNavigate } from 'react-router-dom';
export default function AdminPrivateRoute(){
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const  authCheck= async() =>{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,{
                headers:{
                    "Authorization" : auth?.token
                }
            });
            if(res.data.ok ){
            
              setOk(true)
              console.log("role:", res.data.auth?.user?.role);  // Access role correctly from res.data
              console.log("user:", res.data.auth?.user);  // Log the entire user object

              console.log("roll:",res.auth?.user?.role);
             
            }else{
              setOk(false)

            //   navigate('/');
            }
        } ;  
        if(auth?.token) authCheck();
    },[auth?.token]);

    
    return ok? <Outlet/> : <Spinner path="/"/>
}