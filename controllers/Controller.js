const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  find: function (req, res) {
    db.User
      .find({ id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOrCreateUser: function (req, res) {
    console.log("this is the top of findOrCreateUser controller");
    db.User
      .findOne({ id: req.body.id })
      .then(user => {
        if (user) {
          console.log("there's already a user!")
          res.json(user)
        } else {
          console.log("time to create a user...")
          console.log(req.body)
          db.User
            .create({ name: req.body.name, id: req.body.id, upClaps: 0, downClaps: 0 })
            .then(user => { res.json(user) })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
