import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useAuth } from '../context/Auth'

const useCategory = () => {
    const [categories,setCategories]=useState([])
    const [auth] = useAuth()
    useEffect(() => {
      getAllCategories();
  }, [])
    const getAllCategories = async()=>{
         try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`,
                {
                  headers: {
                    Authorization: auth?.token, 
                  },
                })
            setCategories(data?.category);
         } catch (error) {
            console.log(error)
           
         }
         
    }
    useEffect(() => {
        getAllCategories();
    }, [auth?.token])
    
  return categories;
}

export default useCategory;