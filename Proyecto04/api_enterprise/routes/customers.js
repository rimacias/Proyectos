var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Customer = require('../models').customer;

router.get('/findAll/json', function (req, res, next) {
    Customer.findAll({
        attributes: { exclude: ["updatedAt"] },
    })
        .then(customers => {
            res.json(customers);
        })
        .catch(error => res.status(400).send(error))

});
router.get('/findByCn/:cn/json', function (req, res, next) {
    Customer.findAll({
        attributes: { exclude: ["updatedAt"] },
        where: {
            customerNumber: req.params.cn
        }
    })
        .then(customers => {
            res.json(customers);
        })
        .catch(error => res.status(400).send(error))

});
module.exports = router;
