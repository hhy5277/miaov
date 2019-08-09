const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');

//koa实现主文件
class Kkb {
	constructor(){
		this.middlewares = [];
	}
	listen(...args){
		http.createServer(async (req,res)=>{
			//this.callback(req,res);
			
			//创建上下文对象
			const ctx = this.createContext(req,res);
			//this.callback(ctx);
			//将middlewares变成一个函数
			const fn = this.compose(this.middlewares);
			await fn(ctx);
			//给用户返回数据
			res.end(ctx.body);
		}).listen(...args);
	}
	//use(callback){
	//	this.callback = callback;
	//}
	use(mid){
		this.middlewares.push(mid);
	}
	createContext(req,res){
		const ctx = Object.create(context);
		ctx.request = Object.create(request);
		ctx.response = Object.create(response);
		
		ctx.req = ctx.request.req = req;
		ctx.res = ctx.response.res = res;
		
		return ctx;
	}
	
	compose(middlewares){
	 return function(ctx){
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
}

module.exports = Kkb;