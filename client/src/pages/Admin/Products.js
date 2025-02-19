import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layouts from '../../components/Layout/Layouts'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/Auth'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products,setProducts]=useState([]);
    const [auth]=useAuth();
    
        const GetAllProducts = async()=>{
            try {
                const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-product`,
                {
                    headers: {
                     Authorization: auth?.token, 
                    },
                });
                setProducts(data.products)

            } catch (error) {
                  toast.error("cannot get(shows) all products")
            }
        }
    useEffect(() => {
      GetAllProducts();
    }, [])
    
  return (
    <Layouts>
      <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>all product list</h1>
            <div className='d-flex  flex'>
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
        </div>
        
      </div>
    </Layouts>
  )
}

export default Products