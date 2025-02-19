import { useState,useEffect,createContext,useContext } from "react";

//created context
const CartContext = createContext();

const CartProvider = ({children})=>{

    const [cart,setCart] = useState([]);
    useEffect(() => {
      const existingUser = localStorage.getItem("cart")
      if(existingUser){
        setCart(JSON.parse(existingUser));
      }
      
    }, [])
    
    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    );
};
const useCart = () => useContext(CartContext);

export {useCart,CartProvider};