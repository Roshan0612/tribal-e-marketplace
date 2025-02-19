import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layouts from '../../components/Layout/Layouts'

const Users = () => {
  return (
    <Layouts>
        
         <div className='row'>
           <div className='col-md-3'>
              <AdminMenu/>
           </div>

           <div className='col-md-9'>
           <h3> all Users</h3>
           </div>
           
         </div>
      
    </Layouts>
  )
}

export default Users