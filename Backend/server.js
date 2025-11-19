const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');

// load env
dotenv.config();

// connect db
connectDB();

// init app
const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // parse json bodies

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/farmers', require('./routes/farmerRoutes'));
app.use('/api/buyers', require('./routes/buyerRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// health check
app.get('/', (req, res) => res.send('LimaMarket API is running'));

// error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
