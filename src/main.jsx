// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <AuthProvider>
//                 <App />
//             </AuthProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { BestSellerProvider } from "./context/BestSellerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <SearchProvider>
                    <CartProvider>
                        <BestSellerProvider>
                            <App />
                        </BestSellerProvider>
                    </CartProvider>
                </SearchProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);






