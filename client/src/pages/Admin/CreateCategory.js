import React,{useEffect,useState} from 'react'
import Layouts from '../../components/Layout/Layouts'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/Auth';
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'
const CreateCategory = () => {
  const [categories,setCategories]=useState([]);
  const [auth]=useAuth();
  const [name,setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedName,setupdatedName]=useState("");
  const [selected,setSelected] = useState(null);
  
  const handleSubmit=async(e)=>{
     e.preventDefault();
     try {
       const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name},
        {
          headers: {
            Authorization: auth?.token, 
          },
        }
        )
       if(data.success){
            toast.success(`${name} is created!!!`)
            getAllCategory();

       }else{
        toast.error(data.message);
       }
     } catch (error) {
        toast.error("cannot create a category!!!")
     }
  }
  const getAllCategory = async () => {

    try {
     
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`, {
        headers: {
          Authorization: auth?.token 
        }
      });
  
      if (data.success) {
        setCategories(data.category);  
      }
    } catch (error) {
       toast.error("Something went wrong while getting category");
    }
  };
  
  
useEffect(() => {
  
  getAllCategory();

}, [])

//updating the categories
const updatehandle=async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        {name:updatedName},
        {
          headers: {
            Authorization: auth?.token, 
          },
        }
        )
        
        
      if(data.success){
        toast.success(updatedName);
        setSelected(null);
        setupdatedName("")
        setVisible(false);
        getAllCategory();

        

      }
    } catch (error) {
      toast.error("cannot edit the category!!!")
    }
}
//deleting the categories
const deletehandle=async(pId)=>{
 
  try {
    const {data} = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`,
      {
        headers: {
          Authorization: auth?.token, 
        },
      }
      )
      
      
    if(data.success){ 
      toast.success("category deleted succssfully!!!");
      getAllCategory();
    }
  } catch (error) {
    toast.error("cannot DELETE the category!!!")
  }
}

  return (
    <Layouts>
    <div className="row">
      
      <div className="col-md-3">
        <AdminMenu />
      </div>

      <div className="col-md-9">
        <h3>Manage Categories</h3>
        <div className='p-3'>
           <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
        </div>
        <div className='w-75'>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>
                    <button className="btn btn-primary ms-2" onClick={() => {
                        setVisible(true); 
                        setupdatedName(c.name); 
                        setSelected(c);
                    }} >Edit</button>

                             
                    <button className="btn btn-danger ms-3" 
                    onClick={() => {deletehandle(c._id)}
                        
                    } >Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
        <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
           <CategoryForm  value={updatedName} setValue={setupdatedName} handleSubmit={updatehandle}/>
        </Modal>
      </div>
    </div>
    </Layouts>
    
  )
}

export default CreateCategory