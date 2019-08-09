 function add(x,y){
	 return x + y;
 }
 
  function square(z){
	 return z * z;
 }
 
 function double(x){
	 return x * 2
 }
 
 // 复合函数 高阶函数
 /*function compose(fn1,fn2){
	 return (..args) = fn1(fn2(...args));
 }
 
 function compose(mids){
	 return mids.reduce((leftFn,rightFn)=>(...args)=>
		rightFn(leftFn(...args))
	 );
 }*/
 
 function compose(middlewares){
	 return function(){
		 return dispatch(0);
		 //执行第0个
		 function dispatch(i){
			 let fn = middlewares[i];
			 if(!fn) {
				 return Promise.resolve();
			 }
			 
			 return Promise.resolve(
				fn(ctx,function next(){
					//promise完成后，再执行下一个
					return dispatch(i+1);
				})
			 )
		 }
		 
	 }
 }
 
async function fn1(next){
	await next();
}
 
async function fn2(next){
	await delay();
	await next();
}
 
async function fn3(next){
	await delay();
	await next();
}

function delay(){	
	return new Promise((reslove,reject) => {
		setTimeout(() => {
			resolve();
		},2000);
	})
}
 
 //const ret = square(add(1,2))
 
 //const middwares = [add, square, double]