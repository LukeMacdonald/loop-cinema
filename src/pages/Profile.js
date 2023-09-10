import { getUserObject } from "../data/userRepository";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../data/userRepository";
import EditProfile from "../components/EditProfile";
import { useState} from "react";

function Profile(props){
    const navigate = useNavigate();
    const [user,setUser] = useState(getUserObject(props.email));
    const [modalShow, setModalShow] = useState(false);  
 
    const date = new Date(user.joined);
    const handleDelete = (event) => {
        event.preventDefault();
        const userConfirmed = window.confirm('Are you sure you want to delete?');
        if (userConfirmed) {
            removeUser();
            window.alert("User Deleted!");
            props.logoutUser();
            navigate("/");
        };
    }
     // Add this useEffect to reload the window when modalShow changes
      
    const formattedDate = date.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      return (
        <div>
            <div style={{width:'50%',margin:'2% auto'}}>
                <h1 className="username">{user.name}</h1>
                <div className="row">
                    <div className="col-6">
                        <h4 style={{marginTop:'5%'}}>About:</h4>
                    </div>
                    <div className="col-6" style={{textAlign:'right'}}>
                        <button type="button"  onClick={() => setModalShow(true)} className="btn btn-outline-secondary" style={{width:'40px', marginTop:'0.5rem',height:'40px'}}><i className="fa fa-pen-to-square" style={{fontSize:'0.9rem'}}/></button>
                    </div>

                </div>
                
                <div className="row">
                    <hr></hr>
                    <div className="col-6">
                        <p><b>Email:</b></p>
                        <p><b>Date Joined:</b></p>
                    </div>
                    <div className="col-6">
                        <p>{user.email}</p>
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <div style={{textAlign:'center', marginTop:'4rem'}}>
                    <button type="button" onClick={handleDelete} className="btn btn-outline-danger" style={{width:'200px'}}>Delete Account</button>
                </div>
                
                <EditProfile show={modalShow} onHide={() => setModalShow(false)} email={user.email} setUser={setUser}/>
              
            </div>
        </div>
    )
}
export default Profile

