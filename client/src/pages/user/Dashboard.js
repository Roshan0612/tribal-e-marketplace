import React from 'react'
import Layouts from '../../components/Layout/Layouts'
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/Auth';
const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layouts title='Dadhboard-Your Orders'>
      <h1>User  Dashboard</h1>
      <div className='container-fluid'>
         <div className='row'>
           <div className='col-md-3'>
              <UserMenu/>
           </div>
           <div className='col-md-9'>
             <div className='card w-75 p-3'>
             <h3>User Name : {auth?.user?.name}</h3>
             <h3>User Email: {auth?.user?.email}</h3>
             <h3>User Contact : {auth?.user?.address}</h3>
             <h3> User Role : {auth?.user?.role}</h3>
             </div>
            
           </div>
         </div>
      </div>
    </Layouts>
  )
}

export default Dashboard;