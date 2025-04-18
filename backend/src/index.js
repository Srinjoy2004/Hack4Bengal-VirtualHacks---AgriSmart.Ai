const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// Route files
const authRoutes = require('../routes/authRoutes');
const loginRoutes = require('../routes/loginroutes'); // ✅ newly added

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes); // ✅ add login route under same '/api/auth'

// Base route
app.get('/', (req, res) => {
  res.send('Server running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
