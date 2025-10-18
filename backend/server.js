const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const aiRoutes=require('./routes/aiRoutes');
dotenv.config();




const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();
app.use('/api/ai', aiRoutes);

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
