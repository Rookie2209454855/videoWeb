	var vid=window.location.href.split("=")[1];
	console.log(vid)
	$.ajax({
			type:'GET',
			data:{"id":vid},
			url:reapi()+"/showVideo",
			success:function(data){
				console.log(data);
				$("#audio_id").append("<source src='http://"+data.uri+"'  type='video/mp4'>")
			},
			error:function(){
				alert("加载视频列表失败");
			}
		})
