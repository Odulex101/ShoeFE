// // src/pages/admin/AdminUsers.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const AdminUsers = () => {
//     const { token } = useAuth();
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios
//             .get("https://shoe-be.vercel.app/api/admin/users", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setUsers(res.data));
//     }, [token]);

//     const toggleAdmin = userId => {
//         axios
//             .put(`https://shoe-be.vercel.app/api/admin/users/${userId}`, {}, {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(() =>
//                 setUsers(users.map(u => u._id === userId ? { ...u, isAdmin: !u.isAdmin } : u))
//             );
//     };

//     return (
//         <div className="container my-5">
//             <h2>Admin Users</h2>
//             {users.map(u => (
//                 <div key={u._id} className="card mb-2 p-2">
//                     <p>{u.fullName || u.email}</p>
//                     <p>Admin: {u.isAdmin ? "Yes" : "No"}</p>
//                     <button onClick={() => toggleAdmin(u._id)}>Toggle Admin</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AdminUsers;
