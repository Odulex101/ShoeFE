// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(() => localStorage.getItem("token"));

//     const login = (newToken) => {
//         localStorage.setItem("token", newToken);
//         setToken(newToken); // 🔥 triggers re-render
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setToken(null);
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 token,
//                 isAuthenticated: !!token, 
//                 login,
//                 logout
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };



import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    // 🔴 CHANGE: DECODE USER FROM TOKEN
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("token");
        return stored ? jwtDecode(stored) : null;
    });

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(jwtDecode(newToken)); // 🔴 CHANGE
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null); // 🔴 CHANGE
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user, // 🔴 CHANGE
                isAuthenticated: !!token,
                isAdmin: user?.role === "admin", // 🔴 CHANGE
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

