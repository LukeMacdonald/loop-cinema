import { formatHoursAndMinutes } from "../../../utils/dates";

export function Sessions(props) {
    const { sessions } = props;
    return (
        <div className='row'>
            {sessions.map((session, index) => (
                <a href={`/reservation/${session.movie_id}/${session.session_id}`} className="col-md-4" style={{ textDecoration: 'none', color: 'black' }} key={index}>
                    <div className="session-box">
                        <h6>{formatHoursAndMinutes(session.session_time)}</h6>
                        <h6>{session.available_seats} <i className="fa-solid fa-ticket"></i></h6>
                    </div>
                </a>
            ))}
        </div>
    );
}
