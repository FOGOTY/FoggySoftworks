const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve a simple HTML page if needed

// In-memory storage for active players: { username: lastRequestTimestamp }
let activePlayers = {};
let onlineCount = 0;

// Cleanup function to remove inactive players (run every 30 seconds)
setInterval(() => {
  const now = Date.now();
  const inactive = [];
  for (const [username, timestamp] of Object.entries(activePlayers)) {
    if (now - timestamp > 60000) { // 1 minute = 60000 ms
      inactive.push(username);
    }
  }
  inactive.forEach(username => {
    delete activePlayers[username];
    onlineCount--;
  });
  console.log(`Cleaned up ${inactive.length} inactive players. Online: ${onlineCount}`);
}, 30000); // Check every 30 seconds

// POST endpoint: /ping - Receives player data
app.post('/ping', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }

  const now = Date.now();
  if (activePlayers[username]) {
    // Update existing
    onlineCount--; // Temporarily decrement to avoid double-count
  } else {
    // New player
    onlineCount++;
  }
  activePlayers[username] = now;

  console.log(`Ping from ${username}. Online: ${onlineCount}`);
  res.json({ success: true, online: onlineCount });
});

// GET endpoint: /online - Returns current online count
app.get('/online', (req, res) => {
  res.json({ online: onlineCount });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
