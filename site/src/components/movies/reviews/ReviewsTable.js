import { useAuth } from "../../../AuthContext";
import Review from "./Review";
function ReviewsTable({ reviews }) {
  const { state } = useAuth();
  const username = state.username;
  return (
    <div
      className="bg-dark-900 "
      style={{ padding: "1rem", borderRadius: "10px", margin: "1rem" }}
    >
      <table className="bg-gray-300 text-black rounded-md">
        <thead>
          <tr className="py-5">
            <th className="py-2" style={{ width: "15%" }}>
              Rating
            </th>
            <th className="py-2" style={{ width: "40%" }}>
              Comment
            </th>
            <th className="py-2" style={{ width: "15%" }}>
              Date
            </th>
            <th className="py-2" style={{ width: "20%" }}></th>
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
