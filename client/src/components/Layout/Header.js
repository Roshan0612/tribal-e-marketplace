import React from 'react'
import  {NavLink,Link} from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import Dashboard from '../../pages/user/Dashboard';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Avatar, Badge, Space } from 'antd';
const Header = () => {
  const [auth,setAuth]=useAuth();
  const [cart,setCart]=useCart()
  const categories=useCategory([]);
  const handleLogout=()=>{
    setAuth({
      ...auth,
    user:null,
    token:""
    });
 
    localStorage.removeItem('auth');

  }
  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand" to="#">
            🛒 E-commerse
        </Link>

        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links on the right (collapsed in smaller screens) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">  {/* ms-auto for right-alignment */}
            <SearchInput/>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" 
                href="#" role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li >   
                      <NavLink className="dropdown-item" to={`/categories`}>
                        All Categories
                      </NavLink>
                  </li>
                {categories?.map((c) => (
                  
                  <li key={c._id}> 
                      
                      <NavLink className="dropdown-item" to={`/category/${c.slug}`}>
                         {c.name}
                      </NavLink>
                  </li>
                ))}
                </ul>
            </li>


            {!auth.user? (
              <>
              <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
              </>
            ):(
            <>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth?.user?.name}
              </button>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role ===1 ? `admin` : `user` }`} >Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                </li>             
              </ul>
            </div>
            </> 
              )}
            
            <li className="nav-item">
                <Badge count={cart?.length}  showZero>
                  <NavLink className="nav-link" to="/cart">
                      Cart 
                  </NavLink>
                </Badge>                            
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header