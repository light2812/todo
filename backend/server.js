const express = require("express");
const app = express();
const storage = require("node-persist");
const cors = require("cors");

app.use(cors());
app.use(express.json());
storage.init().then(() => storage.clear());

app.get("/api/tasks", async (req, res) => {
  res.json(await storage.values());
});

app.post("/api/tasks", async (req, res) => {
  const { task } = req.body;
  await storage.setItem(Date.now().toString(), task);
  res.json({ success: true, message: "Task added successfully" });
});

app.listen(5000, () => {
  console.log(`Serverup`);
});
