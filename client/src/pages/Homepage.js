import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Layouts from '../components/Layout/Layouts';
import { useAuth } from '../context/Auth';
import axios from 'axios';
import Prices from '../components/Prices'
import { Checkbox, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

const Homepage = () => {
  const [auth]=useAuth();
  const [products,setProducts] = useState([]);
  const [categories,setCategories]=useState([]);
  const [checked,setchecked] =useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]= useState(false);
  const [cart,setCart]=useCart([]);
  const navigate = useNavigate()
  const GetAllProducts = async() =>{
    try {
      const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-product`,
        {
          headers:{
            Authorization:auth?.token,
          },
        },
      );
      console.log(auth?.token);

      setProducts(data.products);
    } catch (error) {
      
      console.log(error)
    }
  }
  useEffect(() => {
    GetAllProducts();
  
    
  }, [auth?.token]);
  
  const getAllCategory=async()=>{
     try {
      const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`,
        {
          headers:{
            Authorization:auth?.token,
          },
        },
      );
      setCategories(data?.category);
     } catch (error) {
      console.log(error);
     } 
  }
  useEffect(() => {
    if(!radio.length || !checked.length) getAllCategory();
  }, [radio.length,checked.length])
  
  const handleFilter=(value,id)=>{
      let all = [...checked]
      if(value){
        all.push(id);
      }else{
        all = all.filter( (c) => c !== id)
      }
      setchecked(all);
  }
  useEffect(() => {
    if(radio.length || checked.length) FilterProduct(); 
  }, [radio,checked]);

const FilterProduct=async()=>{
    try {
     const {data} =await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked,radio},
       {
         headers:{
           Authorization:auth?.token,
         },
       },
     );
     setProducts(data?.products);
    } catch (error) {
     console.log(error);
    } 
}
const TotalCount =async()=>{
         try {
          const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`,
            {
              headers:{
                Authorization:auth?.token,
              },
            },
          );
        
          setTotal(data?.total);
          
         } catch (error) {
          console.log(error)
         }
}
useEffect(() => {
  TotalCount();
}, [])

// product-list/:page


 
 
  return (
    <Layouts title={"All Products - Best Offers!"}>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
             {categories?.map((c)=>(
             <Checkbox key={c._id}  onChange={(e)=> handleFilter(e.target.checked,c._id)}>
               {c.name}
             </Checkbox>
          ))}
          </div>
          
          {/* filter by prices */}
       
          <h4 className='text-center'>Filter By Prices</h4>
          <div className='d-flex flex-column'>
             
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices.map(p=>(
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
              </Radio.Group>
              <button onClick={ ()=> window.location.reload()}>RESET FILTERS</button>
         
          </div>

        </div>
        <div className='col-md-9'>
        {JSON.stringify(checked,null,4)}
          {JSON.stringify(radio,null,4)}
          <h1 className='text-center'>All Products</h1>  
          <div> {total}</div> 
          <div className='d-flex flex-wrap'>
           
            {products.map(p=>
            (
              
                <div className="card m-2" style={{ width: '18rem' }} >
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                    className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,20)}...</p>
                        <p className="card-text">${p.price}</p>
                        <button className='btn btn-primary' 
                                onClick={ ()=> 
                                  navigate(`/product/${p.slug}`

                                )}
                        >More Details</button>
                        <button classNme='btn btn-secondary m-2'
                         onClick={()=>{                          
                         setCart([...cart,p])
                         localStorage.setItem("cart",JSON.stringify([...cart,p]))                          
                         }} >Add To Cart</button>                        
                    </div>
                </div> 
            ))}
          </div>
          <div className='m-2 p-2'>
            {products && products.length <total  && (
              <button 
                className='btn btn-warning' 
                onClick={ (e)=>{
                e.preventDefault();
                setPage(page+1);
                }}>
               { loading ? "loading..." : "loadmore"}
              </button>
            )}
          </div>

        </div>
      </div>
    </Layouts>
  );
};

export default Homepage;
