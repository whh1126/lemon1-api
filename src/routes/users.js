var express = require('express');
var router = express.Router();
var user = require('./user/index.js');
console.log(user);


/* GET users listing. */
router.get('/', user.queryUser);
router.get('/api/addUser', user.addUser);




module.exports = router;