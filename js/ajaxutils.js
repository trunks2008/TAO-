function postData(url, data, callback, waitingDialog) {	
	console.log(url);
	console.log(data);
	
	mui.ajax(url, {
		data: 'data=' + JSON.stringify(data),
		type: 'post',
		timeout: 10000,

		dataType: 'jsonp',
		crossDomain: true,

		headers: {
			"Access-Control-Allow-Headers": "X-Requested-With"
		},

		contentType: "application/x-www-form-urlencoded; charset=utf-8",

		success: callback,
		error: function(xhr, type, errorThrown) {
			mui.alert("网络连接失败，请重新尝试一下", "错误", "OK", null);
			console.log('错误详情---' + JSON.stringify(xhr));
			console.log('状态码---' + xhr.status);
			console.log(type);
			console.log(errorThrown);
		}
	});
}