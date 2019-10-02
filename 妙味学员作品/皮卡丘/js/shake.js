var kGuan = true;
function bong(){
	if(!kGuan)return;
	kGuan = false;
	shake({
		obj:box,
		attr:'top',
		n:20,
		callback:function(){
			kGuan=true;
		}
	});	
}
