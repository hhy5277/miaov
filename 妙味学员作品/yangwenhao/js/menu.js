$(document).ready(function() {
	
	var timer = setTimeout(function() {
	
	var cf = null;
	var cb = null;
	var db = null;

	//获取桌面背景
	var str0 = $('#desk').css('background-image');

	db = str0.slice(str0.indexOf('bg'), str0.length - 2);

	db = db.slice(5, db.indexOf('.png'));

	//获取当前卡牌反面
	var str1 = $('#0').css('background-image');

	cb = str1.slice(str1.indexOf('cb'), str1.length - 2);

	cb = cb.slice(5, cb.indexOf('.png'))

	//存储对象
	var C_F_span = [];
	var C_B_span = $('.card_back span');
	var D_B_span = $('.desk_back span');
	for(var i = 0; i < 2; i++) {
		C_F_span.push($($('.card_front span')[i]));
	}

	//获取当前卡牌正面
	

		var str2 = $('#24').css('background-image');

		cf = str2.slice(str2.indexOf('cf'), str2.length - 2);

		cf = cf.slice(2, cf.indexOf('/'))

		$('#per1').css('background-image', ' url(img/cf' + cf + '/c1.png)');
		$('#per2').css('background-image', ' url(img/cf' + cf + '/h1.png)');
		$('#per3').css('background-image', ' url(img/cb/cb' + cb + '.png)');
		$('.perview').css('background-image', 'url(img/bg/bg' + db + '.png)');
		C_F_span[0].css('background-image', ' url(img/cf' + cf + '/c1.png)');
		C_F_span[1].css('background-image', ' url(img/cf' + cf + '/h1.png)');
		C_B_span.css('background-image', ' url(img/cb/cb' + cb + '.png)');
		D_B_span.css('background-image', ' url(img/bg/bg' + db + '.png)');
		clearTimeout(timer)
	

	$('.card_front .change_l').on('click', function() {
		if(cf > 1 && cf) {
			cf = parseInt(cf) - 1;
		} else {
			cf = 10;
		}
		C_F_span[0].css('background-image', ' url(img/cf' + cf + '/c1.png)');
		C_F_span[1].css('background-image', ' url(img/cf' + cf + '/h1.png)');
		$('#per1').css('background-image', ' url(img/cf' + cf + '/c1.png)');
		$('#per2').css('background-image', ' url(img/cf' + cf + '/h1.png)');
	});

	$('.card_front .change_r').on('click', function() {
		if(cf < 10 && cf) {
			cf = parseInt(cf) + 1;
		} else {
			cf = 1;
		}
		C_F_span[0].css('background-image', ' url(img/cf' + cf + '/c1.png)');
		C_F_span[1].css('background-image', ' url(img/cf' + cf + '/h1.png)');
		$('#per1').css('background-image', ' url(img/cf' + cf + '/c1.png)');
		$('#per2').css('background-image', ' url(img/cf' + cf + '/h1.png)');
	});

	$('.card_back .change_l').on('click', function() {
		if(cb > 1 && cb) {
			cb = parseInt(cb) - 1;
		} else {
			cb = 4;
		}
		C_B_span.css('background-image', ' url(img/cb/cb' + cb + '.png)');
		$('#per3').css('background-image', ' url(img/cb/cb' + cb + '.png)');
	});

	$('.card_back .change_r').on('click', function() {
		if(cb < 4 && cb) {
			cb = parseInt(cb) + 1;
		} else {
			cb = 1;
		}
		C_B_span.css('background-image', ' url(img/cb/cb' + cb + '.png)');
		$('#per3').css('background-image', ' url(img/cb/cb' + cb + '.png)');
	});

	$('.desk_back .change_l').on('click', function() {
		if(db > 1 && db) {
			db = parseInt(db) - 1;
		} else {
			db = 4;
		}
		D_B_span.css('background-image', ' url(img/bg/bg' + db + '.png)');
		$('.perview').css('background-image', 'url(img/bg/bg' + db + '.png)');
	});

	$('.desk_back .change_r').on('click', function() {
		if(db < 4 && db) {
			db = parseInt(db) + 1;
		} else {
			db = 1;
		}
		D_B_span.css('background-image', ' url(img/bg/bg' + db + '.png)');
		$('.perview').css('background-image', 'url(img/bg/bg' + db + '.png)');
	});

	$('#cancel').on('click', function() {
		$('#mask').css('display', 'none');
	});

	var aInfo_li = [];
	for(var i = 0; i < 7; i++) {
		aInfo_li.push($($('#info_list li')[i]))
	}

	for(var i = 0; i < 7; i++) {
		var d = i;
		aInfo_li[i].on('mouseenter', function(d) {

			$(this).siblings().css('opacity', '0.3');
			$('#show_info_pic').css('background', ' url(img/info/' + $(this).index() + '.png) no-repeat')
			$(this).mouseleave(function() {
				$(this).siblings().css('opacity', '1');
			})
		})
	}
	
	
	$('#close').click(function(){ 
		$('#mask').css('display', 'none');
		$('#info').css('display', 'none');
	})
	
	
	}, 3000);
})