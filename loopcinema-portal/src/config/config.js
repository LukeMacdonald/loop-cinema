 // Array to map numeric month to month names
 const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

 // Function to format date from '2023-09-23T10:00:00.000Z' to '23 Sep'
 const formatDate = (dateString) => {
   const date = new Date(dateString);
   console.log(dateString);
   return `${date.getDate()} ${monthNames[date.getMonth()]}`;
 };
 const extractTime = (timeString) => {
   const date = new Date(timeString);
   const hours = date.getHours();
   const minutes = date.getMinutes();
   const amOrPm = hours >= 12 ? 'PM' : 'AM';
   const formattedHours = hours % 12 || 12;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
 };
 // Function to get the day of the week from '2023-09-23T10:00:00.000Z'
 const getDayOfWeek = (dateString) => {
   const date = new Date(dateString);
   const options = { weekday: 'long' };
   return date.toLocaleDateString(undefined, options);
 };

 export{
    formatDate, extractTime, getDayOfWeek
 }