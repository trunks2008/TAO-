/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};

		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		loginInfo.rem = loginInfo.rem;
		loginInfo.auto = loginInfo.auto;
		
		var settings = constants.getSettings();
		var oldAccount = settings.account;

		if(loginInfo.account.length < 2) {
			return callback('账号最短为 2 个字符');
		} else {
			settings.account = loginInfo.account;
		}

		if(loginInfo.password.length < 2) {
			return callback('密码最短为 2 个字符');
		} else {
			settings.password = loginInfo.password;
		}
		
		settings.rem=loginInfo.rem;
		settings.auto=loginInfo.auto;
		
		constants.setSettings(settings);

		var params = {
			username: loginInfo.account,
			password: hex_md5(loginInfo.password)
//			password: loginInfo.password
		};

		postData(SERVER_HOST_FORMAL + MODULE_LOGIN, params,
			function(ret) {
				//console.log(ret);
				var retval = JSON.parse(ret);
				var pid = retval.id;

				//login success
				if(pid != 'NULL') {
					//consolg.log(pid);
					
					plus.nativeUI.toast('登录成功');

					//在跳转页面前保存登陆状态
					var state = constants.getState();
					state.pid = pid;
					state.account = retval.name;
					state.dept = retval.dept;
					state.card = retval.card;
					state.token = "token123456789";
					constants.setState(state);

					//打开主页面
					mui.openWindow({
						url: 'views/main.html',
						id: 'main.html',
						show: {
							autoShow: true, // 加载完毕显示页面
							aniShow: "slide-in-right",
							duration: '150'
						},
						waiting: {
							autoShow: false, //自动显示等待框，默认为true
							title: '正在加载...' //等待对话框上显示的提示内容
						}
					});
				}

				//login failed
				else {
					return callback('用户名或密码错误');
				}
			},
			null
		);
	};

	owner.createState = function(name, callback) {
		var state = constants.getState();
		state.account = name;
		state.token = "token123456789";
		constants.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if(regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

}(mui, window.app = {}));