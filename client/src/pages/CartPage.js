import React from 'react'
import { useEffect,useState } from 'react';
import Layouts from '../components/Layout/Layouts'
import { useAuth } from '../context/Auth'
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import Razorpay from 'razorpay';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
const CartPage = () => {
  
  const [auth,setauth] = useAuth();
  const [cart,setCart] = useCart();
  const navigate = useNavigate();
  
  console.log(auth?.user);

  const totalCost=()=>{
   try {
    let total = 0;
    cart?.map((item)=> {
      // total = total + item.price;
      total =total + parseFloat(item.price); 
 
    });
    return total
   }catch (error) {
    console.log(error);
   }
  }
  const removeProductFromCart=(pid)=>{
     try {
      const myCart= [...cart];
      const index = myCart.findIndex(item=>  item._id === pid)
      myCart.splice(index,1)
      localStorage.setItem("cart", JSON.stringify(myCart)); 

      
      setCart(myCart);
     } catch (error) {
      console.log(error)
     }
  }
  const handlePayment = async () => {
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/create-payment`,

          { cart, total: totalCost(),},
          {
              headers: {
                Authorization: auth?.token, 
              },
          });

        // const data = await response.json();
        console.log("order data:", data);
        
        if (data.success) {
            const order = data.order;
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay key ID from .env
                amount: order.amount, // The amount to be paid
                currency: "INR",
                name: "E-commerce Store",
                description: "Payment for order",
                order_id: order.id,
                handler: async function (data) {
                    // Send the payment details for verification
                    const verifyResponse = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/verify-payment`, {               
                            razorpay_payment_id: data.razorpay_payment_id,
                            razorpay_order_id: data.razorpay_order_id,
                            razorpay_signature: data.razorpay_signature,},
                            {
                              headers: {
                                Authorization: auth?.token, 
                              },
                            }
                          
                          );
                          console.log("order data:", data)
                    // const verifyData = await verifyResponse.json();
                    console.log("verifyResponse:", verifyResponse);
                    if (verifyResponse?.success) {
                        alert("Payment successful!");
                        navigate("/order-success"); // Redirect to order success page
                    } else {
                        alert("Payment verification failed");
                    }
                },
                theme: {
                    color: "#F37254",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        }
        

    } catch (error) {
        console.log(error);
        alert("Error during payment initiation");
    }
};


  return (
    <Layouts>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                  <h3 className='text-center'>
                  
                    { ` hello ${auth?.token && auth?.user?.name}`}
                  </h3>
                  <h4 className='text-center'>
                    { cart.length > 0 ?`You Have ${cart.length} Item in the cart  ${auth?.token? "" :"please login the to checkout!"}` :"your cart is empty"}
                  </h4>
                </div>
            </div>
            <div className='row'>
              <div className='col-md-8 '>All added product 
                {cart?.map((p)=>(
                <div className='row card m-2 flex-row'>
                  <div className='col-md-4'>
                    { 
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                       className="card-img-top"  width={"80px"} height={"100%"} 
                      />
                    }

                  </div>
                  <div className='col-md-4'>
                    <p> {p.name}</p>
                    <p> {p.description.substring(0,20)}</p>
                    <p> ${p.price}</p>
                    <button className='btn btn-danger m-1' onClick={()=> removeProductFromCart(p._id)}>remove</button>
                  </div>
                </div>
                ))}
                
              </div>
              <div className='col-md-4 text-center'>
                <h1 className='m-4'>Cart Summary</h1>
                <h2>checkout | payment</h2>
                <h4>Total:${totalCost()}</h4>
                { auth?.user?.address?(
                  <>
                    <h4>Current Address</h4>
                     {auth?.user?.address}
                    <div> 
                          <button className='btn btn-outline-warning' 
                                   onClick={()=> 
                                    navigate(`/dashboard/user/profile/`)}
                          > change address
                          </button>
                    </div>
                 </> 
                ):(
                    <div className='mb-3'>
                     {auth?.token ?(
                      <button className='btn btn-outline-warning' 
                      onClick={()=> 
                       navigate(`/dashboard/user/profile/`)}
                      > change address</button>
                    ):( 
                      <button className='btn btn-outline-warning' 
                      onClick={()=> 
                       navigate(`/login/`,{state: "/cart"})
                      }
                       
                      > Please Login to checkout </button>
                    )}
                    </div>
                  
                  )}
                  <button className="btn btn-success" onClick={handlePayment}>Pay Now</button>
    
 
              </div>
            </div>
        </div>
    </Layouts>
  )
}

export default CartPage