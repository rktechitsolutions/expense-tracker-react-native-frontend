import axios from "axios";
import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    // to save the data from localstorage to the auth to get in the context
    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }