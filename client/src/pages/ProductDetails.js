import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/Auth';
import Layouts from '../components/Layout/Layouts';

const ProductDetails =() => {
    const [products,setProducts]=useState([]);
    const [auth] = useAuth();
    const params = useParams();
    const [similarProducts,setSimilarProducts]=useState([]);
    const navigate =useNavigate()
 const getSingleProducts=async()=>{
    try {
       const { data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`,
       
        {
            headers: {
              Authorization: auth?.token, 
            },
        });
        console.log(data); // Look at the structure of data

        setProducts(data.products)
        getSimilarProducts(data.products._id,data?.products?.category._id)
    } catch (error) {
        console.log(error)
    }

  }
  useEffect(() => {
    if(params?.slug) getSingleProducts();
    
  }, [params?.slug])
  
  //get Similar products to product
  const getSimilarProducts=async(pId , cId)=>{
    try {
        const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-product/${pId}/${cId}`,
            {
                headers: {
                  Authorization: auth?.token, 
                },
            }   
        )
        setSimilarProducts(data?.products)
        console.log("data: ",data)
    } catch (error) {
        console.log(error);
    }
  }
  return(
    <Layouts>
        <div> 
            <h1>product details</h1>
            <div className='row container'>
                <div className='col-md-6'>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${products?._id}`} 
                        className="card-img-top" alt={products.name} />
                </div>
                <div className='col-md-6'>
                    <h3 className='text-center'>Product Details</h3>
                    <h6>Name: {products.name}</h6>
                    <h6>Description: {products.description}</h6>
                    <h6>Price: {products.price}</h6>
                    <h6>Category: {products?.category?.name || 'N/A'}</h6>


                    <button className='btn btn-secondary m-2'>Add To Cart</button>
                </div>
            </div>
            <div className='row container'>
                <h6 >similar products</h6>
                { similarProducts.length < 1 && <p className='text-center'>No similar product Found</p>}
                 {/* {JSON.stringify( similarProducts , null , 4 )}  */}
                 {similarProducts?.map(p=>
            (
              
                <div className="card m-2" style={{ width: '18rem' }} >
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                    className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,20)}...</p>
                        <p className="card-text">${p.price}</p>
                        <button className='btn btn-primary' onClick={ ()=> navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className='btn btn-secondary m-2'>Add To Cart</button>

                    </div>
                </div> 
            ))}
            </div>
            
        </div>
    </Layouts>
  )
}

export default ProductDetails