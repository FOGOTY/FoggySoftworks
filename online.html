import express from "express";
const app = express();
app.use(express.json());

let activePlayers = {}; // { userid: lastActive timestamp }

// POST /api/ping - receive ping from Roblox
app.post("/api/ping", (req, res) => {
  const { userid } = req.body;
  if (!userid) return res.status(400).json({ success: false, message: "No userid" });

  activePlayers[userid] = Date.now();

  // Remove inactive players > 60s
  for (const id in activePlayers) {
    if (Date.now() - activePlayers[id] > 60000) delete activePlayers[id];
  }

  res.json({ success: true, online: Object.keys(activePlayers).length });
});

// GET / - show HTML page with online count
app.get("/", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Online Players</title>
    <style>
      body { background:#0e0e0e; color:#00ffaa; font-family:monospace; text-align:center; margin-top:80px; }
      h1 { font-size:48px; }
    </style>
  </head>
  <body>
    <h1>🌐 Online Players: ${Object.keys(activePlayers).length}</h1>
  </body>
  </html>
  `;
  res.send(html);
});

// Listen on Vercel port
app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
