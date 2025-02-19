import React from 'react'
import Layouts from '../../components/Layout/Layouts'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/Auth'
const AdminDashboard = () => {
  const [auth] =useAuth();
  return (
    <Layouts>
      <h1>Admin  Dashboard</h1>
      <div className='container-fluid'>
         <div className='row'>
           <div className='col-md-3'>
              <AdminMenu/>
           </div>
           <div className='col-md-9'>
             <div className='card w-75 p-3'>
             <h3>Admin Name : {auth?.user?.name}</h3>
             <h3>Admin Email: {auth?.user?.email}</h3>
             <h3>Admin Contact : {auth?.user?.phonenumber}</h3>
             <h3>Admin Role : {auth?.user?.role}</h3>
             </div>
            
           </div>
         </div>
      </div>
    </Layouts>
  )
}

export default AdminDashboard