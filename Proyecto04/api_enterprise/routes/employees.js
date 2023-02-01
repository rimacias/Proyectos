var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Employee = require('../models').employee;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/findAll/json', function (req, res, next) {
  Employee.findAll({
      attributes: { exclude: ["updatedAt"] },
      })
      .then(employees => {
          res.json(employees);
      })
      .catch(error => res.status(400).send(error))

});
module.exports = router;
