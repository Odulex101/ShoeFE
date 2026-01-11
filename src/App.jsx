// import { Routes, Route } from "react-router-dom";
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


import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // 🔴 ADDED: toast container
import "react-toastify/dist/ReactToastify.css";  // 🔴 ADDED: toast styles

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { BestSellerProvider } from "./context/BestSellerContext";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./landing/Landing";
//import Home from "./pages/Home";
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

// You can define your Home component if needed
function HomePage() {
  return <Home />;
}

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BestSellerProvider>
            {/* Guest header only */}
            <Header />

            {/* 🔴 TOAST CONTAINER */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<HomePage />} />

              {/* SHOP ROUTE WITH SHOPLAYOUT */}
              <Route path="/shop" element={<ShopLayout><Shop /></ShopLayout>} />

              <Route path="/stores" element={<Stores />} />
              <Route path="/customer-care" element={<CustomerCare />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>

            {/* Footer */}
            <Footer />
          </BestSellerProvider>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;






