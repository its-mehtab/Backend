import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import { writeFile } from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Type the URL to generate!",
    },
  ])
  .then((answers) => {
    console.log(`${answers.url} is Generated!`);

    const qr_svg = qr.image(answers.url);
    qr_svg.pipe(fs.createWriteStream(`${answers.url}.png`));

    writeFile("URL.txt", answers.url, "utf8", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });
