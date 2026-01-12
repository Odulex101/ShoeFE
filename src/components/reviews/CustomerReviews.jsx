import { useState, useEffect } from "react";
import axios from "axios";
import WriteReviewForm from "./WriteReviewForm";

const CustomerReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!productId) return;

        axios
            .get(`https://shoe-be.vercel.app/api/reviews/${productId}`)
            .then(res => {
                setReviews(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("FETCH REVIEWS ERROR:", err);
                setReviews([]); // fallback to empty array
            });
    }, [productId]);

    if (!reviews.length) return <p>No reviews yet.</p>;

    return (
        <div>
            {reviews.map(review => (
                <div key={review._id}>
                    <h4>{review.title}</h4>
                    <p>{review.content}</p>
                    <small>by {review.userName}</small>
                </div>
            ))}
            <WriteReviewForm productId={productId} />
        </div>
    );
};

export default CustomerReviews;
