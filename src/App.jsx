// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify"; // 🔴 ADDED: toast container
// import "react-toastify/dist/ReactToastify.css";  // 🔴 ADDED: toast styles

// import Header from "./components/Header";
// import Footer from "./components/Footer/Footer";
// import { SearchProvider } from "./context/SearchContext";
// import { CartProvider } from "./context/CartContext";
// import { BestSellerProvider } from "./context/BestSellerContext";
// import { AuthProvider } from "./context/AuthContext";

// import Landing from "./landing/Landing";
// //import Home from "./pages/Home";
// import Shop from "./pages/Shop";
// import Stores from "./pages/Stores";
// import CustomerCare from "./pages/CustomerCare";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
// import Checkout from "./pages/Checkout";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";

// import ProtectedRoute from "./components/ProtectedRoute";
// import ShopLayout from "./layouts/ShopLayout";

// // You can define your Home component if needed
// function HomePage() {
//   return <Home />;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <SearchProvider>
//         <CartProvider>
//           <BestSellerProvider>
//             {/* Guest header only */}
//             <Header />

//             {/* 🔴 TOAST CONTAINER */}
//             <ToastContainer
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//             />

//             <Routes>
//               <Route path="/" element={<Landing />} />
//               <Route path="/home" element={<HomePage />} />

//               {/* SHOP ROUTE WITH SHOPLAYOUT */}
//               <Route path="/shop" element={<ShopLayout><Shop /></ShopLayout>} />

//               <Route path="/stores" element={<Stores />} />
//               <Route path="/customer-care" element={<CustomerCare />} />
//               <Route path="/product/:id" element={<ProductDetailsPage />} />

//               {/* Protected routes */}
//               <Route element={<ProtectedRoute />}>
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/orders" element={<Orders />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/settings" element={<Settings />} />
//                 <Route path="/checkout" element={<Checkout />} />
//               </Route>
//             </Routes>

//             {/* Footer */}
//             <Footer />
//           </BestSellerProvider>
//         </CartProvider>
//       </SearchProvider>
//     </AuthProvider>
//   );
// }

// export default App;


import { Routes, Route, useLocation } from "react-router-dom"; // 🔴 CHANGED
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { BestSellerProvider } from "./context/BestSellerContext";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./landing/Landing";
import Shop from "./pages/Shop";
import Stores from "./pages/Stores";
import CustomerCare from "./pages/CustomerCare";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import ShopLayout from "./layouts/ShopLayout";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";


/* 🔴 ADDED: layout controller */
const AppLayout = ({ children }) => {
  const location = useLocation();

  // 🔴 CHANGED: ALL routes that should NOT show Header
  const hideHeaderRoutes = [
    "/shop",
    "/product",
    "/cart",
    "/checkout",
    "/terms",
    "/privacy",
    "/shipping-policy"
  ];

  const hideHeader = hideHeaderRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeader && <Header />} {/* 🔴 FIXED */}

      <ToastContainer position="top-right" autoClose={3000} />

      {children}

      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BestSellerProvider>

            <AppLayout>
              <Routes>
                <Route path="/" element={<Landing />} />

                {/* SHOP + PRODUCT = ShopNavBar only */}
                <Route
                  path="/shop"
                  element={
                    <ShopLayout>
                      <Shop />
                    </ShopLayout>
                  }
                />

                <Route
                  path="/product/:id"
                  element={
                    <ShopLayout> {/* 🔴 ADDED */}
                      <ProductDetailsPage />
                    </ShopLayout>
                  }
                />

                {/* 🔴 CHANGE START */}
                <Route
                  path="/terms"
                  element={
                    <ShopLayout>
                      <TermsAndConditions />
                    </ShopLayout>
                  }
                />

                <Route
                  path="/privacy"
                  element={
                    <ShopLayout>
                      <PrivacyPolicy />
                    </ShopLayout>
                  }
                />

                <Route
                  path="/shipping-policy"
                  element={
                    <ShopLayout>
                      <ShippingPolicy />
                    </ShopLayout>
                  }
                />
                {/* 🔴 CHANGE END */}

                <Route path="/stores" element={<Stores />} />
                <Route path="/customer-care" element={<CustomerCare />} />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route>
              </Routes>
            </AppLayout>

          </BestSellerProvider>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;








