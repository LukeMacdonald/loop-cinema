import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserProfile } from '../data/repository';
import EditProfileModal from "../components/profile/EditProfileModal";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import DeleteAccountButton from "../components/profile/DeleteProfileButton";
import ProfileSidebar from "../components/navigation/ProfileSidebar";

function Profile(props) {
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

  return (
    <div className="row">
      <ProfileSidebar username={username}/>
     <div className="col-md-7" style={{  margin: '2% auto' }}>
        <ProfileHeader user={user} setModalShow={setModalShow} />
        <ProfileInfo user={user} />
        <DeleteAccountButton username={user.username} logoutUser={props.logoutUser} />
        <EditProfileModal show={modalShow} onHide={() => setModalShow(false)} user={user} setUser={setUser} />
      </div>
  </div>
  );
}

export default Profile;
