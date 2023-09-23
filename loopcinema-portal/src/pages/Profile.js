import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserProfile, removeUser } from '../data/repository';
import EditProfile from "../components/modals/EditProfile";

function Profile(props) {
  const navigate = useNavigate();
  const {username} = useParams()
  const [user, setUser] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const account = await getUserProfile(username)
        setUser(account);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [username]);

  const formatJoin = (dataString) =>{
    const date = new Date(dataString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    // Format the date and time components
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return `${formattedDate} at ${formattedTime}`;
  }

  // Function to handle user account deletion
  const handleDelete = async () => {
    const userConfirmed = window.confirm('Are you sure you want to delete your account?');

    if (userConfirmed) {
      try {
        await removeUser(user.username); // Assuming removeUser takes the user ID as a parameter
        window.alert("User Deleted!");
        props.logoutUser();
        navigate("/");
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };

  return (
    <div>
      <div style={{ width: '50%', margin: '2% auto' }}>
        <h1 className="username">{user.name}</h1>
        <div className="row">
          <div className="col-6">
            <h4 style={{ marginTop: '5%' }}>About:</h4>
          </div>
          <div className="col-6" style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => setModalShow(true)}
              className="btn btn-outline-secondary"
              style={{ width: '40px', marginTop: '0.5rem', height: '40px' }}
            >
              <i className="fa fa-pen-to-square" style={{ fontSize: '0.9rem' }} />
            </button>
          </div>
        </div>

        <div className="row">
          <hr></hr>
          <div className="col-6">
            <p><b>Username:</b></p>
            <p><b>Email:</b></p>
            <p><b>Date Joined:</b></p>
          </div>
          <div className="col-6">
            <p>{user.username}</p>
            <p>{user.email}</p>
            {/* Assuming user.username should be user.createdAt */}
            <p>{formatJoin(user.createdAt)}</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-outline-danger"
            style={{ width: '200px' }}
          >
            Delete Account
          </button>
        </div>

        {/* Uncomment the following line if you plan to use an EditProfile modal */}
        <EditProfile show={modalShow} onHide={() => setModalShow(false)} user={user} setUser={setUser}/>
      </div>
    </div>
  );
}

export default Profile;
