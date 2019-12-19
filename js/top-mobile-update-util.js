(function($, owner) {
	owner._downloadUpdateFile = function(downloadUrl){
		//var serverPath = window.constants.getServerPath(); 
	    var wait = plus.nativeUI.showWaiting("下载更新文件...");
	    console.log("download-path:"+downloadUrl);
	    var task = plus.downloader.createDownload(downloadUrl, {filename:"_doc/update/",retry: 1}, function(d,status){
	        if ( status == 200 ) { 
	            console.log("下载更新文件成功："+d.filename);
	            owner.installUpdateFile(d.filename); // 安装wgt包
	        } else {
	            console.log("下载更新文件失败！"+status);
	            plus.nativeUI.alert("下载更新文件失败！"+status);
	        }
	        wait.close();
	    });
	    task.addEventListener("statechanged", function (download, status) {
	        switch (download.state) {
	            case 2:
	                wait.setTitle("已连接到服务器");
	                break;
	            case 3: 
	                var percent = download.downloadedSize / download.totalSize * 100;
	                wait.setTitle("已下载 " + parseInt(percent) + "%");
	                break;
	            case 4:
	                wait.setTitle("下载完成");
	                break;
	        }
	    });
	    task.start();
	}
	
	// 下载wgt文件
	//var wgtUrl="http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
	owner.downloadUpdateFile = function(downloadUrl){
		//判断网络状态
		var types = {};
	    types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
	    types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
	    types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
	    types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
	    types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
	    types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
	    types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
	    //当前非wifi环境
	    var updateFlag = true;
    	if(plus.networkinfo.CONNECTION_WIFI!=plus.networkinfo.getCurrentType()){
			mui.confirm('当前非WIFI环境，更新可能产生流量，确定更新？', '更新提示', function(e) {
				if (e.index == 1) {
					owner._downloadUpdateFile(downloadUrl);
				}else{
					// 关闭除登录页面外所有页面
					// var wvs = plus.webview.all();
					// for (var i = 0; i < wvs.length; i++) {
					// 	wvs[i].close("none");
					// }
				}
			});
    	}else{
    		owner._downloadUpdateFile(downloadUrl);
    	}
	}
	
	//main页面自动更新方法	
	owner.downloadUpdateFileOnMain = function(downloadUrl){
		//判断网络状态
		var types = {};
	    types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
	    types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
	    types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
	    types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
	    types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
	    types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
	    types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
	    //当前非wifi环境
    	if(plus.networkinfo.CONNECTION_WIFI!=plus.networkinfo.getCurrentType()){
			mui.confirm('当前非WIFI环境，更新可能产生流量，确定更新？', '更新提示', function(e) {
				if (e.index == 1) {
					owner._downloadUpdateFile(downloadUrl);
				}else{
					//直接登出
					var wvs = plus.webview.all();
					var fristWv = plus.webview.getLaunchWebview();
					for (var i = 0; i < wvs.length; i++) {
						if (wvs[i].getURL() == fristWv.getURL()) {
//							continue;
						}
						wvs[i].close("none");
					}
				}
			});
    	}else{
    		owner._downloadUpdateFile(downloadUrl);
    	}
	}
		
	// 更新应用资源
	owner.installUpdateFile = function(path){
	    var wait = plus.nativeUI.showWaiting("正在更新应用...");
	    plus.runtime.install(path,{},function(){
	        wait.close();
	        console.log("更新完成，须重启应用！");
	        plus.nativeUI.alert("更新完成，须重启应用！",function(){
	            plus.runtime.restart();
	        });
	    },function(e){
	        wait.close();
	        console.log("应用更新失败！["+e.code+"]："+e.message);
	        plus.nativeUI.alert("应用更新失败！["+e.code+"]："+e.message);
	    });
	}

}(mui,window.topUpdateUtil = {}));