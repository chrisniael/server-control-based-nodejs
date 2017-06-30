echo "当前时间:" $(date "+%Y-%m-%d %H:%M:%S")

ps x | grep -E "SuperServer -d|RecordServer -d|SessionServer -d|ScenesServer -d|GatewayServer -d|FunctionServer -d|mono BattleServerForSocket.exe|mono SingleDeployTool.exe" | grep -v "grep"

server_num=$(ps x | grep -E "SuperServer -d|RecordServer -d|SessionServer -d|ScenesServer -d|GatewayServer -d|FunctionServer -d|mono BattleServerForSocket.exe|mono SingleDeployTool.exe" | grep -v "grep" | wc -l)

echo "共启动 <span style=\"color: blue;\">$server_num</span> 个服务器"

if [ $server_num -eq 9 ]
then
    echo "<span style=\"color: blue;\">服务器还活着 :-)</span>"
else
    echo "<span style=\"color: red;\">服务器跪了:-(</span>"
fi
