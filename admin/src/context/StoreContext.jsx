import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://bagify-backend-1zf6.onrender.com";
  // const url = "http://localhost:5000";

  const [token, setToken] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const localToken = localStorage.getItem("token");
      if (!localToken) return; // no token → no login

      try {
        const res = await axios.get(`${url}/api/user/verify`, {
          headers: { token: localToken },
        });

        if (res.data.success === true) {
          // token valid → keep user logged in
          setToken(localToken);
        } else {
          // token invalid → force logout
          console.log("not valid token");
          localStorage.removeItem("token");
          setToken("");
        }
      } catch (err) {
        // verify API failed → token invalid
        console.log("Error: ", err);
        localStorage.removeItem("token");
        setToken("");
      }
    };

    checkToken();
  }, []);

  const contextValue = {
    url,

    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
