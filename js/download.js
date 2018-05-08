


    function  getPath(){
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0,index+1);
        return result;
    }

    showDisk();
    function showDisk() {
        $.ajax({
            type:'GET',
            dataType: "json",
            url:reapi()+"/Disks",
            success:function(data){
                console.log(data);
                $("#disk").empty();
                $("#disksTemplate").tmpl({_disks:data}).appendTo("#disk");
            },
            error:function(){
                alert("加载磁盘列表失败");
            }
        })    }


        $("#download").click(function () {
        	var data=$("#fm").serialize();
        	$.ajax({
	            type:'post',
	            data:data,
	            url:reapi()+"/download/dw",
	            success:function(data){
	                console.log(data);
	                window.location.href="index.html";
	            },
	            error:function(){
	                alert("加载磁盘列表失败");
	            }
        	}) 
        })
