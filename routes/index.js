var express = require('express');
const Schedule = require('../models/schedule');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = '予定調整くん';
  if (req.user) {
    Schedule.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['updatedAt', 'DESC']]
    }).then(schedules => {
      res.render('index', {
        tilte: title,
        user: req.user,
        schedules: schedules
      });
    });
  } else {
    res.render('index', { title: title, user: req.user });
  }
});

module.exports = router;
