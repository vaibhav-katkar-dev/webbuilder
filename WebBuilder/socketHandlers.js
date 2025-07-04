// socketHandlers.js
const User = require('./models/User');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('check-username', async (username, callback) => {
      if (!username || typeof username !== 'string') return callback({ error: 'Invalid input' });

      const exists = await User.exists({ username });
      callback({ available: !exists });
    });

    socket.on('check-email', async (email, callback) => {
      if (!email || typeof email !== 'string') return callback({ error: 'Invalid input' });

      const exists = await User.exists({ email });
      callback({ available: !exists });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
