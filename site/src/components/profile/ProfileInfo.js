import { formatFullDate } from "../../utils/dates";
function ProfileInfo({ user }) {
  return (
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
        <p>{formatFullDate(user.createdAt)}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;