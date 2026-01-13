import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../LoginModal.jsx"; // Correct relative path
import "./cart.css";


const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, totalPrice, checkoutAttempt, setCheckoutAttempt } = useCart();
    const { token } = useAuth();
    const [showLogin, setShowLogin] = useState(false);

    const { token } = useAuth(); // 🔴 ADDED: get auth token

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        if (!token) {
            // Guest: trigger login modal
            setShowLogin(true);
            setCheckoutAttempt(true);
            return;
        }

        // Logged-in: go to checkout
        window.location.href = "/checkout";
    };

    return (
        <>
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
                <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                    <div className="cart-header d-flex justify-content-between align-items-center">
                        <h5 className="m-0">MY CART</h5>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsCartOpen(false)}>✕</button>
                    </div>

                    {cart.length === 0 && <p className="text-center mt-4">Your cart is empty</p>}

                    {cart.map((item) => (
                        <div key={item.id || item.productId} className="cart-item d-flex mb-3">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1">{item.name}</h6>
                                <p className="mb-1 text-muted">₦{item.price.toLocaleString()}</p>
                                <div className="d-flex align-items-center mb-2">
                                    <button
                                        className="btn btn-sm btn-outline-secondary me-2"
                                        onClick={() => updateQuantity(item.id || item.productId, item.quantity - 1)}
                                        disabled={item.quantity === 1}
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="btn btn-sm btn-outline-secondary ms-2"
                                        onClick={() => updateQuantity(item.id || item.productId, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id || item.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    {cart.length > 0 && (
                        <div className="cart-footer mt-4">
                            <div className="d-flex justify-content-between fw-semibold mb-3">
                                <span>Total</span>
                                <span>₦{totalPrice.toLocaleString()}</span>
                            </div>
                            <button className="btn btn-dark w-100" onClick={handleCheckout}>
                                CHECKOUT
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Login modal for guest checkout */}
            {showLogin && <LoginModal close={() => setShowLogin(false)} />}
        </>
    );
};

export default CartDrawer;


