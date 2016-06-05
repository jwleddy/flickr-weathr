var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', wuKey: process.env.WU_KEY, flickrKey: process.env.FLICKR_KEY });
  console.log(process.env.WU_KEY);
});

module.exports = router;
