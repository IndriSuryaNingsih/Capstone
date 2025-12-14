require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./src/routes/auth');
const assignmentRoutes = require('./src/routes/assignments');
const feedbackRoutes = require('./src/routes/feedback');
const progressRoutes = require('./src/routes/progress');
const userRoutes = require('./src/routes/users');
const focusRoutes = require('./src/routes/focus');

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(morgan('dev'));

// 🔒 CORS FINAL (Netlify + local dev)
app.use(cors({
  origin: [
    "https://zenfokusss.netlify.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// =======================
// HEALTH CHECK
// =======================
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
  });
});

// =======================
// ROUTES
// =======================
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/users', userRoutes);

// =======================
// ERROR HANDLER
// =======================
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// =======================
// START SERVER
// =======================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
