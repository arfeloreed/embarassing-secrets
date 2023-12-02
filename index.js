import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";
const yourUsername = "reed";
const yourPassword = "reed1234";
const yourAPIKey = "0bad964e-bd4a-441c-b4f1-be20b39aa22f";
const yourBearerToken = "5345caa7-8dc2-4ecc-9cbb-18e72569f992";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}random`);
  res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}all`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
    params: { page: 2 },
  });

  res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.get("/apiKey", async (req, res) => {
  const response = await axios.get(`${API_URL}filter`, {
    params: {
      score: 5,
      apiKey: yourAPIKey,
    },
  });

  res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.get("/bearerToken", async (req, res) => {
  const response = await axios.get(`${API_URL}secrets/42`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });

  res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
