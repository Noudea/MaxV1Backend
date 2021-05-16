const router = require('express').Router()

router.get('/', function(req, res) {
  res.send('Birds home page');
});



module.exports = router ;