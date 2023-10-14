const express = require("express");
const cors = require("cors");
const db = require("./database/index");
const app = express();


db.sync();
// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

require("./routers/user-router")(express, app);
require("./routers/movie-router")(express, app);
require("./routers/review-router")(express, app);
require("./routers/session-router")(express, app);
require('./routers/admin-router')(express, app);
require("./routers/reserveration-router")(express, app);


app.post('/terminate', (req, res) => {
  console.log('Terminating the app...');
  res.send('App terminated');
  process.exit(0); // Exit the Node.js process with a success code (0)
});

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



module.exports = app;