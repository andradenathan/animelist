const express = require('express');
require('./config/dotenv')();
require('./config/sequelize');

const app = express();
const port = process.env.PORT;
const cors = require('cors');
const routes = require('./routes/routes');

const passport = require('passport');
require('./middlewares/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(routes);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});