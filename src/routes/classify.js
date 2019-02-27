var express = require('express');
var router = express.Router();
var classfiyApi = require('./classify-api/index.js');
console.log(classfiyApi);


/* GET users listing. */
// router.get('/', user.queryUser);

router.get('/api/getCurom', classfiyApi.getCurom);
router.get('/api/addCurom', classfiyApi.addCurom);

module.exports = router;