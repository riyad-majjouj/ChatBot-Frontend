
const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const db = new Database(path.join(__dirname, 'chat.db'));

// Set up the database with needed tables
function setupDatabase() {
  console.log('Setting up database...');
  
  // Create chats table to store chat history
  db.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database setup complete');
}

// Database operations
function saveMessage(sender, content) {
  const stmt = db.prepare('INSERT INTO chats (sender, content) VALUES (?, ?)');
  const info = stmt.run(sender, content);
  return info.lastInsertRowid;
}

function getMessages(limit = 50) {
  const stmt = db.prepare('SELECT * FROM chats ORDER BY timestamp DESC LIMIT ?');
  return stmt.all(limit);
}

module.exports = {
  setupDatabase,
  saveMessage,
  getMessages,
  db
};
