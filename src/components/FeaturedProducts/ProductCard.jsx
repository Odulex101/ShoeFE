// import ProductRating from "./ProductRating";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext"; // 🔴 ADDED

// const ProductCard = ({ product }) => {
//     const navigate = useNavigate();
//     const { addToCart } = useCart(); // 🔴 ADDED

//     return (
//         <div className="product-card">
//             {/* IMAGE / NAVIGATION */}
//             <div
//                 className="image-wrapper"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => navigate(`/product/${product.id}`)}
//             >
//                 <span className="badge-ready">{product.badge}</span>

//                 <img
//                     src={product.images[0]}
//                     alt={product.name}
//                     className="product-image"
//                 />

//                 <div className="thumbs">
//                     {product.images.slice(0, 5).map((img, i) => (
//                         <img key={i} src={img} alt="thumb" />
//                     ))}
//                 </div>
//             </div>

//             {/* PRODUCT INFO */}
//             <div className="mt-3">
//                 <p className="product-name">{product.name}</p>
//                 <p className="price">{product.price}</p>

//                 <ProductRating
//                     rating={product.rating}
//                     reviews={product.reviews}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


import ProductRating from "./ProductRating";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        // 🔴 CHANGE: added auto-move class
        <div className="product-card auto-move">
            {/* IMAGE / NAVIGATION */}
            <div
                className="image-wrapper"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${product.id}`)}
            >
                <span className="badge-ready">{product.badge}</span>

                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                />

                <div className="thumbs">
                    {product.images.slice(0, 5).map((img, i) => (
                        <img key={i} src={img} alt="thumb" />
                    ))}
                </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="mt-3">
                <p className="product-name">{product.name}</p>
                <p className="price">{product.price}</p>

                <ProductRating
                    rating={product.rating}
                    reviews={product.reviews}
                />
            </div>
        </div>
    );
};

export default ProductCard;




