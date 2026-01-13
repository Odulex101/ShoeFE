import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid"; // Unique IDs for guest cart items

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutAttempt, setCheckoutAttempt] = useState(false); // 🔹 Track guest checkout attempt

    /* ================= Guest cart load ================= */
    useEffect(() => {
        if (!token) {
            const storedCart = localStorage.getItem("guest_cart");
            if (storedCart) setCart(JSON.parse(storedCart));
        }
    }, [token]);

    /* ================= Logged-in cart load ================= */

    useEffect(() => {
        if (!token) return;

        axios
            .get("https://shoe-be.vercel.app/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setCart(res.data.items || []))
            .catch((err) => console.error("FETCH CART ERROR:", err));
    }, [token]);

    /* ================= Add to cart ================= */
    const addToCart = async (product) => {
        let { id, name, price, images, quantity = 1, selectedSize } = product;

        if (typeof price === "string") {
            price = Number(price.replace(/[^\d]/g, ""));
        }

        // Guest cart
        if (!token) {
            const updatedCart = [...cart];
            const existing = updatedCart.find(
                (item) => item.productId === id && item.selectedSize === selectedSize
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                updatedCart.push({
                    id: uuidv4(),
                    productId: id,
                    name,
                    price,
                    image: images?.[0],
                    quantity,
                    selectedSize,
                });
            }

            setCart(updatedCart);
            localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
            setIsCartOpen(true);
            return;
        }

        // Logged-in cart
        try {
            const res = await axios.post(
                "https://shoe-be.vercel.app/api/cart/add",
                {
                    product: {
                        productId: Number(id),
                        name,
                        price,
                        image: images?.[0],
                        quantity,
                        selectedSize,
                    },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCart(res.data.items || []);
            setIsCartOpen(true);
        } catch (err) {
            console.error("ADD TO CART FAILED:", err.response?.data || err.message);
        }
    };


    /* ================= Remove from cart ================= */
    const removeFromCart = async (itemId) => {
        if (!token) {
            const updatedCart = cart.filter((item) => item.id !== itemId);
            setCart(updatedCart);
            localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
            return;
        }

        try {
            const res = await axios.delete(
                `http://localhost:5000/api/cart/${itemId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data.items || res.data || []);
        } catch (err) {
            console.error("REMOVE FAILED:", err.response?.data || err.message);
        }
    };


    /* ================= Update quantity ================= */
    const updateQuantity = async (itemId, quantity) => {
        if (!token || quantity < 1) return;

        try {
            const res = await axios.put(
                "http://localhost:5000/api/cart/update",
                { productId: itemId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data.items || res.data || []);
        } catch (err) {
            console.error("UPDATE FAILED:", err.response?.data || err.message);
        }
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                isCartOpen,
                setIsCartOpen,
                totalPrice,

                checkoutAttempt,
                setCheckoutAttempt, // 🔹 exposed to trigger login modal

            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const { token } = useAuth();

//     // 🔴 CHANGE: Load guest cart from localStorage
//     const [cart, setCart] = useState(() => {
//         const stored = localStorage.getItem("guest_cart");
//         return stored ? JSON.parse(stored) : [];
//     });

//     const [isCartOpen, setIsCartOpen] = useState(false);

//     /* ================= MERGE GUEST CART ON LOGIN ================= */
//     useEffect(() => {
//         if (!token) return;

//         const mergeGuestCart = async () => {
//             const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
//             if (guestCart.length === 0) return;

//             try {
//                 await Promise.all(
//                     guestCart.map(item =>
//                         axios.post(
//                             "https://shoe-be.vercel.app/api/cart/add",
//                             { product: { ...item } },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         )
//                     )
//                 );
//                 localStorage.removeItem("guest_cart"); // 🔴 CLEAR guest cart
//             } catch (err) {
//                 console.error("GUEST CART MERGE FAILED:", err.response?.data || err.message);
//             }
//         };

//         mergeGuestCart();

//         // Fetch updated backend cart
//         axios
//             .get("https://shoe-be.vercel.app/api/cart", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setCart(res.data.items || res.data || []))
//             .catch(err => console.error("FETCH CART ERROR:", err));
//     }, [token]);

//     /* ================= ADD TO CART ================= */
//     const addToCart = async (product) => {
//         const rawPrice = product.price?.amount ?? product.price ?? product.cost;
//         if (rawPrice == null) return;

//         const cleanPrice =
//             typeof rawPrice === "string"
//                 ? Number(rawPrice.replace(/[^\d]/g, ""))
//                 : Number(rawPrice);

//         if (!token) {
//             // 🔴 Guest cart logic
//             setCart(prev => {
//                 const existing = prev.find(item => item.productId === product.id);
//                 let updated;
//                 if (existing) {
//                     updated = prev.map(item =>
//                         item.productId === product.id
//                             ? { ...item, quantity: item.quantity + 1 }
//                             : item
//                     );
//                 } else {
//                     updated = [
//                         ...prev,
//                         {
//                             productId: product.id,
//                             name: product.name,
//                             price: cleanPrice,
//                             image: product.images?.[0],
//                             quantity: 1,
//                         },
//                     ];
//                 }
//                 localStorage.setItem("guest_cart", JSON.stringify(updated));
//                 return updated;
//             });
//             setIsCartOpen(true); // 🔴 auto-open cart drawer
//             return;
//         }

//         // 🔴 Authenticated user
//         try {
//             const res = await axios.post(
//                 "https://shoe-be.vercel.app/api/cart/add",
//                 {
//                     product: {
//                         productId: Number(product.id),
//                         name: product.name,
//                         price: cleanPrice,
//                         image: product.images?.[0],
//                     },
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCart(res.data.items || res.data || []);
//             setIsCartOpen(true); // 🔴 auto-open cart drawer
//         } catch (err) {
//             console.error("ADD TO CART FAILED:", err.response?.data || err.message);
//         }
//     };

//     /* ================= REMOVE ITEM ================= */
//     const removeFromCart = async (productId) => {
//         if (!token) {
//             setCart(prev => {
//                 const updated = prev.filter(item => item.productId !== productId);
//                 localStorage.setItem("guest_cart", JSON.stringify(updated));
//                 return updated;
//             });
//             return;
//         }

//         try {
//             const res = await axios.delete(
//                 `https://shoe-be.vercel.app/api/cart/${productId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCart(res.data.items || res.data || []);
//         } catch (err) {
//             console.error("REMOVE FAILED:", err.response?.data || err.message);
//         }
//     };

//     /* ================= UPDATE QUANTITY ================= */
//     const updateQuantity = async (productId, quantity) => {
//         if (quantity < 1) return;

//         if (!token) {
//             setCart(prev => {
//                 const updated = prev.map(item =>
//                     item.productId === productId ? { ...item, quantity } : item
//                 );
//                 localStorage.setItem("guest_cart", JSON.stringify(updated));
//                 return updated;
//             });
//             return;
//         }

//         try {
//             const res = await axios.put(
//                 "https://shoe-be.vercel.app/api/cart/update",
//                 { productId, quantity },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCart(res.data.items || res.data || []);
//         } catch (err) {
//             console.error("UPDATE FAILED:", err.response?.data || err.message);
//         }
//     };

//     const totalPrice = cart.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     );

//     return (
//         <CartContext.Provider
//             value={{
//                 cart,
//                 addToCart,
//                 removeFromCart,
//                 updateQuantity,
//                 isCartOpen,
//                 setIsCartOpen,
//                 totalPrice,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);


// src/context/CartContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// const API_URL = "https://shoe-be.vercel.app/api/cart";

// export const CartProvider = ({ children }) => {
//     const { token } = useAuth();

//     // ================== CART STATE ==================
//     const [cart, setCart] = useState(() => {
//         const stored = localStorage.getItem("guest_cart");
//         return stored ? JSON.parse(stored) : [];
//     });

//     const [isCartOpen, setIsCartOpen] = useState(false);

//     // ================== FETCH + MERGE CART ==================
//     useEffect(() => {
//         if (!token) return;

//         const mergeGuestCart = async () => {
//             const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
//             if (!guestCart.length) return;

//             try {
//                 await Promise.all(
//                     guestCart.map((item) =>
//                         axios.post(
//                             `${API_URL}/add`,
//                             {
//                                 product: {
//                                     productId: Number(item.productId),
//                                     name: item.name,
//                                     price: Number(item.price),
//                                     image: item.image,
//                                 },
//                             },
//                             {
//                                 headers: {
//                                     Authorization: `Bearer ${token}`,
//                                 },
//                             }
//                         )
//                     )
//                 );

//                 localStorage.removeItem("guest_cart");
//             } catch (err) {
//                 console.error(
//                     "GUEST CART MERGE FAILED:",
//                     err.response?.data || err.message
//                 );
//             }
//         };

//         const fetchCart = async () => {
//             try {
//                 const res = await axios.get(API_URL, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 setCart(res.data.items || res.data || []);
//             } catch (err) {
//                 console.error(
//                     "FETCH CART ERROR:",
//                     err.response?.data || err.message
//                 );
//             }
//         };

//         mergeGuestCart().finally(fetchCart);
//     }, [token]);

//     // ================== ADD TO CART ==================
//     const addToCart = async (product) => {
//         const rawPrice = product.price?.amount ?? product.price ?? product.cost;
//         if (rawPrice == null) return;

//         const cleanPrice =
//             typeof rawPrice === "string"
//                 ? Number(rawPrice.replace(/[^\d]/g, ""))
//                 : Number(rawPrice);

//         // ---------- GUEST USER ----------
//         if (!token) {
//             setCart((prev) => {
//                 const existing = prev.find(
//                     (item) => item.productId === product.id
//                 );

//                 let updated;
//                 if (existing) {
//                     updated = prev.map((item) =>
//                         item.productId === product.id
//                             ? { ...item, quantity: item.quantity + 1 }
//                             : item
//                     );
//                 } else {
//                     updated = [
//                         ...prev,
//                         {
//                             productId: product.id,
//                             name: product.name,
//                             price: cleanPrice,
//                             image: product.images?.[0] || "",
//                             quantity: 1,
//                         },
//                     ];
//                 }

//                 localStorage.setItem("guest_cart", JSON.stringify(updated));
//                 return updated;
//             });

//             setIsCartOpen(true);
//             return;
//         }

//         // ---------- AUTHENTICATED USER ----------
//         try {
//             const res = await axios.post(
//                 `${API_URL}/add`,
//                 {
//                     product: {
//                         productId: Number(product.id),
//                         name: product.name,
//                         price: cleanPrice,
//                         image: product.images?.[0] || "",
//                     },
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setCart(res.data.items || res.data || []);
//             setIsCartOpen(true);
//         } catch (err) {
//             console.error(
//                 "ADD TO CART FAILED:",
//                 err.response?.data || err.message
//             );
//         }
//     };

//     // ================== REMOVE FROM CART ==================
//     const removeFromCart = async (productId) => {
//         if (!token) {
//             setCart((prev) => {
//                 const updated = prev.filter(
//                     (item) => item.productId !== productId
//                 );
//                 localStorage.setItem("guest_cart", JSON.stringify(updated));
//                 return updated;
//             });
//             return;
//         }

//         try {
//             const res = await axios.delete(`${API_URL}/${productId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             setCart(res.data.items || res.data || []);
//         } catch (err) {
//             console.error(
//                 "REMOVE FROM CART FAILED:",
//                 err.response?.data || err.message
//             );
//         }
//     };

//     // ================== UPDATE QUANTITY ==================
//     const updateQuantity = async (productId, quantity) => {
//         if (quantity < 1) return;

//         if (!token) {
//             setCart((prev) => {
//                 const updated = prev.map((item) =>
//                     item.productId === productId
//                         ? { ...item, quantity }
//                         : item
//                 );
//                 localStorage.setItem("guest_cart", JSON.stringify(updated));
//                 return updated;
//             });
//             return;
//         }

//         try {
//             const res = await axios.put(
//                 `${API_URL}/update`,
//                 { productId, quantity },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setCart(res.data.items || res.data || []);
//         } catch (err) {
//             console.error(
//                 "UPDATE CART FAILED:",
//                 err.response?.data || err.message
//             );
//         }
//     };

//     // ================== TOTAL PRICE ==================
//     const totalPrice = cart.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     );

//     return (
//         <CartContext.Provider
//             value={{
//                 cart,
//                 addToCart,
//                 removeFromCart,
//                 updateQuantity,
//                 isCartOpen,
//                 setIsCartOpen,
//                 totalPrice,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);
































