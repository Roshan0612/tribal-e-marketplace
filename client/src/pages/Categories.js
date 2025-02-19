import React from 'react'
import Layouts from '../components/Layout/Layouts'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layouts>
        <div className='container'> All Categories!
            <div className='row'>
                {categories.map((c)=>(
                   <div className='col-md-6'>
                       <button  className='btn btn-primary' key={c._id}>
                        <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                       </button>
                   </div>
                ))}
                
            </div>
        </div>
    </Layouts>
  )
}

export default Categories