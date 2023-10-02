import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserProfile, getUserReservation } from '../data/repository';
import EditProfileModal from "../components/profile/EditProfileModal";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import DeleteAccountButton from "../components/profile/DeleteProfileButton";
import ReservationCard from "../components/reservations/ReservationCard";

function Profile(props) {
  const {username} = useParams()
  const [user, setUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const account = await getUserProfile(username)
        const reservation = await getUserReservation(username)
        setReservations(reservation)
        setUser(account);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [username]);

  return (
    <div className="row">
      <div className="col-md-6" style={{ width: '50%', margin: '2% auto' }}>
        <ProfileHeader user={user} setModalShow={setModalShow} />
        <ProfileInfo user={user} />
        <DeleteAccountButton username={user.username} logoutUser={props.logoutUser} />
        <EditProfileModal show={modalShow} onHide={() => setModalShow(false)} user={user} setUser={setUser} />
      </div>
      <div className="col-md-6">
        <h2>Booked Reservations</h2>
        {reservations.map((reservation, index) => (
          <ReservationCard reservation={reservation}/>
      ))}
      </div>

  </div>
  );
}

export default Profile;
