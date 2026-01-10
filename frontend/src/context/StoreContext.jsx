import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://bagify-backend-1zf6.onrender.com";
  // const url = "http://localhost:5000";
  const [token, setToken] = useState("");

  const [bag_list, setBagList] = useState([]);
  const [topBagList, setTopBagList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = bag_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchBagList = async () => {
    const response = await axios.get(`${url}/api/bag/list`);
    setBagList(response.data.data);

    const topBagList = response.data.data.filter((item) => item.isTopProduct);

    setTopBagList(topBagList);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    const loadData = async () => {
      // 1. Always load bag list
      await fetchBagList();

      const localToken = localStorage.getItem("token");
      if (!localToken) return; // no token → skip cart

      try {
        // 2. Verify token with backend
        const res = await axios.get(`${url}/api/user/verify`, {
          headers: { token: localToken },
        });

        if (res.data.success === true) {
          // 3. Token valid → keep it
          setToken(localToken);

          // 4. Load cart data with valid token
          await loadCartData(localToken);
        } else {
          // 5. Backend says token NOT valid → logout
          localStorage.removeItem("token");
          setToken("");
        }
      } catch (err) {
        // 6. Any verification error → token invalid → logout
        localStorage.removeItem("token");
        setToken("");
      }
    };

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
