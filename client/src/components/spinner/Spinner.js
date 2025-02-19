import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
const Spinner = ({path="/login"}) => {
    const [count,setCount]=useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setTimeout(() => {
           
            setCount((preValue) => preValue - 1);

        }, 1000);
    
        count === 0 && navigate(`${path}`,{
            state:location.pathname
        });
        return ()=> clearInterval(interval);
    }, [count,navigate,location]);
    
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 className='text-center '>redirecting in {count} sec</h1>
  <div className="spinner-border" role="status">
     
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

    </>
  )
}

export default Spinner;