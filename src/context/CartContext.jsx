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
            .get("http://localhost:5000/api/cart", {
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
                "http://localhost:5000/api/cart/add",
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
            setCart(res.data.items || []);
        } catch (err) {
            console.error("REMOVE FROM CART FAILED:", err.response?.data || err.message);
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
            setCart(res.data.items || []);
        } catch (err) {
            console.error("UPDATE QUANTITY FAILED:", err.response?.data || err.message);
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




















