$(function(){
	var vid=window.location.href.split("=")[1];
	console.log(vid)
	var uri;
	$.ajax({
			type:'GET',
			data:{"id":vid},
			url:reapi()+"/showVideo",
			success:function(data){
				console.log(data);
				uri='http://'+data.uri;
				console.log(uri);
				/*$("#audio_id").append("<source src='http://"+data.uri+"'  type='video/mp4'>")*/
			},
			error:function(){
				alert("加载视频列表失败");
			}
	})
	
	 var myPlayer=videojs('audio_id');
	 myPlayer.ready(function(){
	 		myPlayer.src(uri);
            myPlayer.play();
            
            
            /*结束后直接播放下一部*/
            myPlayer.on("ended", function(){
            	$.ajax({
					type:'GET',
					data:{"id":vid},
					url:reapi()+"/showNextVideo",
					success:function(data){
						console.log(data);
						/*window.location.href="video.html?id="+data.id;*/
					},
					error:function(){
						alert("加载视频列表失败");
					}
				})
            	 myPlayer.src(uri);
				 myPlayer.play();
            });
            
        });
})
