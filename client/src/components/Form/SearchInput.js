import React, { useState } from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/Auth'
const SearchInput = () => {
    const [values,setValues]=useSearch()
    const navigate =useNavigate();
    const [auth]=useAuth()
    
    const  handleSubmit = async(e)=>{
      try {
        e.preventDefault();
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search-product/${values.keyword}`,
          {
            headers: {
              Authorization: auth?.token, 
            },
          }
        )
          setValues({...values,results:data})
          navigate("/search")
      }catch (error) {
          console.log(error)
      }
   } 
  return (
<div>
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
       <input
       className="form-control me-2"
       type="search"
       placeholder="Search"
       aria-label="Search"
       value={values.keyword}
       onChange={(e)=> setValues({ ...values , keyword: e.target.value })}
       />
       <button className="btn btn-outline-success" type="submit">
           Search
       </button>
    </form>

    </div>
  )
}

export default SearchInput