import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:5000";
    const [token, setToken] = useState("");

    const [bag_list, setBagList] = useState([]);

    const addToCart = (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems(prev => ({...prev, [itemId]: 1})); 
        }
        else {
            setCartItems(prev => ({...prev, [itemId] : prev[itemId] + 1}));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId] : prev[itemId] - 1}));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = bag_list.find(product => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const fetchBagList = async () => {
        const response = await axios.get(`${url}/api/bag/list`);
        setBagList(response.data.data);
    }

    useEffect(() => {
        async function loadData () {
            await fetchBagList();
            if(localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        bag_list,
        url,
        
        //cart
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,

        token,
        setToken,

        fetchBagList,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;