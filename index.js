const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5200;

app.use(cors());

app.use(bodyParser.json());

let subs = [];

app.post("/api/subs", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required. " });
  }
  if (subs.includes(email)) {
    return res.status(400).json({
      error: "Email is already Subscribed.",
      message: "This email is alreayd in use.",
    });
  }

  subs.push(email);

  return res.status(200).json({ success: true });
});

app.get("/api/subs", (req, res) => {
  const SubscriptionsResult = subs.map((email) => {
    return {
      email,
      message: subs.includes(email)
        ? "This email is already in use."
        : "This email is avaliable for use.",
    };
  });
  res.json({ subscriptions: SubscriptionsResult });
});

app.listen(port, () => {
  console.log(`server up on localhost:${port}`);
});
