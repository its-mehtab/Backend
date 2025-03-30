import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = process.env.YOUR_USERNAME;
const yourPassword = process.env.YOUR_PASSWORD;
const yourAPIKey = process.env.YOUR_API_KEY;
const yourBearerToken = process.env.YOUR_BEARER_TOKEN;

async function apiReq(req, res, endpoint, options) {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, options);
    console.log(JSON.stringify(response.data));

    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error(error);
  }
}

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.

  apiReq(req, res, "random");
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

  apiReq(req, res, "all?page=2", {
    auth: { username: yourUsername, password: yourPassword },
  });
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  apiReq(req, res, `filter?score=5&apiKey=${yourAPIKey}`);
  // apiReq(req, res, `filter?score=5`, {
  //   headers: {
  //     Authorization: yourAPIKey,
  //   },
  // });
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  apiReq(req, res, "secrets/42", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
