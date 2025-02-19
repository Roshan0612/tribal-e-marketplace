import axios from 'axios';
import React,{ useState,useContext,useEffect,createContext } from 'react'

const authContext =createContext();

export const AuthProvider = ({children}) => {

    const [auth,setAuth]=useState({
       user:null,
       token:""
    });

  
    useEffect(()=>{
        const data=localStorage.getItem('auth');
        if(data){
        const parsedata = JSON.parse(data);
            setAuth({
              ...auth,
              user:parsedata.user,
              token:parsedata.token
            });
        }
    },[]);

  //eslint-disable-next-line
  return (
    <authContext.Provider value={[auth,setAuth]}>
          {children}
    </authContext.Provider>
  )
};
export const useAuth=() => useContext(authContext);

