$(document).ready(function(){
	var dotNumber = 0;
	var intervalNumber = 0;

	function do_it(zone, action) {
        console.log(zone, action);
        var socket = io();
        socket.on('cmd', function(msg) {
            console.log(msg);
        });
        socket.on('cmd result', function(msg) {
            var logObj = $('#log');
            var log = logObj.text();
            logObj.text(log + msg);
        });
        socket.on('cmd end', function(msg) {
            $('button').removeAttr('disabled');
            socket.close();
        });
        socket.on('msg error', function(msg) {
            var logObj = $('#log');
            var log = logObj.text();
            logObj.text(log + msg);
            $('button').removeAttr('disabled');
        });
        socket.emit('cmd', {zone: zone, action: action});
	}

	$(".action").click(function() {
		var zone = $("#server-show").attr("zone");
        console.log(zone);
		if(!zone) {
			alert("请选择区服");
			return false;
		}

		if($(this).hasClass("confirm")) {
			var confirmContent = "确定" + $(this).text() + "?";
			if(!confirm(confirmContent)) {
				return false;
			}
		}

		var btnName = $(this).text();
		$("#log").text(btnName + '\n');
		$("button").attr("disabled", "true");
		var action = $(this).attr("id");
		console.log(action);

		do_it(zone, action);
	});

	$(".server").click(function() {
		//console.log($(this).text());
		//console.log($(this).attr("user"));

		var server_info = {"zone": $(this).attr("zone"), "title": $(this).text()};
		$.cookie("server", JSON.stringify(server_info));
		//console.log($.cookie("server"));

		$("#server-show").attr("zone", $(this).attr("zone"));
		$("#server-show").text($(this).text());
	});
});
