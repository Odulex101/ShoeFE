// import ShopNavBar from "../components/Shop/ShopNavBar";
// import { useLocation } from "react-router-dom";

// const ShopLayout = ({ children }) => {
//     const location = useLocation();

//     const showShopNavBar = location.pathname.startsWith("/shop");
//     return (
//         <>
//             {/* 🔴 CHANGED: conditional render */}
//             {showShopNavBar && <ShopNavBar />}

//             {/* Render the page content */}
//             <main>{children}</main>
//         </>
//     );
// };

// export default ShopLayout;

import ShopNavBar from "../components/Shop/ShopNavBar";
import { useLocation } from "react-router-dom";

const ShopLayout = ({ children }) => {
    const location = useLocation();

    /* 🔴 FIXED */
    const showShopNavBar =
        location.pathname.startsWith("/shop") ||
        location.pathname.startsWith("/product") ||
        location.pathname.startsWith("/terms") ||
        location.pathname.startsWith("/privacy") ||
        location.pathname.startsWith("/shipping-policy");
    /* 🔴 END FIX */

    return (
        <>
            {showShopNavBar && <ShopNavBar />}
            <main>{children}</main>
        </>
    );
};

export default ShopLayout;



