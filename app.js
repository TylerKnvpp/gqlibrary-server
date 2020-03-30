const express = require("express");
const app = express();
require("dotenv").config();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
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

app.use("/test", (req, res) => {
  res.json({ message: "hello" });
});

app.use(
  "/",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
