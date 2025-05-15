var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// your new route
router.get('/hello', (req, res) => {
  res.send('Hello, RMS Backend is alive!');
});

module.exports = router;
