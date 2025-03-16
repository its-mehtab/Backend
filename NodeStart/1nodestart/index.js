const fs = require("fs");

// fs.writeFile("message.txt", "Hello From Node.js", "utf8", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

fs.readFile("./message.txt", "utf8", (err, data) => {
  if (err) throw err;
  fs.writeFile("message.txt", "Hello From Mehtab's Node", "utf8", (err) => {
    if (err) throw err;
    console.log("Rewrite has been saved!");
  });
});
