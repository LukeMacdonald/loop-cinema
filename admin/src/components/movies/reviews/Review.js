import React, { useState } from "react";
import { Rating } from "@mui/material";
import { deleteReview } from "../../../database/repository";

function Review(props) {
    const { review, index } = props;
    const [isRemoved, setRemoved] = useState(review.removed);

    const handleDelete = async (review_id) => {
        const confirmation = window.confirm("Confirm to delete your review");
        if (confirmation) {
            await deleteReview(review_id);
            setRemoved(true);
            window.alert("Review deleted successfully!");
        }
    };

    if (isRemoved) {
        // Render a message indicating that the review has been deleted
        return (
            <tr key={index}>
                 <td>
            <Rating name="read-only" value={review.rating} disabled />
          </td>
         <td>
          <div dangerouslySetInnerHTML={{ __html: review.comment  }} />
        </td>
        <td colSpan={2} style={{textAlign:'left'}}>
          {review.createdAt.split("T")[0]}
        </td>
            </tr>
        );
    }

    return (
        <tr key={index}>
            <td>
                <Rating name="read-only" value={review.rating} readOnly />
            </td>
            <td style={{textAlign:'left'}}>
            <div dangerouslySetInnerHTML={{ __html: review.comment  }} /> 
                <span className="review-email"> - {review.username}</span>
            </td>
            <td>
                {review.updatedAt.split("T")[0]}
            </td>
            <td style={{ textAlign: "center" }}>
                <button
                    className="btn btn-danger"
                    style={{ margin: "0 0.5rem" }}
                    onClick={() => handleDelete(review.review_id)}
                >
                    <i className="fa fa-trash" />
                </button>
            </td>
        </tr>
    );
}

export default Review;


