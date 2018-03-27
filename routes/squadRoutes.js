const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const uuidv4 = require('uuid/v4');
const mailSend = require('../services/mailSender');

const Squad = mongoose.model('Squad');

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

module.exports = app => {
  //Create a new Squad and save to database
  app.post('/api/squads', requireLogin, async (req, res) => {
    console.log('REQUEST BODY: ', req.body);
    console.log('REQUEST USER:', req.user.id);
    const { name, members } = req.body;

    try {
      const newSquad = new Squad({
        name: name,
        _user: req.user.id,
        members: []
      });
      console.log('SQUAD', newSquad);

      let savedSquad = await newSquad.save();

      res.send(savedSquad);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //Get all events for the logged in user
  app.get('/api/squads', async (req, res) => {
    //console.log(req.user);
    if (req.user) {
      let squads = await Squad.find({ _user: req.user._id });
      console.log(squads);
      res.send(squads);
    } else {
      res.send(false);
    }
  });
};
