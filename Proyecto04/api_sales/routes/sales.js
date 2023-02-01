var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/findAll/json', function (req, res, next) {
    const URL = 'https://dawm-d53a4-default-rtdb.firebaseio.com/sales.json';
    const response = axios.get(URL);
    response.then((data) => {
        res.json(data.data);
    });
});

router.get("/findById/:id/json", function (req, res, next) {
    const URL = 'https://dawm-d53a4-default-rtdb.firebaseio.com/sales/' + req.params.id + '.json';
    const response = axios.get(URL);
    response.then((data) => {
        res.json(data.data);
    });
});
router.get("/shippedByCn/:customerNumber", function (req, res, next) {
    const URL = 'https://dawm-d53a4-default-rtdb.firebaseio.com/sales.json?orderBy=%22customerNumber%22&equalTo=' + req.params.customerNumber;
    const response = axios.get(URL);
    response.then((data) => {
        let shippedSales = [];
        for (let key in data.data) {
            if (data.data[key].status === 'Shipped') {
                shippedSales.push(data.data[key]);
            }
        }
        res.json(shippedSales);
    });
});

module.exports = router;
