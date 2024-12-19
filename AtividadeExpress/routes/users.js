var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var characters =[
    {
      name: 'Harry',
      role: 'Student'
    },
    {
      name: 'Dumbledore',
      role: 'Headmaster'
    },
    {
      name: 'Snape',
      role: 'Professor'
    },
    {
      name: 'Hermione',
      role: 'Student'
    }
  ];
  var subheading = "I though we should involve some magic";
  
  res.render('users', {characters: characters, subheading: subheading});
});

module.exports = router;