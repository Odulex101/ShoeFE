// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Hero from "./components/Hero/Hero";
// import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
// import Footer from "./components/Footer/Footer";
// import { SearchProvider, useSearch } from "./context/SearchContext";
// import SearchResultsDisplay from "./components/SearchResultsDisplay";

// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
// import Checkout from "./pages/Checkout";
// import CustomerCare from "./pages/CustomerCare";
// import Stores from "./pages/Stores";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Landing from "./landing/Landing";

// import { CartProvider } from "./context/CartContext";
// import { BestSellerProvider } from "./context/BestSellerContext";

// function Home() {
//   const { searchTerm } = useSearch();

//   return (
//     <>
//       <Hero />
//       {searchTerm ? <SearchResultsDisplay /> : <FeaturedProducts />}
//     </>
//   );
// }

// function App() {
//   return (
//     <SearchProvider>
//       <CartProvider>
//         <BestSellerProvider>
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/shop" element={<Shop />} />
//               <Route path="/stores" element={<Stores />} />
//               <Route path="/customer-care" element={<CustomerCare />} />
//               <Route path="/product/:id" element={<ProductDetailsPage />} />

//             <Route element={<ProtectedRoute />}>
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/orders" element={<Orders />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/checkout" element={<Checkout />} />
//             </Route>
//           </Routes>

//           <Footer />
//         </BestSellerProvider>
//       </CartProvider>
//     </SearchProvider>
//   );
// }

// export default App;

// src/App.jsx
import { Routes, Route } from "react-router-dom";
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





