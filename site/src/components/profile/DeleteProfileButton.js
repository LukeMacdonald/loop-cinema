import { removeUser } from "../../data/repository";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
function DeleteAccountButton({ username }) {
  // Function to handle user account deletion
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (confirmation) {
      try {
        await removeUser(username); // Assuming removeUser takes the user ID as a parameter
        window.alert("User Deleted!");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <button
        type="button"
        onClick={handleDelete}
        className="bg-red-700 rounded-md py-2 hover:bg-red-500"
        style={{ width: "200px" }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccountButton;

