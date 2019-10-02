up1.style.transform='scale(2.5)';
var nummm=0;

setTimeout(function(){
	up1.style.transition='0.8s';
	up1.style.transform='scale(1)';
	setTimeout(function(){
		up1.style.transition='';
	},900)
},100)

down1.onmousedown=function(){
	down1.style.transform='scale(0.9)';
	return false;
}
down1.onmouseup=function(){
	down1.style.transform='scale(1)';
	 window.location.hash='move-1';

	victory_h.style.display='none';
	move_role.style.display='block';
	onoffattack=true;
	LV=ownSide.pkq.LV;
	onoffon11=false;
}

var span=document.getElementsByTagName('span')[0];
var a1=parseInt(20*Math.random());
var b1=parseInt(20*Math.random());
var c1=a1*b1;
span.innerText=c1;	
console.log(c1);
