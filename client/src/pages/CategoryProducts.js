import React, { useState,useEffect } from 'react'
import Layouts from '../components/Layout/Layouts'
import { useAuth } from '../context/Auth';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';


const CategoryProducts = () => {
    const [products,setProducts]=useState([]);
    const [category,setCategory]=useState([]);
    const params =useParams();
    const [auth]=useAuth();
    useEffect(() => {
      if(params?.slug)  getProductByCategory();
    }, [params?.slug])
    
    const getProductByCategory= async()=>{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-wise-product/${params.slug}`,
            {
                headers: {
                  Authorization: auth?.token, 
                },
            }
        )
        setProducts(data?.products)
        setCategory(data?.category)
        
    }
  return (
    <Layouts>
        <div className='container mt-3'>
          <div className='text-center'>{category?.name}</div>
          <div className='text-center'>{products?.length}</div>
          {products.map(p=>
            (
              <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                <div className="card m-2" style={{ width: '18rem' }} >
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                        className="card-img-top" alt={p.name} />
                   <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        
                    </div>
                </div>
              </Link>
            )
            )}
        </div>
    </Layouts>
  )
}

export default CategoryProducts