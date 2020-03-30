const express = require("express");
const app = express();
require("dotenv").config();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const PORT = 4000 || process.env.PORT;
const uri = process.env.MONGODB_URI;
const cors = require("cors");

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Cluster has been connected");
});

app.use(cors());

// app.use("/", (req, res) => {
//   res.json({ message: "hello" });
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
