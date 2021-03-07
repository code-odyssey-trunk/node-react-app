var express = require("express");
var router = express.Router();
var db = require("../database");

//Get all users
router.get("/all", function (req, res) {
  db.User.findAll()
    .then((users) => {
      res.status(200).send(JSON.stringify(users));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

//Get a user by id
router.get("/:id", function (req, res) {
  db.User.findByPk(req.params.id)
    .then((users) => {
      res.status(200).send(JSON.stringify(users));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

//Login using username and password
router.post("/", function async(req, res) {
  const { userName, password } = req.body;
  db.User.findOne({ where: { userName, password } })
    .then((users) => {
      res.status(200).send(JSON.stringify(users));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

//Create a user
router.put("/", function (req, res) {
  const { name, userName, password, id } = req.body;
  db.User.create({
    name,
    userName,
    password,
    id,
  })
    .then((users) => {
      res.status(200).send(JSON.stringify(users));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

//Update name of user using id
router.put("/update", function (req, res) {
  db.User.update({ name: req.body.name }, { where: { id: req.body.id } })
    .then(function (rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

//Delete a user using id
router.delete("/:id", function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

module.exports = router;
