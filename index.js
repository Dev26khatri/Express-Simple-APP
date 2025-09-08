const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const dataJson = require("./index.json");

// Set view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Homepage: list all profiles
app.get("/", (req, res) => {
  const usernames = Object.keys(dataJson);
  res.send(
    `<h2>Available profiles</h2>
     <ul>
       ${usernames.map((u) => `<li><a href="/ig/${u}">${u}</a></li>`).join("")}
     </ul>`
  );
});

// Profile page
app.get("/ig/:username", (req, res) => {
  const { username } = req.params;
  const instaData = dataJson[username];

  if (!instaData) {
    return res.status(404).send("❌ User not found");
  }

  res.render("index.ejs", { data: instaData });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
