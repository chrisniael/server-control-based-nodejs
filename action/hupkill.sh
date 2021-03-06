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

echo "热更配置...    "
./hupload.sh >> $log_file
check $?
