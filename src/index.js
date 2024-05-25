const express = require("express");
const { PORT, MONGO_SERVER } = require("./config/serverConfig");
const { connectToDB } = require("./config/dbConfig");
const apiRouter = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use(apiRouter);

app.use((err, req, res) => {
  return res.json({ message: "Something Went Wrong" });
});

app.listen(PORT, () => {
  connectToDB(MONGO_SERVER);
  console.log(`Server Is Running On Port: ${PORT}`);
});
