// // src/pages/admin/AdminDashboard.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const AdminDashboard = () => {
//     const { token } = useAuth();
//     const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
//     const [recentOrders, setRecentOrders] = useState([]);

//     useEffect(() => {
//         // 🔴 Fetch dashboard stats
//         axios
//             .get("https://shoe-be.vercel.app/api/admin/dashboard", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setStats(res.data));

//         // 🔴 Fetch recent orders
//         axios
//             .get("https://shoe-be.vercel.app/api/admin/orders?limit=5", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setRecentOrders(res.data));
//     }, [token]);

//     return (
//         <div className="container my-5">
//             <h2>Admin Dashboard</h2>

//             <div className="row my-4">
//                 <div className="col-md-4">
//                     <div className="card p-3 text-center">
//                         <h5>Total Users</h5>
//                         <p>{stats.totalUsers}</p>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card p-3 text-center">
//                         <h5>Total Orders</h5>
//                         <p>{stats.totalOrders}</p>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card p-3 text-center">
//                         <h5>Total Revenue</h5>
//                         <p>₦{stats.totalRevenue.toLocaleString()}</p>
//                     </div>
//                 </div>
//             </div>

//             <h4>Recent Orders</h4>
//             {recentOrders.map(order => (
//                 <div key={order._id} className="card mb-2 p-3">
//                     <p>User: {order.userId.email}</p>
//                     <p>Total: ₦{order.totalAmount.toLocaleString()}</p>
//                     <p>Status: {order.status}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AdminDashboard;

