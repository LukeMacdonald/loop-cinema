import Movies from "../components/movies/Movies";
import Users from "../components/users/Users";

function Dashboard(){
    return(
        <div style={{marginTop:'2rem'}}>
            <h1>Admin Dashboard</h1>
            <Users/>
            <Movies/>
        </div>
    )

}
export default Dashboard;