const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Event');
require('./models/Squad');
require('./services/passport');
require('./services/scheduler');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const squadRoutes = require('./routes/squadRoutes');
const mailRoutes = require('./routes/mailRoutes');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
/*
 * Tells the server to use cookies
 * maxAge: max time the cookie last
 */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//bind routes to app
authRoutes(app);
billingRoutes(app);
eventRoutes(app);
squadRoutes(app);
mailRoutes(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assests, e.g. main.js / main.css
  app.use(express.static('client/build'));

  //Experess will serve up index.html if the route is not recognised
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
 * Allows Heroku to inject environment variable PORT for dynamic PORT binding
 * Then listen on that PORT for requests
 * Alternatively, if no PORT if injected, use port 5000
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT || 5000);
