var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// calculate total
router.post('/calculateTotal', function(req, res, next) {
  const { arr } = req.body;
  let quantityOrdered = arr[0];
  let priceEach = arr[1];
  const total = quantityOrdered * priceEach;
  let d = {"total": total};
  res.json(d);
});


module.exports = router;
