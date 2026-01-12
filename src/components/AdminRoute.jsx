// // src/components/AdminRoute.jsx
// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//     const { token, isAuthenticated } = useAuth();
//     const isAdmin = localStorage.getItem("isAdmin") === "true"; // set this on login for admin

//     if (!isAuthenticated || !isAdmin) return <Navigate to="/" />;
//     return children;
// };

// export default AdminRoute;

