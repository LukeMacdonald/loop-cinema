import { useParams } from "react-router-dom";
import { useReservations } from "../hooks/useReservations";
import ReservationCard from "../components/profile/reservations/ReservationCard";
import ProfileSidebar from "../components/navigation/ProfileSidebar";
import '../styles/styles.css'

function ProfileReservation () {
  const {username} = useParams()
  const reservations = useReservations(username)

  return (
    <div className="row">
      <ProfileSidebar username={username}/>
     <div className="col-md-7" style={{  margin: '2% auto' }}>
     <h2>Booked Reservations</h2>
        {reservations.map((reservation, index) => (
          <ReservationCard reservation={reservation}/>
      ))}
      </div>
  </div>
  );
}

export default ProfileReservation;