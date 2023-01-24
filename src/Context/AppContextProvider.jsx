import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { dogFoodApi } from "../components/Api/Api/DogFoodApi";

export const AppContext = createContext();

export function AppContextProvider( { children } ) {
    const [token, setToken] = useState(
        () => {
            const tokenFromLS = localStorage.getItem('token')
            return tokenFromLS || ''
        },
    );

    useEffect(() => {
        localStorage.setItem('token', token);
        dogFoodApi.setToken(token);
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken }}>
            { children }
        </AppContext.Provider>
    );
}