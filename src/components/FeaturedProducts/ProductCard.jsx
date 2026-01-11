// import ProductRating from "./ProductRating";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";


// const ProductCard = ({ product }) => {
//     const navigate = useNavigate();
//     const { addToCart } = useCart(); // 🔴 ADDED

// // 🔴 ADDED: handle add-to-cart directly
// const handleAddToCart = (e) => {
//     e.stopPropagation();

//     const priceNumber = Number(product.price.replace(/[^\d]/g, ""));

//     addToCart({
//         ...product,
//         price: priceNumber,
//         quantity: 1,
//     });

//     setIsCartOpen(true); 
// };


//     return (
//         <div
//             className="product-card"
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate(`/product/${product.id}`)}
//         >
//             <div className="image-wrapper">
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
//                     {product.images.length > 5 && (
//                         <span className="thumb-more">
//                             +{product.images.length - 5}
//                         </span>
//                     )}
//                 </div>
//             </div>

//             <div className="mt-3">
//                 <p className="product-name">{product.name}</p>
//                 <p className="price">{product.price}</p>

//                 <ProductRating
//                     rating={product.rating}
//                     reviews={product.reviews}
//                 />

//                 {/* 🔴 ADDED: ADD TO CART BUTTON */}
//                 <button
//                     className="btn btn-dark w-100 mt-2"
//                     onClick={handleAddToCart}
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


import ProductRating from "./ProductRating";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 🔴 ADDED

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // 🔴 ADDED

    return (
        <div className="product-card">
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



