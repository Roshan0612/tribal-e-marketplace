import React from 'react'
import Layouts from '../components/Layout/Layouts'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <Layouts title='search results'>
          <div className='container'>
               <div className='text-center'>
                  <h1>search results</h1>
                  <h6>{values?.results.length <1 ? "results not found": `found ${values.results.length}` }</h6>
               </div>
          </div>
          {values?.results.map(p=>
            (
              
                <div className="card m-2" style={{ width: '18rem' }} >
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                    className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,20)}...</p>
                        <p className="card-text">${p.price}</p>
                        <button className='btn btn-primary'>More Details</button>
                        <button className='btn btn-secondary m-2'>Add To Cart</button>

                    </div>
                </div> 
            ))}
    </Layouts>
  )
}

export default Search