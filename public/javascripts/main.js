$(document).ready(function(){
	var dotNumber = 0;
	var intervalNumber = 0;

	function do_it(btn, ip, user) {
		$.ajax({
			url: "action.php",
			data: {'action': btn.attr("id"), 'ip': ip, 'user': user},
			type: "POST",
			dataType: "json",
			async: true,
			success: function(data, textStatus) {
				clearInterval(intervalNumber);
				$("button").removeAttr("disabled");
				var preLog = $("#log").text();
				if(textStatus === "success")
				{
					//console.log(data);
					//console.log(data.status);
					/*if(data.status === 0)*/
					//{
						//$("#log").text(btn.text() + "成功");
					//}
					//else
					//{
						//$("#log").text(btn.text() + "失败");
					/*}*/
					$("#log").html(preLog + "<br/>" + data.output);
					//console.log(data.output);
				}
				else
				{
					$("#log").html(preLog + "<br/>"  + "请求错误");
				}
			}
		});

	}

	function loading(content) {
		++dotNumber;
		console.log("dotNumber=" + dotNumber + "content=" + content);
		dotNumber %= 4;

		var dotString = "";
		for(var i = 0; i < dotNumber; ++i) {
			dotString += ".";
		}
		$("#log").text(content + dotString);
	}

	$(".action").click(function() {
		var ip = $("#server-show").attr("ip");
		//console.log(ip);
		var user = $("#server-show").attr("user");
		if(!user) {
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
		$("#log").text(btnName);
		intervalNumber = setInterval(function() {		//匿名函数, 使setInterval能传递参数
				loading(btnName);
			}, 1000);

		$("button").attr("disabled", "true");
		action = $(this).attr("id");
		//console.log(action);

		do_it($(this), ip, user);
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
