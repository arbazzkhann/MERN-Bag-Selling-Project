import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://bagify-backend-1zf6.onrender.com";
    
    const [token, setToken] = useState("");


    useEffect(() => {
        async function saveToken () {
            if(localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
            }
        }
        saveToken();
    }, [token]);

    const contextValue = {
        url,

        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;