const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("./src/database");
const graphql = require("./src/graphql");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphql.schema,
      rootValue: graphql.root,
      graphiql: true
    })
  );
  

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});