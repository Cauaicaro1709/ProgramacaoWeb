var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfolio' , content: ""});
  console.log('Usuário entrou em Portfolio')
});

module.exports = router;