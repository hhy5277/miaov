//bag();
var nnn = 1;

function bag(){
let goodUl = document.querySelectorAll('.goodUl')[0];
goodUl.innerHTML = '';
//console.log(call[0].commodity);
for(let i = 0;i<call[0].commodity.length;i++){
	if(call[0].commodity[i].n!=0){
		hah(call[0].commodity[i]);
	}
}
for(let i = 0;i<call[0].consumables.length;i++){
	if(call[0].consumables[i].n!=0){
		hah(call[0].consumables[i]);
	}
}
for(let i = 0;i<call[1].giftBag.length;i++){
	if(call[1].giftBag[i].n!=0){
		hah(call[1].giftBag[i]);
	}
}
for(let i = 0;i<call[2].jewel.length;i++){
	if(call[2].jewel[i].n!=0){
		hah(call[2].jewel[i]);
	}
}
for(let i = 0;i<call[3].gold.length;i++){
	if(call[3].gold[i].n!=0){
		hah(call[3].gold[i]);
	}
}
//hah(callCopy);

function hah(bagData){
let bagDatail = document.querySelectorAll('#bagDatail')[0];


//渲染数据
bagConRender(bagData);
function bagConRender(bagData){

	let goodUl = document.querySelectorAll('.goodUl')[0];

	

		goodUl.innerHTML += `
							<li class="goods">
								<i><img width="61" src="${bagData.img}"></i>
								<div class="zb">
									<span>${bagData.name}</span><br />
									<em>${bagData.text}</em>
								</div>
								<div class="take">使用</div>
								<p>数量:${bagData.n}</p>
							</li>
	
							`;

}











let bcrName = document.querySelectorAll('.bcr_name')[0];
let bclList = document.querySelectorAll('.bcl_list')[0];
let goodUl1 = document.querySelectorAll('.goodUl')[0];
let ss1 = Array.from(goodUl1.children);
//点击使用
//console.log(goodUl1)
shiyong(ss1);
function shiyong(hh){
//	console.log(hh);
	let takeBtns = document.getElementsByClassName('take');
//	console.log(takeBtns);
	for(let i = 0;i<takeBtns.length;i++){
		takeBtns[i].onmousedown = function(){
			
			this.style.transform = 'scale(0.9)';
		}
		takeBtns[i].onmouseup = function(){
			this.style.transform = 'scale(1)';
			let num = this.nextElementSibling.innerText.substring(3)*1-1;//已经减1了
			let hname = this.previousElementSibling.children[0].innerText;
			for(let i = 0;i<call[0].commodity.length;i++){
				if(call[0].commodity[i].name==hname){
					call[0].commodity[i].n = num;
				}
			}
			for(let i = 0;i<call[0].consumables.length;i++){
				if(call[0].consumables[i].name==hname){
					call[0].consumables[i].n = num;
				}
			}
			for(let i = 0;i<call[1].giftBag.length;i++){
				if(call[1].giftBag[i].name==hname){
					call[1].giftBag[i].n = num;
				}
			}
			for(let i = 0;i<call[2].jewel.length;i++){
				if(call[2].jewel[i].name==hname){
					call[2].jewel[i].n = num;
				}
			}
			for(let i = 0;i<call[3].gold.length;i++){
				if(call[3].gold[i].name==hname){
					call[3].gold[i].n = num;
				}
			}
			
			if(num==0){
				let del = ss1[i].children[1].children[0].innerText;
				for(let j = 0;j<ss1.length;j++){
					if(ss1[j].children[1].children[0].innerText==del){
						ss1.splice(j,1);
					}
				}
				for(let i = 0;i<call[0].commodity.length;i++){
					if(call[0].commodity[i].name==hname){
						call[0].commodity[i].n = num;
					}
				}
				for(let i = 0;i<call[0].consumables.length;i++){
					if(call[0].consumables[i].name==hname){
						call[0].consumables[i].n = num;
					}
				}
				for(let i = 0;i<call[1].giftBag.length;i++){
					if(call[1].giftBag[i].name==hname){
						call[1].giftBag[i].n = num;
					}
				}
				for(let i = 0;i<call[2].jewel.length;i++){
					if(call[2].jewel[i].name==hname){
						call[2].jewel[i].n = num;
					}
				}
				for(let i = 0;i<call[3].gold.length;i++){
					if(call[3].gold[i].name==hname){
						call[3].gold[i].n = num;
					}
				}
				this.parentNode.remove();
				shiyong(ss1);
//				
			}
			this.nextElementSibling.innerText = '数量:' + num;
			console.log(call);
		}
		
	}
}


dj();



//ul拖拽
let bcrContent = document.querySelectorAll('.bcr_content')[0];
let bagUl = bcrContent.getElementsByTagName('ul')[0];
bagUl.onmousedown = function(ev){
	let disY = ev.pageY - bagUl.offsetTop;
//	console.log(disY)
	document.onmousemove = function(ev){
		let lis = bagUl.getElementsByTagName('li');
		let misY = ev.pageY;
		let h = misY-disY;
//		console.log(bagUl.clientHeight)
		if(h>0 || bagUl.clientHeight<=404){
			bagUl.style.top = '0px';
		}else if(h<-(lis.length-4)*110){
//			console.log(1);
			setTimeout(fn(),900)
			function fn(){
				bagUl.style.transition = '.2s';
				bagUl.style.top = -(lis.length-4)*110+'px';
			}
		}
		else{
			bagUl.style.top = misY-disY+'px';
		}
	}
	document.onmouseup = function(){
		document.onmousemove = document.onmouseup = null;
	}
	return false;
}
	



return call;

}
}

function dj(){
	//点击×的时候
	let bagClose = document.querySelectorAll('.bag-close')[0];
	
	bagClose.onclick = function(){
		bagmodel.classList.add('allHidden');
		mapIndexQyk.style.display = 'block';
		mainMenuBgd.classList.remove('allHidden');
	
	}
}


