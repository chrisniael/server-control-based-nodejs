var express = require('express');
var router = express.Router();

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
      title: '服务器控制工具',
      zone: zoneConfig,
      zones: {
          1: {
              'ip': '192.168.181.38',
              'user': 'linfu',
              'title': '1服, 林富'
          },
          2: {
              'ip': '192.168.181.15',
              'user': 'zjh',
              'title': '2服, 郑锦红'
          },
          3: {
              'ip': '192.168.181.15',
              'user': 'jiangdongjing',
              'title': '3服, 蒋东静'
          },
          4: {
              'ip': '192.168.181.15',
              'user': 'shenyu',
              'title': '4服, 喻文'
          },
          6: {
              'ip': '192.168.181.38',
              'user': 'rose',
              'title': '6服, 版本服'
          },
          9: {
              'ip': '192.168.172.95',
              'user': 'shenyu',
              'title': '9服, 沈煜'
          },
          10: {
              'ip': '192.168.172.156',
              'user': 'linfu',
              'title': '10服, 林富'
          },
          20: {
              'ip': '192.168.172.156',
              'user': 'qyc',
              'title': '20服, 王经宇'
          }
      },
      actions: {
          'update-compile-restart-server': {
              'title': '做个新的服务器',
              'style': 'primary',
              'confirm': true
          },
          'restart-server': {
              'title': '重启服务器',
              'style': 'danger',
              'confirm': true
          },
          'state': {
              'title': '服务器跪了没',
              'style': 'default',
              'confirm': false
          },
          'hupkill': {
              'title': '更新策划大爷配置',
              'style': 'success',
              'confirm': true
          },
          'update-fight-server': {
              'title': '更新战斗服务器',
              'style': 'warning',
              'confirm': true
          },
          'build-fight-server': {
              'title': '更新战斗服务器',
              'style': 'danger',
              'confirm': true
          },
          }
      });
});

module.exports = router;
