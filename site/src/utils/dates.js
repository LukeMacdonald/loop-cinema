// Array to map numeric month to month names
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Function to format date from '2023-09-23T10:00:00.000Z' to '23 Sep'
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
};

// Function to format time from '2023-09-23T10:00:00.000Z' to '10:00 AM'
const formatTime = (timeString) => {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
};

// Function to get the day of the week from '2023-09-23T10:00:00.000Z'
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long' };
  return date.toLocaleDateString(undefined, options);
};

// Function to format a full date and time like '23 Sep 2023 at 10:00 AM'
const formatFullDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formattedDate = formatDate(dateTimeString);
  const formattedTime = formatTime(dateTimeString);
  const year = date.getFullYear();
  return `${formattedDate} ${year} at ${formattedTime}`;
};

// Function to format date in 'dd/mm/yyyy' format
const formatDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
function formatHoursAndMinutes(dateString) {
  const dateObject = new Date(dateString);
  const hours = dateObject.getHours().toString().padStart(2, '0'); // Gets the hours (0-23) and pads with 0 if necessary
  const minutes = dateObject.getMinutes().toString().padStart(2, '0'); // Gets the minutes (0-59) and pads with 0 if necessary
  return `${hours}:${minutes}`;
}
function groupSessionsByDate(sessions) {
  const groupedSessions = sessions.reduce((acc, session) => {
      const sessionDate = formatDate(session.session_time);
      if (!acc[sessionDate]) {
          acc[sessionDate] = [];
      }
      acc[sessionDate].push(session);
      return acc;
  }, {});
  return groupedSessions;
}
export {
  formatDate, formatTime, getDayOfWeek, formatFullDate, formatDDMMYYYY, formatHoursAndMinutes, groupSessionsByDate
};