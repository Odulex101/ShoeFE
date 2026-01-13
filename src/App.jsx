import { Routes, Route, useLocation } from "react-router-dom";
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
import RefundPolicy from "./pages/RefundPolicy";

/* 🔴 APP LAYOUT CONTROLLER */
const AppLayout = ({ children }) => {
  const location = useLocation();

  // 🔴 CHANGE: added "/customer-care"
  const hideHeaderRoutes = [
    "/shop",
    "/product",
    "/cart",
    "/checkout",
    "/terms",
    "/privacy",
    "/shipping-policy",
    "/customer-care", // ✅ ADDED
  ];

  const hideHeader = hideHeaderRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeader && <Header />}

      <ToastContainer position="top-right" autoClose={3000} />

      {children}

      <Footer />
    </>
  );
};

/* ========================= */
/* APP ROOT */
/* ========================= */
function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BestSellerProvider>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Landing />} />

                {/* SHOP */}
                <Route
                  path="/shop"
                  element={
                    <ShopLayout>
                      <Shop />
                    </ShopLayout>
                  }
                />

                {/* PRODUCT */}
                <Route
                  path="/product/:id"
                  element={
                    <ShopLayout>
                      <ProductDetailsPage />
                    </ShopLayout>
                  }
                />

                {/* POLICIES */}
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

                <Route
                  path="/refund-policy"
                  element={
                    <ShopLayout>
                      <RefundPolicy />
                    </ShopLayout>
                  }
                />

                {/* NORMAL PAGES */}
                <Route path="/stores" element={<Stores />} />
                <Route path="/customer-care" element={<CustomerCare />} />

                {/* PROTECTED */}
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










