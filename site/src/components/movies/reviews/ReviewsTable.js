import { useAuth } from "../../../AuthContext";
import Review from "./Review";
function ReviewsTable({ reviews }) {
  const { state } = useAuth();
  const username = state.username;
  return (
    <div
      className="bg-dark-900 text-light"
      style={{ padding: "1rem", borderRadius: "10px", margin: "1rem" }}
    >
      <table className="table table-dark">
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Rating</th>
            <th style={{ width: "40%" }}>Comment</th>
            <th style={{ width: "15%" }}>Date</th>
            <th style={{ width: "20%" }}></th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <Review
              key={index}
              review={review}
              username={username}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ReviewsTable;

