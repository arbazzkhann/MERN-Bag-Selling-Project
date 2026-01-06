import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://bagify-backend-1zf6.onrender.com";
    const [token, setToken] = useState("");

    const [bag_list, setBagList] = useState([]);
    const [topBagList, setTopBagList] = useState([]);

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems(prev => ({...prev, [itemId]: 1})); 
        }
        else {
            setCartItems(prev => ({...prev, [itemId] : prev[itemId] + 1}));
        }
        if(token) {
            await axios.post(`${url}/api/cart/add`, {itemId}, {headers: {token}})
        }
    }   

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({...prev, [itemId] : prev[itemId] - 1}));
        
        if(token) {
            await axios.post(`${url}/api/cart/remove`, {itemId}, {headers: {token}});
        }
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

        const topBagList = response.data.data.filter((item) => item.isTopProduct);
        
        setTopBagList(topBagList);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, {headers: {token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData () {
            await fetchBagList();
            if(localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
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

        topBagList,
        setTopBagList,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;