source .bashrc

LOG_FILE_DIR=~/log/control_tool
mkdir -p $LOG_FILE_DIR
echo "当前时间:" $(date "+%Y-%m-%d %H:%M:%S")
log_file_name="$(date +%Y%m%d-%H%M%S).log"
log_file=$LOG_FILE_DIR/$log_file_name


function check()
{
    if [ $1 -ne 0 ]
    then
        if [ -z "$2" ]
        then
            echo "<span style=\"color: red;\">失败!</span>"
        else
            echo "<span style=\"color: red;\">$2</span>"
        fi
        exit 1
    else
        if [ -z "$3" ]
        then
            echo "<span style=\"color: green;\">成功!</span>"
        else
            echo "<span style=\"color: green;\">$3</span>"
        fi
    fi
}


cd ~/FirServer/branches/branche_rose


echo "更新代码...    "
make svnup >> $log_file
check $?

echo "更新策划配置...    "
make res >> $log_file
check $?

echo "编译...    "
make -j16 >> $log_file
check $?

echo "重启服务器...    "
./RunServer.sh >> $log_file

SERVER_NUM=9

ps x | grep -E "SuperServer -d|RecordServer -d|SessionServer -d|ScenesServer -d|GatewayServer -d|FunctionServer -d|mono BattleServerForSocket.exe|mono SingleDeployTool.exe" | grep -v "grep"

server_num=$(ps x | grep -E "SuperServer -d|RecordServer -d|SessionServer -d|ScenesServer -d|GatewayServer -d|FunctionServer -d|mono BattleServerForSocket.exe|mono SingleDeployTool.exe" | grep -v "grep" | wc -l)


echo "共启动 <span style=\"color: blue;\">$server_num</span> 个服务器"

if [ $server_num -eq $SERVER_NUM ]
then
    echo "<span style=\"color: green;\">正常运行!</span>"
elif [ $server_num -lt 7 ] && [ $server_num -gt 0 ]
then
    echo "<span style=\"color: red;\">运行错误!</span>"
elif [ $server_num -eq 0 ]
then
    echo "<span style=\"color: red;\">未运行!</span>"
else
    echo "<span style=\"color: red;\">脚本出错!</span>"
fi
