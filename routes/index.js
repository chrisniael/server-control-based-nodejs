var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);

  var zoneConfig = {};
  if(req.cookies.server) {
      var serverZoneJson = req.cookies.server;
      var cookieServer = JSON.parse(serverZoneJson);
      if(cookieServer.zone && cookieServer.title) {
          zoneConfig = {
          'id': cookieServer.zone,
          'title': cookieServer.title
          };
      }
  }

  res.render('index', {
      title: config.title,
      zone: zoneConfig,
      zones: config.zones,
      actions: config.actions
      });
});

module.exports = router;
