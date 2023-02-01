var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Office = require('../models').office;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/findAll/json', function (req, res, next) {
  Office.findAll({
      attributes: { exclude: ["updatedAt"] },
      })
      .then(offices => {
          res.json(offices);
      })
      .catch(error => res.status(400).send(error))

});

module.exports = router;
