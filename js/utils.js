/***
 * 分页js
 */
var _callback;
var _param;
var pageNo=1;
var pageSize=20;
function fenye(ele,data,callback) {
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: ele
            ,count: data.record
            ,limits:[10, 20, 30, 40, 50,100]
            ,layout: ['count','prev', 'page', 'next', 'limit', 'skip']
            ,jump: function(obj,first){
                if(!first){
                    _callback = callback;
                    _param=obj;
                    doIt();
                }
            }
        });
    });
}

function doIt(){
    _callback(_param);
}

/***
 * alert提示
 * @param msg
 */
function showalert(msg) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.open({
            title: '提示信息'
            ,content: msg
        });
    })
}

function reapi(){
	var test="http://127.0.0.1:8080/ssm";
	var zhengshi="http://192.168.137.1:8080/ssm";
	return test
}


