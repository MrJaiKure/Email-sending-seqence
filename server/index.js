const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const flowRoutes = require('./routes/flowRoutes');
const userController = require('./controllers/userControllers');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', flowRoutes);
app.use('/api/user', userController);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
