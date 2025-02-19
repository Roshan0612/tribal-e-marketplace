import React from 'react'
import Layouts from '../../components/Layout/Layouts'
import UserMenu from '../../components/Layout/UserMenu'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/Auth'

const Profile = () => {
      const [auth,setauth]=useAuth();
      const [name,setName]=useState("");
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const [phonenumber,setPhonenumber]=useState("");
      const [address,setAddress]=useState("");
     
      
     useEffect(() => {
        const {email,name,phonenumber,address}=auth?.user;
        setName(name);
        setEmail(email);       
        setPhonenumber(phonenumber);
        setAddress(address);
     
       
     }, [auth.user])
      
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data} =await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/user-update-profile`,
                                           {name,
                                            email,
                                            password,
                                            phonenumber,
                                            address,
                                           },
                                           {
                                            headers: {
                                              Authorization: auth?.token, 
                                            },
                                        }
            );
            console.log("data::",data)
           if (data?.error) {
              console.log(data.error)
              

           } else {
            setauth({...auth,user:data?.updatedUserProfile})
             let ls =localStorage.getItem("auth")
             ls = JSON.parse(ls);
             ls.user = data.updatedUserProfile
             localStorage.setItem("auth",JSON.stringify(ls));
             console.log("user uuuudating succesfuly");
           }
            
        } catch (error) {
            console.log(error)
        }
    }    
  return (
    <Layouts title='Your Profile'>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
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
                />
      </div>
      <div className="mb-3">
        <input type="email" 
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
               className="form-control" 
                disabled
               placeholder='Enter your Email'
                 />
      </div>
      <div className="mb-3">
        <input type="password" 
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
               className="form-control"  
               placeholder='Enter your Password'
                 />
        
      </div>
      <div className="mb-3">
        <input type="text" 
               value={phonenumber}
               onChange={(e)=> setPhonenumber(e.target.value)}
               className="form-control" 
                
               placeholder='Enter your Phone number'
                />
        
      </div>
      <div className="mb-3">
        <input type="text" 
               value={address}
               onChange={(e)=> setAddress(e.target.value)}
               className="form-control" 
               placeholder='Enter Your Address' 
                />
               
      </div>
     
      <button type="submit" 
              className="btn btn-primary w-100"
              >Submit</button>
    </form>
  </div>
                </div>
            </div>
        </div>
    </Layouts>
  )
}

export default Profile