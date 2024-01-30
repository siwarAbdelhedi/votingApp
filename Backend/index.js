const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userManagement');
const musicRoutes = require('./routes/musicManagement');
const voteRoutes = require('./routes/voteManagement');
const votingSessionRoutes = require('./routes/voteSessionManagement');
const spotifyroute = require('./routes/spotifyRoute');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use('/api/users', userRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/voting-session', votingSessionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(spotifyroute);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };