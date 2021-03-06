
$(document).ready(function(){
	showDisk();
	showLink();

    /***
	 * 初始化
     */
	function showLink() {
		$.ajax({
			type:'GET',
			data:{
				"pageNo":pageNo,
				"pageSize":pageSize,
				"type":"mp4"
			},
			url:reapi()+"/showLink",
			success:function(data){
				console.log(data);
				$("#videLink").empty();
				$("#videLinkTemplate").tmpl({links:data.data}).appendTo("#videLink");
                fenye("fenye",data,showPage);
			},
			error:function(){
				alert("加载视频列表失败");
			}
		})
	}

    /***
	 * 回调展示页
     * @param obj
     */
    function showPage(obj) {
        $.ajax({
            type:'GET',
            data:{
                "pageNo":obj.curr,
                "pageSize":obj.limit,
                "type":"mp4"
            },
            url:reapi()+"/showLink",
            success:function(data){
                console.log(data);
                $("#videLink").empty();
                $("#videLinkTemplate").tmpl({links:data.data}).appendTo("#videLink");
            },
            error:function(){
                showalert("加载视频列表失败");
            }
        })
    }

	function showDisk() {
		$.ajax({
			type:'GET',
			dataType: "json",
			url:reapi()+"/Disks",
			success:function(data){
				console.log(data);
				$("#disks").empty();
				$("#disksTemplate").tmpl({_disks:data}).appendTo("#disks");
			},
			error:function(){
                showalert("加载磁盘列表失败");
			}
		})
	}
	
	$("#scanning").click(function () {
		$("#disks").attr("disabled","disabled");
		var dir=$("#disks").val();
		if(dir!=0){
			$.ajax({
				type:'GET',
				data:{
					"dir":dir
				},
				dataType: "json",
				url:reapi()+"/init",
				success:function(data){
					$("#disks").removeAttr("disabled");
					alert("已添加"+data+"条视频!");
					showLink();
				},
				error:function(){
                    showalert("添加磁盘文件失败");
				}
			})
		}
	});

	$("#myButton4").click(function(){
		$(this).button('扫描中...').delay(1000).queue(function() {
			$(this).button('complete');
		});
	});

	$("#videoQuery").blur(function () {
		$.ajax({
			type:'GET',
			data:{
				"name":$("#videoQuery").val(),
				"pageNo":pageNo,
				"pageSize":pageSize
			},
			url:reapi()+"/showLink",
			success:function(data){
				console.log(data);
				$("#videLink").empty();
				$("#videLinkTemplate").tmpl({links:data.data}).appendTo("#videLink");
				pageing(data.record);
			},
			error:function(){
                showalert("加载视频列表失败");
			}
		})
	});
	

})



function delVideo(video) {
	console.log(video.value);
	$.ajax({
		type:'GET',
		data:{
			"vid":video.value
		},
		url:reapi()+"/delVideo",
		success:function(){
			//alert("删除成功！");
			var s=video;
			console.log(s.parentNode);
			var node1=s.parentNode;
			node1.parentNode.removeChild(node1);
			//window.location.reload(true);
			//showLink();
		},
		error:function(){
            showalert("删除失败，请联系管理员!");
		}
	})
}

function dowloadVideo(videoId) {
	console.log(videoId);
	$.ajax({
		type:'GET',
		data:{"id":videoId},
		url:reapi()+"/dowloadVideo",
		success:function(data){
			$("#myModalLabel").empty();
			$("#myModalLabel").append("<p>"+data[1]+"</p>");
			$("#links").empty();
            var links=encodeURI(data[0]);
			$("#links").append("<a href="+links+" download="+data[1]+">下载</a>");
		},
		error:function(){
            showalert("下载失败");
		}
	})
}
