
import React,{ useState,useContext,createContext } from 'react'

const searchContext =createContext();

export const SearchProvider = ({children}) => {

    const [auth,setAuth]=useState({
       keyword:"",
       results:[]
    });

  
    

  //eslint-disable-next-line
  return (
    <searchContext.Provider value={[auth,setAuth]}>
          {children}
    </searchContext.Provider>
  )
};
export const useSearch=() => useContext(searchContext);

