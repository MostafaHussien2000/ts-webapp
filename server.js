const express = require("express");
const jsonServer = require("json-server");

const app = express();

app.use("/", express.static("dist"));
app.use("", express.static("assets"));

const router = jsonServer.router("data.json");

app.use(jsonServer.bodyParser);
app.use("/api", (req, res, next) => router(req, res, next));

const port = process.argv[3] || 4000;

app.listen(port, () =>
  console.log("Your application in running on: http://localhost:", port)
);
