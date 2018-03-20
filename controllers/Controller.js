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
    db.User
      .findOne({ id: req.body.id })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
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
      .findOneAndUpdate({ id: req.params.id }, req.body,{new:true})
      .then(data => {
        res.json(data);
      })
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
