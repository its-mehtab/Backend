import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// let dayIsWeekend = false;
let weekendMsg = "Its Weekday, Its time to WORK HARD";

function getDay(req, res, next) {
  const day = new Date().getDay();

  if (day === 0 || day === 6) {
    // dayIsWeekend = true;
    weekendMsg = "Its Weekend, Its time to WORK even HARDER";
  }
  next();
}

app.use(getDay);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    // dayIsWeekend: dayIsWeekend,
    weekendMsg: weekendMsg,
  });

  //   res.send(
  //     `<h1>Hey!  ${
  //       dayIsWeekend
  //         ? "Its Weekend, Its time to WORK even HARDER"
  //         : "Its Weekday, Its time to WORK HARD"
  //     }</h1>`
  //   );
});

// app.post("/submit", (req, res) => {
//   console.log(req.getDate);
// });

app.listen(port, () => {
  console.log(`Its Live On ${port}`);
});
