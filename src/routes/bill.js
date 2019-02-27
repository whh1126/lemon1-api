var express = require('express');
var router = express.Router();
var bill = require('./bill_api');
console.log(bill);


/* GET users listing. */


router.get('/api/bill', bill.addbill);
router.get('/api/getbill', bill.getbill);
router.get('/api/delbill', bill.delbill)
module.exports = router;