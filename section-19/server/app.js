const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const configs = require('./config/index.js');
const productRouter = require('./modules/products/product.router');
const categoryRouter = require('./modules/categories/category.router');
const userRouter = require('./modules/users/user.router');
const authRouter = require('./modules/auth/auth.router');
const authenticateMw = require('./middlewares/authenticate');

mongoose.connect(configs.MONGO_CONNECTION_URL);

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/api/products', productRouter.router);
app.use('/api/categories', authenticateMw.authenticate, categoryRouter.router);
app.use('/api/users', userRouter.router);
app.use('/api/auth', authRouter.router);
app.use('/images', express.static(__dirname + '/images'));

app.listen(configs.PORT, function () {
  console.log(`Server listening on port ${configs.PORT}`);
});
