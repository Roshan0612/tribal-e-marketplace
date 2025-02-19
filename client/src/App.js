
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminPrivateRoute from './components/Routes/AdminProtectedRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import CartPage from './pages/CartPage';
function App() {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/product/:slug" element={<ProductDetails/>}></Route>
        <Route path="/categories" element={<Categories/>}></Route>
        <Route path="/category/:slug" element={<CategoryProducts/>}></Route>
        <Route path="/search" element={<Search/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
                <Route path="user" element={<Dashboard/>} />
                <Route path="user/profile" element={<Profile/>} />
                <Route path="user/orders" element={<Orders/>} />        
        </Route>

        <Route path="/dashboard" element={<AdminPrivateRoute/>}>
                <Route path="admin" element={<AdminDashboard/>} />
                <Route path="admin" element={<AdminDashboard/>} />
                <Route path="admin/create-category" element={<CreateCategory/>} />
                <Route path="admin/create-product" element={<CreateProduct/>} />
                <Route path="admin/products/:slug" element={<UpdateProduct/>} />
                <Route path="admin/products" element={<Products/>} />
                <Route path="admin/create-users" element={<Users/>} />

        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/policy" element={<Policy/>}></Route>
        <Route path="/*" element={<PageNotFound/>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
