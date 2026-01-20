import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";

const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/product/${product.id}`}
            className="product-card text-decoration-none text-dark"
            style={{ cursor: "pointer" }}
        >
            <div className="image-wrapper">
                <span className="badge-ready">{product.badge}</span>

                <img src={product.images[0]} alt={product.name} className="product-image" />

                <div className="thumbs">
                    {product.images.slice(0, 5).map((img, i) => (
                        <img key={i} src={img} alt="thumb" />
                    ))}
                </div>
            </div>

            <div className="mt-3">
                <p className="product-name">{product.name}</p>
                <p className="price">{product.price}</p>

                <ProductRating rating={product.rating} reviews={product.reviews} />
            </div>
        </Link>
    );
};

export default ProductCard;




// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";

// const ProductCard = ({ product }) => {
//     const navigate = useNavigate();
//     const { addToCart } = useCart();

//     return (
//         <div className="card border-0">
//             <img
//                 src={product.images[0]}
//                 className="img-fluid cursor-pointer"
//                 onClick={() => navigate(`/product/${product.id}`)}
//             />

//             <div className="card-body px-0">
//                 <p className="fw-semibold">{product.name}</p>
//                 <p>{product.price}</p>

//                 <button className="btn btn-sm btn-outline-dark" onClick={() => addToCart(product)}>
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


