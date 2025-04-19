const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

dotenv.config();

const authRoutes = require('../routes/authRoutes');
const loginRoutes = require('../routes/loginroutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: 'http://localhost:8080', // React frontend origin
  credentials: true
}));
app.use(express.json());

// 🧠 Session middleware
app.use(session({
  secret: "yourSecretKey", // ✅ Replace with env-safe secret in prod
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/agri", // ✅ Your MongoDB URL
    collectionName: 'sessions',                 // Optional
    ttl: 60 * 60 // 1 hour
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: false // set to true if HTTPS
  }
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes);

app.get('/', (req, res) => {
  res.send('Server running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});