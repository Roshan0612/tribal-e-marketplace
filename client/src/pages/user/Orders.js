import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layouts from '../../components/Layout/Layouts'

const Orders = () => {
  return (
    <Layouts title='Your Orders'>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    orders
                </div>
            </div>
        </div>
    </Layouts>
  )
}

export default Orders