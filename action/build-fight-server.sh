echo "当前时间:" $(date "+%Y-%m-%d %H:%M:%S")

/usr/bin/curl --data-urlencode "bat=build-battle-server" http://192.168.180.189/build-battle-server/index.php
