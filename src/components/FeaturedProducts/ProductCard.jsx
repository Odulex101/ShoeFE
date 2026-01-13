import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";

const ProductCard = ({ product }) => {
    return (
        // ✅ ADDED: make card clickable
        <Link
            to={`/product/${product.id}`}
            className="product-card text-decoration-none text-dark"
            style={{ cursor: "pointer" }}
        >
            <div className="image-wrapper">
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
                    {product.images.length > 5 && (
                        <span className="thumb-more">
                            +{product.images.length - 5}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-3">
                <p className="product-name">{product.name}</p>
                <p className="price">{product.price}</p>

                <ProductRating
                    rating={product.rating}
                    reviews={product.reviews}
                />
            </div>
        </Link>
    );
};

export default ProductCard;



