var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact' , content: ""});
  console.log('Usuário entrou em Contact')
});

module.exports = router;