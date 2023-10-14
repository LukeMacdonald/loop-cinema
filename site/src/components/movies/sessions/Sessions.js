import { formatTime } from "../../../utils/dates";

export function Sessions(props) {
    const { sessions } = props;
    return (
        <div className='row'>
            {sessions.map((session, index) => (
                <a href={`/reservation/${session.movie_id}/${session.session_id}`} className="col-md-4 col-xs-7" style={{ textDecoration: 'none', color: 'black', maxWidth:'90%' }} key={index}>
                    <div className="session-box">
                        <h5>{formatTime(session.session_time)}</h5>
                        <h5>{session.available_seats} <i className="fa-solid fa-ticket"></i></h5>
                    </div>
                </a>
            ))}
        </div>
    );
}
