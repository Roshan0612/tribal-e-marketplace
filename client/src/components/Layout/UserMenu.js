import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="text-center">
      <nav className="list-group">
        <h4>user Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item"
        >
          profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item"
        >
         order
        </NavLink>
        
        
      </nav>
    </div>
  );
}

export default UserMenu;
