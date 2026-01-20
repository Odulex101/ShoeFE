// import { useState } from "react";
// import "../../index.css";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ added

// const API_URL = "https://shoe-be.vercel.app/api/auth";

// const LoginModal = ({ close }) => {
//     const [showShop, setShowShop] = useState(false);
//     const [step, setStep] = useState("email"); // email | code
//     const [email, setEmail] = useState("");
//     const [code, setCode] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [defaultStep, setDefaultStep] = useState("email");
//     const navigate = useNavigate();

//     const { login } = useAuth(); // ✅ added

//     /* =============================== CHECK EMAIL / LOGIN ================================ */
//     const handleContinue = async () => {
//         if (!email) return;

//         try {
//             setLoading(true);
//             setError("");

//             const res = await fetch(`${API_URL}/check-email`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });




//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Something went wrong");

//             if (data.exists) {
//                 login(data.token); // ✅ use login() instead of localStorage.setItem
//                 localStorage.setItem('userEmail', email); // optional
//                 navigate("/shop");
//                 close();
//             } else {
//                 setError("Email not registered. Please sign in with Shop.");
//             }
//         } catch (err) {
//             setError(err.message);
//             console.log('Error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== SEND CODE (REGISTERED ONLY) ================================ */
//     const handleSendCodeOriginal = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const res = await fetch(`${API_URL}/send-code`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Unable to send code");

//             setStep("code");
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== SHOP REGISTRATION FLOW ================================ */
//     const handleShopContinue = async () => {
//         if (!email) return;

//         try {
//             setLoading(true);
//             setError("");

//             const registerRes = await fetch(`${API_URL}/register`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });

//             const registerData = await registerRes.json();

//             if (!registerRes.ok) {
//                 if (registerData.message === "Email already registered") {
//                     const res = await fetch(`${API_URL}/check-email`, {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ email }),
//                     });


//                     const data = await res.json();
//                     if (!res.ok) throw new Error(data.message);

//                     if (data.exists) {
//                         login(data.token); // ✅ use login() here too
//                         close();
//                         return;
//                     }

//                     await handleSendCodeOriginal();
//                     return;
//                 }

//                 throw new Error(registerData.message);
//             }

//             await handleSendCodeOriginal();

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== VERIFY CODE ================================ */
//     const handleVerifyCode = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const res = await fetch(`${API_URL}/verify-code`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, code }),
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Invalid code");

//             login(data.token); // ✅ use login() instead of localStorage
//             navigate("/profile");
//             close();
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== SHOP LOGIN UI ================================ */
//     if (showShop) {
//         return (
//             <div className="login-overlay">
//                 <div className="shop-card">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h5 className="fw-bold text-primary m-0">shop with TEMORAH</h5>
//                         <small className="text-uppercase">TEMORAH</small>
//                     </div>

//                     {step === "email" && (
//                         <>
//                             <h4 className="text-center fw-semibold mb-1">
//                                 Sign in to Shop
//                             </h4>
//                             <p className="text-center text-muted mb-4">
//                                 Or create an account
//                             </p>

//                             <input
//                                 type="email"
//                                 className="form-control mb-3"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             {error && (
//                                 <small className="text-danger d-block mb-2">
//                                     {error}
//                                 </small>
//                             )}

//                             <button
//                                 className="btn btn-primary w-100"
//                                 disabled={!email || loading}
//                                 onClick={handleShopContinue}
//                             >
//                                 {loading ? "Processing..." : "Continue"}
//                             </button>
//                         </>
//                     )}

//                     {step === "code" && (
//                         <>
//                             <h4 className="text-center fw-semibold mb-3">
//                                 Enter verification code
//                             </h4>

//                             <input
//                                 type="text"
//                                 className="form-control text-center mb-3"
//                                 placeholder="6-digit code"
//                                 maxLength="6"
//                                 value={code}
//                                 onChange={(e) => setCode(e.target.value)}
//                             />

//                             {error && (
//                                 <small className="text-danger d-block mb-2">
//                                     {error}
//                                 </small>
//                             )}

//                             <button
//                                 className="btn btn-primary w-100"
//                                 disabled={code.length !== 6 || loading}
//                                 onClick={handleVerifyCode}
//                             >
//                                 {loading ? "Verifying..." : "Verify"}
//                             </button>
//                         </>
//                     )}
//                 </div>

//                 <button
//                     className="btn btn-link text-white mt-3"
//                     onClick={() => {
//                         setShowShop(false);
//                         setStep("email");
//                         setEmail("");
//                         setCode("");
//                         setError("");
//                         setDefaultStep("email");
//                     }}
//                 >
//                     Cancel
//                 </button>
//             </div>
//         );
//     }

//     /* =============================== DEFAULT LOGIN MODAL ================================ */
//     return (
//         <div
//             className="login-overlay"
//             onClick={(e) => {
//                 if (e.target === e.currentTarget) close();
//             }}
//         >
//             <div className="login-card">
//                 <h5 className="fw-bold mb-1">Sign in</h5>
//                 <p className="text-muted mb-4">
//                     Sign in or create an account
//                 </p>

//                 <button
//                     className="btn bg-primary text-white w-100 mb-4"
//                     onClick={() => setShowShop(true)}
//                 >
//                     Sign in with shop
//                 </button>

//                 <div className="login-divider mb-4">
//                     <span>or</span>
//                 </div>

//                 <input
//                     type="email"
//                     className="form-control login-input mb-4"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 {error && (
//                     <small className="text-danger d-block mb-2">
//                         {error}
//                     </small>
//                 )}

//                 <button
//                     className="btn w-100 login-continue"
//                     disabled={!email || loading}
//                     onClick={handleContinue}
//                 >
//                     {loading ? "Processing..." : "Continue"}
//                 </button>
//             </div>
//         </div>
//     );
// };


// export default LoginModal;


import { useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://shoe-be.vercel.app/api/auth";

const LoginModal = ({ close }) => {
    const [showShop, setShowShop] = useState(false);

    // 🔧 Combined state
    const [step, setStep] = useState("email"); // email | code | password
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    /* ================= EMAIL STEP ================= */
    const handleContinue = async () => {
        if (!email) return;

        try {
            setLoading(true);
            setError("");

            // 1️⃣ Check if user exists
            const res = await fetch(`${API_URL}/check-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // 2️⃣ If user exists or new, send code
            await sendCode();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= SEND CODE ================= */
    const sendCode = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/send-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to send code");

            setStep("code");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= VERIFY CODE ================= */
    const handleVerifyCode = async () => {
        if (!code || code.length !== 6) return;

        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/verify-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Invalid code");

            // Move to password step
            setStep("password");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= PASSWORD STEP ================= */
    const handlePasswordSubmit = async () => {
        if (!password) return;

        try {
            setLoading(true);
            setError("");

            // Send password to login endpoint
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            login(data.token);
            navigate("/shop");
            close();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= SHOP LOGIN UI ================= */
    if (showShop) {
        return (
            <div className="login-overlay">
                <div className="shop-card">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold text-primary m-0">Shop with TEMORAH</h5>
                        <small className="text-uppercase">TEMORAH</small>
                    </div>

                    {step === "email" && (
                        <>
                            <h4 className="text-center fw-semibold mb-3">
                                Sign in to Shop
                            </h4>

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {error && <small className="text-danger d-block mb-2">{error}</small>}

                            <button
                                className="btn btn-primary w-100"
                                disabled={!email || loading}
                                onClick={handleContinue}
                            >
                                {loading ? "Processing..." : "Continue"}
                            </button>
                        </>
                    )}

                    {step === "code" && (
                        <>
                            <h4 className="text-center fw-semibold mb-3">
                                Enter verification code
                            </h4>

                            <input
                                type="text"
                                className="form-control text-center mb-3"
                                placeholder="6-digit code"
                                maxLength="6"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />

                            {error && <small className="text-danger d-block mb-2">{error}</small>}

                            <button
                                className="btn btn-primary w-100"
                                disabled={code.length !== 6 || loading}
                                onClick={handleVerifyCode}
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                        </>
                    )}

                    {step === "password" && (
                        <>
                            <h4 className="text-center fw-semibold mb-3">
                                Enter your password
                            </h4>

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <small className="text-danger d-block mb-2">{error}</small>}

                            <button
                                className="btn btn-primary w-100"
                                disabled={!password || loading}
                                onClick={handlePasswordSubmit}
                            >
                                {loading ? "Signing in..." : "Login"}
                            </button>
                        </>
                    )}
                </div>

                <button
                    className="btn btn-link text-white mt-3"
                    onClick={() => {
                        setShowShop(false);
                        setStep("email");
                        setEmail("");
                        setCode("");
                        setPassword("");
                        setError("");
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    }

    /* ================= DEFAULT LOGIN MODAL ================= */
    return (
        <div
            className="login-overlay"
            onClick={(e) => e.target === e.currentTarget && close()}
        >
            <div className="login-card">
                <h5 className="fw-bold mb-1">Sign in</h5>
                <p className="text-muted mb-4">Sign in or create an account</p>

                <button
                    className="btn bg-primary text-white w-100 mb-4"
                    onClick={() => setShowShop(true)}
                >
                    Sign in with shop
                </button>

                <div className="login-divider mb-4">
                    <span>or</span>
                </div>

                <input
                    type="email"
                    className="form-control login-input mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {error && <small className="text-danger d-block mb-2">{error}</small>}

                <button
                    className="btn w-100 login-continue"
                    disabled={!email || loading}
                    onClick={handleContinue}
                >
                    {loading ? "Processing..." : "Continue"}
                </button>
            </div>
        </div>
    );
};

export default LoginModal;







