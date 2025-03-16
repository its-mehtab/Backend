import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const data = {
    title: "Ejs Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<em>this is some em text</em>",
  };

  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Port's Running on ${port}`);
});
