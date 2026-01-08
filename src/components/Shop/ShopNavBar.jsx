// import {  FaShoppingBag } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// // import { useBestSeller } from "../../context/BestSellerContext";
// import { useCart } from "../../context/CartContext";
// import CartDrawer from "../cart/CartDrawer";

// const ShopNavBar = () => {
//     const navigate = useNavigate();
//     // const { setShowBestSellers } = useBestSeller();
//     const { cart, isCartOpen, setIsCartOpen } = useCart();

//     const cartCount = (cart || []).reduce(
//         (total, item) => total + (item.quantity || 1),
//         0
//     );

//     return (
//         <>
//             <div className="bg-danger text-white py-3 sticky-top">
//                 <div className="container d-flex justify-content-between align-items-center">

//                     {/* Left menu */}
//                     <div className="d-flex gap-4">
//                         <span
//                             role="button"
//                             onClick={() => navigate("/shop")}
//                             className="cursor-pointer"
//                         >
//                             Best Sellers
//                         </span>

//                         <span
//                             role="button"
//                             onClick={() => navigate("/customer-care")}
//                             className="cursor-pointer"
//                         >
//                             Customer Care
//                         </span>

//                         <span
//                             role="button"
//                             onClick={() => navigate("/stores")}
//                             className="cursor-pointer"
//                         >
//                             Stores
//                         </span>

//                     </div>

//                     {/* Brand */}
//                     <h4 className="m-0">
//                         TEMORAH <span className="text-info">DESIGNS</span>
//                     </h4>

//                     {/* Icons */}
//                     <div className="d-flex gap-3 align-items-center">

//                         <div
//                             role="button"
//                             onClick={() => setIsCartOpen(true)}
//                             className="position-relative"
//                         >
//                             <FaShoppingBag size={18} />

//                             {cartCount > 0 && (
//                                 <span
//                                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                                     style={{ fontSize: "0.6rem" }}
//                                 >
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Cart Drawer */}
//             {isCartOpen && <CartDrawer />}


//         </>
//     );
// };

// export default ShopNavBar;

import { useState } from "react";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";

const ShopNavBar = () => {
    const navigate = useNavigate();
    const { cart, isCartOpen, setIsCartOpen } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cartCount = (cart || []).reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    return (
        <>
            <div className="bg-danger text-white py-3 sticky-top">
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Left menu */}
                    <div className="d-flex align-items-center gap-4">
                        {/* Mobile menu toggle */}
                        <div className="d-md-none me-2">
                            <button
                                className="btn text-white"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>

                        <div
                            className={`d-flex flex-column flex-md-row gap-2 gap-md-4 ${mobileMenuOpen ? "d-flex" : "d-none d-md-flex"
                                }`}
                        >
                            <span role="button" onClick={() => navigate("/shop")}>Best Sellers</span>
                            <span role="button" onClick={() => navigate("/customer-care")}>Customer Care</span>
                            <span role="button" onClick={() => navigate("/stores")}>Stores</span>
                        </div>
                    </div>

                    {/* Brand */}
                    <h4 className="m-0 d-none d-md-block">
                        TEMORAH <span className="text-info">DESIGNS</span>
                    </h4>

                    {/* Icons */}
                    <div className="d-flex gap-3 align-items-center">
                        <div
                            role="button"
                            onClick={() => setIsCartOpen(true)}
                            className="position-relative"
                        >
                            <FaShoppingBag size={18} />
                            {cartCount > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: "0.6rem" }}
                                >
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile brand */}
                <div className="d-md-none text-center mt-2">
                    <h4 className="m-0">
                        TEMORAH <span className="text-info">DESIGNS</span>
                    </h4>
                </div>
            </div>

            {/* Cart Drawer */}
            {isCartOpen && <CartDrawer />}
        </>
    );
};

export default ShopNavBar;












