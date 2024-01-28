import { formatTime } from "../../../utils/dates";

export function Sessions(props) {
  const { sessions } = props;
  return (
    <div className="row">
      {sessions.map((session, index) => (
        <a
          href={`/reservation/${session.movie_id}/${session.session_id}`}
          className="col-md-4 text-black hover:text-white col-xs-7"
          style={{ textDecoration: "none", maxWidth: "90%" }}
          key={index}
        >
          <div className=" flex justify-between p-3 rounded-md text-white bg-gray-700 hover:bg-gray-500 border-l-4 border-l-purple-700">
            <h5>{formatTime(session.session_time)}</h5>
            <h5>
              {session.available_seats} <i className="fa-solid fa-ticket"></i>
            </h5>
          </div>
        </a>
      ))}
    </div>
  );
}
