Date.prototype.Format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function TimeDiff(start,end){
	
	var tmp='1990-01-01 ';
	var nStart=tmp+start+':00';
	var nEnd=tmp+end+':00';
	
	var stime=new Date(nStart);
	var etime=new Date(nEnd);
	
	var minus=Math.abs(stime.getTime()-etime.getTime());
	var ret=minus/3600000;
	ret=ret.toFixed(1);
	
	if((start=='') || (end='')){
		return 0;
	}
	
	return ret;
}
