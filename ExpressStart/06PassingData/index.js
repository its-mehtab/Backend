import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// let letters;
// function letterCalc(req, res, next) {
//   const name = req.body["fName"] + req.body["lName"];

//   letters = name.length;

//   next();
// }

// app.use(letterCalc);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const letters = req.body["fName"].length + req.body["lName"].length;

  res.render("index.ejs", { letters: letters });
});

app.listen(port, () => {
  console.log(`Port's Running ${port}`);
});
