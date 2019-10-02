$(document).ready(function() {
	var $aCard = [];
	var progress = 0;
	var isAva = null;
	var cancel = new Array;
	var cancel_step = -1;
	var oTimer = null;
	var blank_click_onoff = true;

	creat_aCard();

	progress = 1;

	//获取随机数组
	$aCard = random_order(); //##need changeback

	progress = 2;

	add_pos();
	//初始化
	start_point($aCard);

	progress = 3;

	//发牌
	deal_card($aCard);

	progress = 4;

	// holder翻牌
	card_draw('progress'); //调用函数

	progress = 5;

	//卡牌移动函数
	card_move();

	//监控数组
	console.log($aCard);

	//public function below

	//创建$aCard
	function creat_aCard() {
		for(var i = 0; i < 13; i++) { //##need changeback
			for(var j = 0; j < 4; j++) {
				var color = null;
				//决定花色
				if(j == 0) {
					color = 's'
				} else if(j == 1) {
					color = 'c'
				} else if(j == 2) {
					color = 'd'
				} else if(j == 3) {
					color = 'h'
				}

				var json = {
					'_belong': {
						'obj': null, //
						'id': null, //
						'index': 0 //
					},
					'_isShow': false, //
					'_cardInfo': {
						'color': color,
						'num': i + 1
					},
					'_linkObj': {
						'obj': null,
						'id': null
					},
					'_linkObjBg': ['', 'url(img/cb/cb1.png)', 'url(img/cf1/' + color + (i + 1) + '.png)']
				};

				$aCard.push(json);

			}
		}
	}

	//随机序列生成后添加位置数组
	function add_pos() {
		var h_holder = {
			'_belong': {
				'obj': $('#h_holder'),
				'id': 'h_holder',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'h',
				'num': 0
			},
			'_linkObj': {
				'obj': $('#h_holder'),
				'id': 'h_holder'
			}
		}
		var c_holder = {
			'_belong': {
				'obj': $('#c_holder'),
				'id': 'c_holder',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'c',
				'num': 0
			},
			'_linkObj': {
				'obj': $('#c_holder'),
				'id': 'c_holder'
			}
		}
		var d_holder = {
			'_belong': {
				'obj': $('#d_holder'),
				'id': 'd_holder',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'd',
				'num': 0
			},
			'_linkObj': {
				'obj': $('#d_holder'),
				'id': 'd_holder'
			}
		}
		var s_holder = {
			'_belong': {
				'obj': $('#s_holder'),
				'id': 's_holder',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 's',
				'num': 0
			},
			'_linkObj': {
				'obj': $('#s_holder'),
				'id': 's_holder'
			}
		}

		var d_0 = {
			'_belong': {
				'obj': $('#d_0'),
				'id': 'd_0',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_0'),
				'id': 'd_0'
			}
		}
		var d_1 = {
			'_belong': {
				'obj': $('#d_1'),
				'id': 'd_1',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_1'),
				'id': 'd_1'
			}
		}
		var d_2 = {
			'_belong': {
				'obj': $('#d_2'),
				'id': 'd_2',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_2'),
				'id': 'd_2'
			}
		}
		var d_3 = {
			'_belong': {
				'obj': $('#d_3'),
				'id': 'd_3',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_3'),
				'id': 'd_3'
			}
		}
		var d_4 = {
			'_belong': {
				'obj': $('#d_4'),
				'id': 'd_4',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_4'),
				'id': 'd_4'
			}
		}
		var d_5 = {
			'_belong': {
				'obj': $('#d_5'),
				'id': 'd_5',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_5'),
				'id': 'd_5'
			}
		}
		var d_6 = {
			'_belong': {
				'obj': $('#d_6'),
				'id': 'd_6',
				'index': -1
			},
			'_isShow': true,
			'_cardInfo': {
				'color': 'all',
				'num': 14
			},
			'_linkObj': {
				'obj': $('#d_6'),
				'id': 'd_6'
			}
		}

		$aCard.push(c_holder);
		$aCard.push(d_holder);
		$aCard.push(s_holder);
		$aCard.push(h_holder);
		$aCard.push(d_0);
		$aCard.push(d_1);
		$aCard.push(d_2);
		$aCard.push(d_3);
		$aCard.push(d_4);
		$aCard.push(d_5);
		$aCard.push(d_6);

	}

	//生成随机序列  
	function random_order() { //数组随机排列

		$aCard.sort(() => Math.random() - 0.5);
		return $aCard
	}

	//生成div 显示div背景  链接div与数组 显示div位置 
	function start_point(arr) {
		for(var i = 0; i < 52; i++) {
			var oDiv = $('<div></div>');
			oDiv.attr({
				'id': i,
				'class': 'card',
				'_iDrage': 'false'
			});
			oDiv.css('background-image', arr[i]._linkObjBg[1]);
			arr[i]._linkObj.obj = oDiv;
			arr[i]._linkObj.id = i;
			arr[i]._belong.obj = $('#sart');
			arr[i]._belong.id = 'sart';

			oDiv.css({
				'top': $('#sart').css('top'),
				'left': $('#sart').css('left'),
				'z-index': i
			});

			$('#desk').append(oDiv);
		}

	}

	//发牌 
	function deal_card(arr, mark) { //mark: restart=>菜单重玩触发
		var d = 0;
		var k = 51;
		for(var i = 0; i < 7; i++) { //下排卡位发牌 定义数组 卡牌位置
			for(var j = d; j < 7; j++) {
				arr[k]._belong = {
					'obj': $('#d_' + j),
					'id': 'd_' + j,
					'index': i
				}
				if(j == d) {
					arr[k]._isShow = true;
					arr[k]._linkObjBg[0] = arr[k]._linkObjBg[2];
				} else {
					arr[k]._linkObjBg[0] = arr[k]._linkObjBg[1];
				}
				k--;
			}
			d++;
		}

		for(var i = 0; i < 24; i++) { //上排卡位发牌 定义数组 卡牌位置
			arr[i]._belong = {
				'obj': $('#holder'),
				'id': 'holder',
				'index': 23 - i
			}
			arr[i]._linkObjBg[0] = arr[i]._linkObjBg[1];
		}

		var c = 51;
		oTimer = setInterval(function() { //发牌效果实现
			if(c == -1) { //空白单击撤销发牌效果:开关
				clearInterval(oTimer);
				return false;
			}

			var line_up = 0; //卡位卡牌排列效果
			if(arr[c]._belong.id == 'holder') {
				line_up = 0;
			} else {
				line_up = arr[c]._belong.index * 5;
			}
			if(c > 12) {
				arr[c]._linkObj.obj.animate({
					'left': arr[c]._belong.obj.css('left'),
					'top': parseInt(arr[c]._belong.obj.css('top')) + line_up
				}, 100, function() {
					var a = FnIdToCardArr($(this).attr('id'));
					$(this).css({
						'z-index': $aCard[a]._belong.index,
						'background-image': $aCard[a]._linkObjBg[0]
					});
				});
			} else {
				arr[c]._linkObj.obj.css({
					'z-index': 25,
				}).animate({
					'left': arr[c]._belong.obj.css('left'),
					'top': parseInt(arr[c]._belong.obj.css('top')) + line_up
				}, 100, function() {
					var a = FnIdToCardArr($(this).attr('id'));
					$(this).css({
						'z-index': $aCard[a]._belong.index,
						'background-image': $aCard[a]._linkObjBg[0]
					});

				});
			}
			c--;
		}, 100)

		if(mark != 'restart') { //如果重新游戏 不需要存储初始的$aCard;

			FnStore($aCard); //存储最初始的$acard
		}

	}

	// holder翻牌 
	function card_draw(mark) { //传入对象在$aCard中的序列
		var aHolder = []; //holder 卡牌序列集合
		var num = []
		aHolder = FnBelongToCardArr('holder');

		for(var i = 0; i < aHolder.length; i++) { //找到最上面的一张
			$aCard[aHolder[i]]._linkObj.obj.off('click');
			if($aCard[aHolder[i]]._belong.index == aHolder.length - 1) {
				num = aHolder[i];
			}
		}

		//console.log(num);

		if(aHolder.length == 0) { //holder中没有卡牌时调用 回牌函数
			$('#holder').on('click', function() {
				card_back();
			});
			return false; //阻止后续代码执行
		}

		$aCard[num]._linkObj.obj.attr('_iDrage', 'false');

		$aCard[num]._linkObj.obj.on('click', function() {

			var this_arr = $aCard[num];

			if(this_arr._belong.id == 'holder') {
				this_arr._belong = {
					'obj': $('#show'),
					'id': 'show'
				}

				console.log(this_arr._belong.id)
				console.log(mark);

				this_arr._belong.index = FnBelongToCardArr('show').length - 1;

				this_arr._linkObjBg[0] = this_arr._linkObjBg[2];
				this_arr._isShow = true;

				//			$(this).stop(false,true);

				$(this).css('z-index', 23).animate({
					'left': this_arr._belong.obj.css('left'),
					'top': this_arr._belong.obj.css('top')
				}, 100, 'linear', function() {
					var a = FnIdToCardArr($(this).attr('id'));
					$(this).css({
						'z-index': $aCard[a]._belong.index,
						'background-image': $aCard[a]._linkObjBg[0]
					});
				});

				$(this).attr('_iDrage', 'true'); //打开刚才翻出卡牌的拖拽开关

				FnStore($aCard); //翻一张牌  记录操作

			};

			card_draw('card_draw');
		});

	}

	//holder 回牌 
	function card_back() {

		var aShow = FnBelongToCardArr('show');

		if(aShow.length == 0) {
			return false;
		}

		for(var j = aShow.length - 1; j > -1; j--) {

			$aCard[aShow[j]]._linkObj.obj.attr('_iDrage', 'false'); //阻止拖拽事件

			$aCard[aShow[j]]._belong = {
				'obj': $('#holder'),
				'id': 'holder',
				'index': FnBelongToCardArr('holder').length
			}

			console.log($aCard[aShow[j]]._belong.id)

			$aCard[aShow[j]]._isShow = false;
			$aCard[aShow[j]]._linkObjBg[0] = $aCard[aShow[j]]._linkObjBg[1];

			$aCard[aShow[j]]._linkObj.obj.css('z-index', 23).animate({
				'left': $aCard[aShow[j]]._belong.obj.css('left'),
				'top': $aCard[aShow[j]]._belong.obj.css('top')
			}, 50, function() {

				var a = FnIdToCardArr($(this).attr('id'));
				$(this).css({
					'z-index': $aCard[a]._belong.index,
					'background-image': $aCard[a]._linkObjBg[0]
				});
			});
		}

		$(this).off('click'); //holder 的点击事件关闭

		FnStore($aCard); //回牌记录
		card_draw('card_back');

	}

	//卡牌移动 
	function card_move() {

		for(var i = 0; i < 52; i++) {
			$aCard[i]._linkObj.obj.on('mousedown', function(ev) {
				var this_arr = FnIdToCardArr($(this).attr('id')); //当前点击的卡牌序列
				var desk_x = $('#desk').offset().left;
				var desk_y = $('#desk').offset().top;
				var pos_x = ev.clientX - $(this).offset().left;
				var pos_y = ev.clientY - $(this).offset().top;
				var move = [];
				var that = $(this);

				console.log('card_move触发鼠标按下')

				if($aCard[this_arr]._belong.id == 'holder') {
					$(this).attr('_iDrage', 'false');
				} else {
					$(this).attr('_iDrage', 'true');

					move = FnGetMoveArr($(this)); //移动卡牌序列

					$(document).on('mousemove', function(ev1) {

						console.log('document鼠标移动')

						var max_x = parseInt($('#desk').offset().left) + parseInt($('#desk').css('width'));
						var max_y = parseInt($('#desk').offset().top) + parseInt($('#desk').css('height'));
						var min_x = parseInt($('#desk').offset().left);
						var min_y = parseInt($('#desk').offset().top);
						
						if(max_y - ev1.clientY < 10 || max_x - ev1.clientX < 10 || ev1.clientY - min_y < 10 || ev1.clientX - min_x < 10) {
							that.trigger('mouseup');
						} else {
							for(var j = 0; j < move.length; j++) {
								$aCard[move[j]]._linkObj.obj.css({
									'top': ev1.clientY - pos_y - desk_y + j * 25,
									'left': ev1.clientX - pos_x - desk_x,
									'z-index': $aCard[move[j]]._belong.index + 20
								});
							}
						}
					});

					$(this).on('mouseup', function(ev2) {

						$(document).off('mousemove');

						console.log('card_move触发鼠标弹起1')

						var pos = FnJudgePos(ev2.clientX, ev2.clientY); //返回相对应的卡位对象
						FnMouseUp(move, pos);

					});
				}
			})
		}
	}

	//判断移动到那一堆牌面上 
	function FnJudgePos(mous_x, mous_y) {
		var x = mous_x - $('#desk').offset().left;
		var y = mous_y - $('#desk').offset().top;
		if(y > 650) {
			isAva = false;
			return false;
		} else if(y > 190) {
			if(x > 30 && x < 130) {
				return $('#d_0');
			} else if(x > 164 && x < 264) {
				return $('#d_1');
			} else if(x > 298 && x < 398) {
				return $('#d_2');
			} else if(x > 432 && x < 532) {
				return $('#d_3');
			} else if(x > 566 && x < 666) {
				return $('#d_4');
			} else if(x > 700 && x < 800) {
				return $('#d_5');
			} else if(x > 834 && x < 960) {
				return $('#d_6');
			} else {
				isAva = false;
				return false;
			}
		} else if(y > 20) {
			if(x > 432 && x < 532) {
				return $('#c_holder');
			} else if(x > 566 && x < 666) {
				return $('#d_holder');
			} else if(x > 700 && x < 800) {
				return $('#s_holder');
			} else if(x > 834 && x < 960) {
				return $('#h_holder');
			} else {
				isAva = false;
				return false;
			}
		} else {
			isAva = false;
			return false;
		}

	}

	//移动到牌堆上后mousup 
	function FnMouseUp(arr, pos) { //arr 要移动的数组 多/单  pos 移动到的位置
		var arr_tar = []; //目标卡位上所有卡牌
		var tar_max = []; //卡位上卡牌index的最大值数组对象
		var move_min = arr[0]; //移动排列中数字最小的牌

		if(pos == false) { //鼠标移动到牌堆外
			isAva = false;
			console.log('pos不存在');

		} else if(pos != false) {
			console.log('pos存在');
			arr_tar = FnBelongToCardArr(pos.attr('id')); //获取目标卡位上所有卡牌

			for(var i = 0; i < arr_tar.length; i++) { //获取牌堆最顶端的牌  如果卡位为空 则 arr_tar.length=0 不会进入循环
				if(parseInt($aCard[arr_tar[i]]._belong.index) == arr_tar.length - 1) {
					tar_max = arr_tar[i];
				}
			}

			if(tar_max.length == 0 && pos.attr('id').length != 4) { //目标序列  排除ashow
				tar_max = FnIdToCardArr(pos.attr('id')); //获取卡位
			}
			console.log(move_min);

			if(arr.length > 1) { //多张移动
				if(parseInt(pos.css('top')) > 190) { //多张移动到下排
					console.log('多张移动到下排')
					isAva = Judge(tar_max, move_min);
				} else if(parseInt(pos.css('top')) > 40) { //多张移动到上排
					isAva = false;
					console.log('多张移动到上排')
				} else { //封死
					//console.log('封死') //##bug1 k开头的多张不能移动到空白位
					isAva = false
				}
			} else if(arr.length == 1) { //单张移动
				isAva = Judge(tar_max, move_min);
			} else { //封死
				isAva = false;
			}

		} else {
			isAva = false;
			console.log('其他情况3');
		}

		FnMoveCon(arr, pos);

	}
	//tar_max:目标位置最顶端的卡牌 move_min:移动卡牌最底端的卡牌 length:移动的卡牌数量 result:返回的结果  
	function Judge(tar_max, move_min, endFn) {

		var pos = $aCard[tar_max]._belong.obj;

		if(parseInt(pos.css('top')) > 190) {
			//console.log('移动到下排的卡位上');
			if($aCard[move_min]._cardInfo.num == parseInt($aCard[tar_max]._cardInfo.num) - 1) {
				//console.log('数字能够接上');
				if($aCard[move_min]._cardInfo.color == 'h' || $aCard[move_min]._cardInfo.color == 'd') {
					result = $aCard[tar_max]._cardInfo.color == 's' || $aCard[tar_max]._cardInfo.color == 'c' || $aCard[tar_max]._cardInfo.color == 'all';
					//console.log('花色能够接上1');
				} else if($aCard[move_min]._cardInfo.color == 's' || $aCard[move_min]._cardInfo.color == 'c') {
					result = $aCard[tar_max]._cardInfo.color == 'h' || $aCard[tar_max]._cardInfo.color == 'd' || $aCard[tar_max]._cardInfo.color == 'all';
					//console.log('花色能够接上2');
				} else {
					result = false
				}
			} else {
				//console.log('数字能不接上1');
				result = false;
			}
		} else if(parseInt(pos.css('top')) < 201) {
			////console.log('鼠标移动到上排的卡位');
			if($aCard[move_min]._cardInfo.color == $aCard[tar_max]._cardInfo.color && $aCard[move_min]._cardInfo.num == $aCard[tar_max]._cardInfo.num + 1) { //tar_max 可能为卡位
				result = true;
			} else {
				//console.log('数字颜色都接不上');
				result = false;
			}
		} else {
			result = false;
			//console.log('其他情况2');
		}

		endFn && endFn(tar_max, move_min, result); //传入 配对 和 结果   // 找不到了就不执行 dofind

		return result;
	}

	//卡牌移动控制 
	function FnMoveCon(arr, pos) {

		if(isAva) { //移动合法
			console.log('移动合法');
			//目标置所有卡牌序号序列

			for(var i = 0; i < arr.length; i++) { //移动成功 修改acard数组
				$aCard[arr[i]]._belong = {
					'obj': pos,
					'id': pos.attr('id'),
					'index': FnBelongToCardArr(pos.attr('id')).length
				}
				console.log($aCard[arr[i]]._belong.id);
			}

			if(pos.attr('id').length != 4) { //移动到上/下排卡堆  
				console.log('移动到上/下排卡堆');
				FnCardLineStyle(pos, 'movecon_true');
			}
		} else if(isAva == false && arr.length > 0) { //移动不合法

			console.log('移动不合法');

			FnCardLineStyle($aCard[arr[0]]._belong.obj, 'movecon_false');
		}

	}

	//数组在修改后  目标卡位卡牌的显示效果   
	function FnCardLineStyle(iNow, mark) { // inow目标卡位  iold原卡位

		var arr_inow = [];
		var line_up = 0;
		var up = 0;
		var down = 0;

		var comp = new Array(arr_inow.length);
		var count = 0;

		arr_inow = FnBelongToCardArr(iNow.attr('id'));

		for(var i = 0; i < arr_inow.length; i++) { //排序arr_inow 
			for(var j = 0; j < arr_inow.length; j++) {
				if($aCard[arr_inow[i]]._belong.index > $aCard[arr_inow[j]]._belong.index) { //有几index个小于的就排在第几个
					count++;
				} else {
					count = count;
				}
			}
			comp[count] = arr_inow[i];
			count = 0;
		}

		arr_inow = comp;

		//计算多余的top 值
		for(var i = 0; i < arr_inow.length; i++) {
			if($aCard[arr_inow[i]]._isShow == false) {
				down++;
			} else if($aCard[arr_inow[i]]._isShow == true) {
				up++;
			}
		}

		for(var i = 0; i < arr_inow.length; i++) {

			if(iNow.attr('id') == 'show' || iNow.attr('id').indexOf('holder') >= 0) { //上排卡位
				line_up = 0;
			} else if($aCard[arr_inow[i]]._isShow == false) { //下排卡位不显示的卡牌
				line_up = $aCard[arr_inow[i]]._belong.index * 5;
			} else if($aCard[arr_inow[i]]._isShow == true) { //下排卡位显示的卡牌
				line_up = down * 5 + (parseInt($aCard[arr_inow[i]]._belong.index) - down) * 25;
			}

			$aCard[arr_inow[i]]._linkObj.obj.css({
				'top': parseInt(iNow.css('top')) + line_up,
				'left': iNow.css('left'),
				'z-index': $aCard[arr_inow[i]]._belong.index,
				'background-image': $aCard[arr_inow[i]]._linkObjBg[0]
			});

		}
		if(mark == 'movecon_true') { //移动成功检查空位
			console.log('排序完成')
			FnCheckEmpty('card_line_style');
		}

	}

	//存储每次$aCard的改变   
	function FnStore(arr) { //arr = $aCard  
		var cancel_str = '';
		var store_arr = [];

		for(var i = 0; i < arr.length; i++) {
			cancel_str = JSON.stringify(arr[i]);
			store_arr[i] = JSON.parse(cancel_str);
		}

		for(var i = 0; i < store_arr.length; i++) { //恢复丢失的obj对象
			store_arr[i]._belong.obj = $('#' + store_arr[i]._belong.id);
			if(store_arr[i]._linkObj) {
				store_arr[i]._linkObj.obj = $('#' + store_arr[i]._linkObj.id);
			}
		}

		if(cancel.length < 21) { //数组中只支持存储10个值  只准撤销10次  且撤销后不能返回  //cancel[0]为本局初始值
			cancel.push(store_arr);
			cancel_step++;
		} else {
			cancel.push(store_arr);
			cancel.splice(1, 1); //删除 第二个  第一个留作重新开始游戏的引用
		}
		FnGameOver();
	}

	//获取拖动动的数组 
	function FnGetMoveArr(obj) {
		var arr = FnIdToCardArr(obj.attr('id'));
		var a = []; //存储要移动的卡牌序列

		if($aCard[arr]._belong.id == 'show' || $aCard[arr]._belong.id.indexOf('holder') > 0) { //上排卡位 选择单张
			a.push(FnIdToCardArr(obj.attr('id')));
		} else { //下排卡位 单/多张
			for(var i = 0; i < 52; i++) {
				if($aCard[i]._belong.id == $aCard[arr]._belong.id && $aCard[i]._isShow == true && $aCard[i]._belong.index >= $aCard[arr]._belong.index) { //
					a.push(i);
				}
			}
		}

		var d = new Array(a.length)
		var count = 0

		for(var i = 0; i < a.length; i++) { //根据_belong.index排序
			for(var j = 0; j < a.length; j++) {
				if($aCard[a[i]]._belong.index > $aCard[a[j]]._belong.index) {
					count++;
				}
			}
			d[count] = a[i];
			count = 0;
		}
		return d;
	}

	//通过belong 找数组
	function FnBelongToCardArr(str) {
		var a = [];
		for(var i = 0; i < 52; i++) {
			if($aCard[i]._belong.id == str) {
				a.push(i);
			}
		}
		return a;
	}

	//获取显示的卡牌 且 可以拖动的卡牌 show顶牌 d_x 所有显示的牌  
	function FnGetShow() {
		var show = [];
		//		$('*').stop(false,true);
		for(var i = 0; i < 52; i++) {
			if($aCard[i]._belong.id == 'show' && $aCard[i]._belong.index == FnBelongToCardArr('show').length - 1) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_0' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_1' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_2' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_3' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_4' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_5' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			} else if($aCard[i]._belong.id == 'd_6' && $aCard[i]._isShow == true) {
				show.push(i);
				$aCard[i]._linkObj.obj.attr('_iDrage', 'true');
			}
		}

		if(show.length == 0) {
			return false;
		} else {
			return show;
		}
	}

	//获取个卡位最上面的卡牌  以及空白可用卡位 x_holder+d_x
	function FnGetShowTop() {
		//		$('*').stop(false,true);
		var show_top = [];
		var all = []
		var aC_holder = FnBelongToCardArr('c_holder');
		var aD_holder = FnBelongToCardArr('d_holder');
		var aS_holder = FnBelongToCardArr('s_holder');
		var aH_holder = FnBelongToCardArr('h_holder');
		var aD_0 = FnBelongToCardArr('d_0');
		var aD_1 = FnBelongToCardArr('d_1');
		var aD_2 = FnBelongToCardArr('d_2');
		var aD_3 = FnBelongToCardArr('d_3');
		var aD_4 = FnBelongToCardArr('d_4');
		var aD_5 = FnBelongToCardArr('d_5');
		var aD_6 = FnBelongToCardArr('d_6');

		all = [aC_holder, aD_holder, aS_holder, aH_holder, aD_0, aD_1, aD_2, aD_3, aD_4, aD_5, aD_6];

		for(var i = 0; i < all.length; i++) {
			if(all[i].length == 0) { //卡位没牌就添加卡位

				switch(i) {
					case 0:
						show_top.push(52)
						break;
					case 1:
						show_top.push(53)
						break;
					case 2:
						show_top.push(54)
						break;
					case 3:
						show_top.push(55)
						break;
					case 4:
						show_top.push(56)
						break;
					case 5:
						show_top.push(57)
						break;
					case 6:
						show_top.push(58)
						break;
					case 7:
						show_top.push(59)
						break;
					case 8:
						show_top.push(60)
						break;
					case 9:
						show_top.push(61)
						break;
					case 10:
						show_top.push(52)
						break;
				};

			} else if(all[i].length > 0) { //获取顶部单张
				for(var j = 0; j < all[i].length; j++) {
					if($aCard[all[i][j]]._belong.index == all[i].length - 1) {
						show_top.push(all[i][j]);
					}
				}
			}
		}
		return show_top;
	}

	//禁止desk上的右键菜单 右键快捷  
	$('#desk').bind('contextmenu', function() {
		return false;
	})

	//空白处点击卡牌归位 
	$('#desk').on('mousedown', function(ev4) {
		var keycode = ev4.which;

		console.log('desk 鼠标按下')

		if(keycode == 1 && blank_click_onoff == true) {
			console.log('desk 鼠标左键快速发牌')
			clearInterval(oTimer);
			FnQucikDealCard('quick_deal'); //快速发牌 
			blank_click_onoff = false;
		} else if(keycode == 3) { //鼠标右键快捷移动

			console.log('desk 鼠标右键')

			var flag = false;
			var timer = setTimeout(function() {

				flag = true;

				console.log('desk 鼠标右键触发菜单')
				FnMenu(ev4.clientX, ev4.clientY);

			}, 500);

			$('#desk').on('mouseup', function(ev) {

				clearTimeout(timer);
				if(ev.which == 3 && flag == false) {

					console.log('desk 鼠标右键触快捷移动')
					$(this).off('mouseup');
					FnQuickMove(); //快捷移动第一步

				} else {
					return false;
				}

			})

		} else {
			return false;
		}
	});

	//快速发牌  
	function FnQucikDealCard(mark) {

		if(mark == 'quick_deal' && blank_click_onoff == false) {
			return false;
		}
		
		var quick = [$('#holder'), $('#show'), $('#c_holder'), $('#d_holder'), $('#s_holder'), $('#h_holder'), $('#d_0'), $('#d_1'), $('#d_2'), $('#d_3'), $('#d_4'), $('#d_5'), $('#d_6')];

		for(var i = 0; i < quick.length; i++) {
			FnCardLineStyle(quick[i], 'deal_card'); //deal_card FnStore不记录数组
		}

		$(this).off('click'); //关闭desk的空白点击事件

	}

	//按h=72提示可操作 按z=90撤销操作  
	$(document).on('keyup', function(ev3) {
		var keycode = ev3.which;

		if(keycode == 72 && progress >= 4) { //触发提示
			var pool = []; //获取当前可移动的卡牌
			var target = []; //移动到的卡牌 以及卡牌位
			var isHint = false; //是否发现配对
			var hint_store = [];
			var hint_list = [];
			var hint_timer = null;
			var hint_count = 0;

			clearTimeout(hint_timer);

			pool = FnGetShow(); //获取当前可移动的卡牌 show 顶牌 d_x 可见牌 
			target = FnGetShowTop(); //目标卡牌 以及卡牌位

			for(var i = 0; i < target.length; i++) { //查找所有配对
				for(var j = 0; j < pool.length; j++) {
					isHint = Judge(target[i], pool[j]);
					if(isHint == true) {
						hint_store = [];
						hint_store.push(pool[j]);
						hint_store.push(target[i]);
						hint_list.push(hint_store);
					}
				}
			}

			hint_list = FnHintFliter(hint_list);
			if(hint_list.length > 0) {
				hint_count++;
				isHint = true;
				if(hint_count > hint_list.length - 1) {
					hint_count = 0
				}

				FnDoHint(hint_list[hint_count][1], hint_list[hint_count][0])
			}

			if(isHint == false && (FnBelongToCardArr('show').length + FnBelongToCardArr('holder').length > 0)) {
				FnDoHint($('#holder'), false);
			} //找了一遍没有 就提示翻牌

			//gameover

		} else if(keycode == 90 && progress >= 4) { //触发撤销
			if(cancel.length == 1) {

				alert('没有更多的撤销步骤了,亲!!')
			} else if(cancel.length > 1) {

				if(cancel.length == 2) {
					$aCard = cancel[1];
				} else {
					$aCard = cancel[cancel_step - 1];
				}

				cancel.splice(cancel.length - 1, 1); //删除最后一个
				cancel_step--;

				FnQucikDealCard('cancel');
				card_draw('cancel');

			}
		} else {
			return false;
		}
	});

	// 提示优先级排序 
	function FnHintFliter(arr) {
		var order = [];
		for(var i = 0; i < arr.length; i++) {
			var tar_belong_id = $aCard[arr[i][1]]._belong.id;
			var poo_belong_id = $aCard[arr[i][0]]._belong.id

			if(tar_belong_id.length == 8 && poo_belong_id.length == 3) { //下排的顶牌上到holder中
				if($aCard[arr[i][0]]._belong.index == FnBelongToCardArr(poo_belong_id).length - 1) { //判断移动牌是顶牌
					order.push(arr[i]);
					//console.log('d_x->x_holder')
				}
			}

			if(tar_belong_id.length == 8 && poo_belong_id.length == 4) { //show中牌上到holder中
				order.push(arr[i]);
				//console.log('show->x_holder')
			}

			if(tar_belong_id.length == 3 && poo_belong_id.length == 3) { //牌堆牌互相
				var poo_deck = FnBelongToCardArr(poo_belong_id) //移动牌堆所有牌序列

				for(var j = 0; j < poo_deck.length; j++) { //找到移动牌的上一张
					if(poo_deck.length == 1) {
						order.push(arr[i]);
						//console.log('d_x->d_x 1')
					} else if($aCard[poo_deck[j]]._belong.index == $aCard[arr[i][0]]._belong.index - 1 && $aCard[poo_deck[j]]._isShow == false) {
						order.push(arr[i]);
						//console.log('d_x->d_x 2')
					}
				}
			}

			if(tar_belong_id.length == 3 && poo_belong_id.length == 4) { //show中牌上到下排卡位
				order.push(arr[i]);
				//console.log('show->d_x')

			}
		}

		return order;
	}

	//右键快捷 移动  
	function FnQuickMove() {

		var all = []
		var target = [];
		var pool = [];
		var isFind = null;

		isFind = false;

		pool = FnGetShow(); //获取当前可移动的卡牌 show 顶牌 d_x 可见牌  
		target = FnGetShowTop(); //x_holder+d_x顶牌 以及卡位       

		if(pool == false) { //如果没有找到目标或者可移动牌 阻止运行 (循环) target是不可能为0的

			FnStore($aCard);
			return false;
		}

		for(var i = 0; i < pool.length; i++) { //show+d_x的顶牌
			if($aCard[pool[i]]._belong.index != FnBelongToCardArr($aCard[pool[i]]._belong.id).length - 1) {
				pool.splice(i, 1);
				i--;
			}
		}

		for(var i = 0; i < target.length; i++) { //x_holder顶牌 卡位
			if($aCard[target[i]]._belong.id.indexOf('holder') < 0) { //所属卡位id不含holder 删除
				target.splice(i, 1);
				i--;
			}
		}

		for(var i = 0; i < target.length; i++) { //查找所有配对
			for(var j = 0; j < pool.length; j++) {
				if(Judge(target[i], pool[j]) == true) {
					isFind = true;
					FnDoFind(target[i], pool[j], isFind);
				}
			}
		}

		if(isFind == false) {
			FnCheckEmpty('quick_move'); //循环快捷移动 循环到找不到配对isfind=false时

			FnStore($aCard);
		}

	}

	//执行快捷操作  
	function FnDoFind(card_target_arr, card_pool) {

		var target = null;

		target = $aCard[card_target_arr]._belong.obj;

		if(target.attr('id').indexOf('holder') > 1) {
			$aCard[card_pool]._belong = { //修改数组
				'obj': target,
				'id': target.attr('id'),
				'index': $aCard[card_pool]._cardInfo.num - 1
			}
		}
		console.log($aCard[card_pool]._belong.id);

		//console.log('修改数组')
		$aCard[card_pool]._linkObj.obj.stop(true, true);
		$aCard[card_pool]._linkObj.obj.css({
			'z-index': 24
		}).animate({ //显示到位置
			'top': target.css('top'),
			'left': target.css('left'),
			'z-index': $aCard[card_pool]._belong.index
		}, 200);
		FnCheckEmpty(); //移动完了检查卡位

	}

	//下排是否有空白的卡位 
	function FnCheckEmpty(mark) {
		var aD_0 = FnBelongToCardArr('d_0');
		var aD_1 = FnBelongToCardArr('d_1');
		var aD_2 = FnBelongToCardArr('d_2');
		var aD_3 = FnBelongToCardArr('d_3');
		var aD_4 = FnBelongToCardArr('d_4');
		var aD_5 = FnBelongToCardArr('d_5');
		var aD_6 = FnBelongToCardArr('d_6');
		var check = [aD_0, aD_1, aD_2, aD_3, aD_4, aD_5, aD_6];
		var count = 0;

		for(var i = 0; i < check.length; i++) {
			for(var j = 0; j < check[i].length; j++) {
				if($aCard[check[i][j]]._isShow == false) {
					count++;
				}
			}
			if(count == check[i].length && count != 0) { //如果卡位中所有卡牌都不显示
				$aCard[check[i][0]]._isShow = true;
				$aCard[check[i][0]]._linkObjBg[0] = $aCard[check[i][0]]._linkObjBg[2]
				$aCard[check[i][0]]._linkObj.obj.css('background-image', $aCard[check[i][0]]._linkObjBg[0]);
				$aCard[check[i][0]]._linkObj.obj.attr('_iDrage', 'ture');
			}
			count = 0;
		}
		if(mark != 'quick_move' && mark != 'card_line_style') { //quick_move 循环终止 不触发循环  card_line_style 不触发循环
			FnQuickMove(); //  FnQuickMove(找数组)=> judge(判断)=>Dofind(移动)=>checkempty(清除空位+再循环)=>FnQuickMove(找数组)=> judge(判断)=> isFind==false 终止=> store(存储数组)
		}

	}
	//显示提示效果  

	function FnDoHint(card_target, card_pool) { //card_target 移入的目标位置  card_pool  移动的卡牌

		var hint_timer = null;
		var target = null;

		clearTimeout(hint_timer);

		if(typeof card_target == 'number') {
			target = $aCard[card_target]._linkObj.obj
		} else if(typeof card_target == 'object') {
			target = card_target;
		}

		target.css('box-shadow', '0px 0px 50px 15px #f96916');
		$aCard[card_pool] && $aCard[card_pool]._linkObj.obj.css('box-shadow', '0px 0px 50px 15px #f96916');

		hint_timer = setTimeout(function() {
			var s1 = null;
			var s2 = null;

			s1 = target.attr('style').replace('box-shadow: rgb(249, 105, 22) 0px 0px 50px 15px;', '');
			s2 = $aCard[card_pool] && $aCard[card_pool]._linkObj.obj.attr('style').replace('box-shadow: rgb(249, 105, 22) 0px 0px 50px 15px;', '');

			target.attr('style', s1);
			$aCard[card_pool] && $aCard[card_pool]._linkObj.obj.attr('style', s2);

		}, 1000)
	}

	//通过ID找到对应的arr

	function FnIdToCardArr(str) {
		for(var i = 0; i < $aCard.length; i++) {
			if($aCard[i]._linkObj.id == str) {
				return i;
			}
		}
	}

	//判断游戏是否结束 

	function FnGameOver() {
		if(FnBelongToCardArr('c_holder').length == 13 && FnBelongToCardArr('d_holder').length == 13 && FnBelongToCardArr('s_holder').length == 13 && FnBelongToCardArr('h_holder').length == 13) {

			FnGameOverMoive();

		}
	}

	//游戏结束动画 
	function FnGameOverMoive(boolen) { // boolen=>true:重玩触发

		progress = 0;
		isAva = null;
		hint_count = 0;
		cancel = new Array;
		cancel_step = -1;

		if(!boolen) {

			$('*').off('click');
			$('*').off('mousemove');
			$('*').off('mouseup');
			$('*').off('keyup');

			for(var i = 0; i < 52; i++) {

				$aCard[i]._linkObj.obj.css({
					'transform': 'rotate(' + Math.random() * 180 * Math.PI + 'deg)'
				});
				//				$aCard[i]._linkObj.obj.stop(false,true);

				$aCard[i]._linkObj.obj.animate({
					'top': parseInt(Math.random() * 500),
					'left': parseInt(Math.random() * 900),
				}, 2000);
			}
		}

		for(var i = 0; i < 52; i++) {
			$aCard[i]._linkObj.obj.off('mousedown')
		}
		$aCard = [];

	}

	//菜单
	function FnMenu(x, y) {

		$('.c_warp').stop();
		$('.c_warp').css({
			'top': y - parseInt($('#desk').offset().top) - 113,
			'left': x - parseInt($('#desk').offset().left) - 113,
			'display': 'block',
		}).animate({
			'opacity': '1'
		}, 1000);

		$('.c_warp').on('mouseleave', function() {
			console.log('c_warp  mouseleave');

			$(this).stop();
			$('.c_warp').animate({
				'opacity': '0'
			}, 1500, function() {
				$(this).css({
					'display': 'none'
				});
			})
		});

		$('.c_warp').on('mouseover', function() {
			console.log('c_warp  mouseover')
			$(this).stop();
			$('.c_warp').css({
				'display': 'block',
				'opacity': '1'
			});
		})

		$('.c1').on('click', function() {
			console.log('c1  click')
			$('.c_warp').off('mouseover');
			$('.c_warp').trigger('mouseleave');
		});

		$('.s1').on('click', function(ev) { //重玩本局
			console.log('触发鼠标弹起3')

			cancel_step = 0;
			$aCard = cancel[0];
			cancel = [cancel[0]]; //不可以cancel = [$aCard] 参数引用问题

			for(var i = 0; i < 52; i++) {
				$('#' + i).remove();
			}

			console.log($aCard);

			start_point($aCard);

			deal_card($aCard, 'restart');

			progress = 4;

			card_draw('restart');

			progress = 5;

			card_move();
		});

		$('.s2').on('click', function() { //设置
			$('#mask').css({
				'display': 'block',
				'opacity': '0'
			});
			$('#set').css('display', 'block');
			$('#info').css('display', 'none');
			$('#mask').animate({
				'opacity': '1'
			}, 500);

		});

		$('.s3').on('click', function() { //开始新游戏
			window.location.reload();
		});

		$('.s4').on('click', function() { //说明
			$('#mask').css({
				'display': 'block',
				'opacity': '0'
			});
			$('#set').css('display', 'none');
			$('#info').css('display', 'block');
			$('#mask').animate({
				'opacity': '1'
			}, 500);
		});

	};

	//显示效果
	$('#confirm').on('mousedown', function() {
		var cf = '';
		var cb = '';
		var db = '';
		var str_cf = $('#per1').css('background-image');
		var str_cb = $('#per3').css('background-image');
		var str_db = $('.perview').css('background-image');

		str_cf = str_cf.slice(str_cf.indexOf('/img/') + 7, str_cf.indexOf('.png'));
		cf = str_cf.slice(0, str_cf.indexOf('/'));

		cb = str_cb.slice(str_cb.indexOf('/img/') + 10, str_cb.indexOf('.png'));

		db = str_db.slice(str_db.indexOf('/img/') + 10, str_db.indexOf('.png'));

		for(var i = 0; i < 52; i++) { //修改acard 背景值
			$aCard[i]._linkObjBg[1] = 'url(img/cb/cb' + cb + '.png)';
			$aCard[i]._linkObjBg[2] = 'url(img/cf' + cf + '/' + $aCard[i]._cardInfo.color + $aCard[i]._cardInfo.num + '.png)';
			if($aCard[i]._isShow == true) {
				$aCard[i]._linkObjBg[0] = $aCard[i]._linkObjBg[2];
			} else {
				$aCard[i]._linkObjBg[0] = $aCard[i]._linkObjBg[1];
			}
		}
		console.log($aCard[1])

		for(var i = 0; i < cancel.length; i++) { //修改cancel
			for(var j = 0; j < 52; j++) {
				cancel[i][j]._linkObjBg[1] = 'url(img/cb/cb' + cb + '.png)';
				cancel[i][j]._linkObjBg[2] = 'url(img/cf' + cf + '/' + cancel[i][j]._cardInfo.color + cancel[i][j]._cardInfo.num + '.png)';
				if(cancel[i][j]._isShow == true) {
					cancel[i][j]._linkObjBg[0] = cancel[i][j]._linkObjBg[2];
				} else {
					cancel[i][j]._linkObjBg[0] = cancel[i][j]._linkObjBg[1];
				}
			}
		}
		console.log(cancel[0][51])

		$('#desk').css('background-image', 'url(img/bg/bg' + db + '.png)');

		for(var i = 0; i < 52; i++) {
			$('#' + i).css('background-image', $aCard[i]._linkObjBg[0]);
		}
		$('#mask').css('display', 'none');

	});

	//end of jq

})