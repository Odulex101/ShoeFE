// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const AdminProducts = () => {
//     const { token } = useAuth();
//     const [products, setProducts] = useState([]);
//     const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

//     useEffect(() => {
//         axios
//             .get("https://shoe-be.vercel.app/api/admin/products", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setProducts(res.data));
//     }, [token]);

//     const addProduct = () => {
//         axios
//             .post("https://shoe-be.vercel.app/api/admin/products", newProduct, {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setProducts([...products, res.data]));
//     };

//     const deleteProduct = id => {
//         axios
//             .delete(`https://shoe-be.vercel.app/api/admin/products/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(() => setProducts(products.filter(p => p._id !== id)));
//     };

//     return (
//         <div className="container my-5">
//             <h2>Admin Products</h2>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newProduct.name}
//                     onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Price"
//                     value={newProduct.price}
//                     onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Image URL"
//                     value={newProduct.image}
//                     onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
//                 />
//                 <button onClick={addProduct}>Add Product</button>
//             </div>

//             {products.map(p => (
//                 <div key={p._id} className="card mb-2 p-2">
//                     <p>{p.name}</p>
//                     <p>₦{p.price}</p>
//                     <button onClick={() => deleteProduct(p._id)}>Delete</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AdminProducts;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const AdminProducts = () => {
//     const { token } = useAuth();
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         const res = await axios.get(
//             "https://shoe-be.vercel.app/api/admin/products",
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//             }
//         );
//         setProducts(res.data);
//     };

//     const deleteProduct = async (id) => {
//         await axios.delete(
//             `https://shoe-be.vercel.app/api/admin/products/${id}`,
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//             }
//         );
//         fetchProducts();
//     };

//     return (
//         <div className="container my-5">
//             <h2>Admin Products</h2>

//             <table className="table table-bordered mt-4">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                         <th>Stock</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products.map((p) => (
//                         <tr key={p._id}>
//                             <td>{p.name}</td>
//                             <td>₦{p.price.toLocaleString()}</td>
//                             <td>{p.stock}</td>
//                             <td>
//                                 <button
//                                     className="btn btn-danger btn-sm"
//                                     onClick={() => deleteProduct(p._id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminProducts;

