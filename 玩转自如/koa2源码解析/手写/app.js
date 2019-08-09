/*const http = require('http');

http.createServer((req,res)=>{
	res.writeHead(200);
	res.end('hi kaikeba');
	
}).listen(3000);*/

/*
const Koa = require('koa');
var app = new Koa();
const {CreateReadStream} = require('fs');

// 模块化/简化
// 优雅API 洋葱机制

//app.use(ctx =>{
//	ctx.body = 'hi kaikeba';
//})


app.use(async (ctx,next) =>{
	if(ctx.path === '/favicon.ico'){
		ctx.body = CreateReadStream('./favicon.ico');
	}else{
		await next();
	}	
})

app.listen(3000);*/

//我们的kkb使用
const Kkb = require('./kkb');

const app = new Kkb();

function delay(){	
	return new Promise((reslove,reject) => {
		setTimeout(() => {
			resolve();
		},1000);
	})
}

//app.use((req,res)=>{
app.use(async(ctx,next)=>{
	//res.writeHead(200) //res.statusCode = 200;	
	//res.end('hi')
	
	/*res.writeHead(200,{
		"Content-Type":"application/json"		
	});
	res.end(JSON.stringify({name:"Jerry"}));*/
	
	//ctx.body = 'hello'
	
	ctx.body = '1'
	setTimeout(()=>{
		ctx.body += '2'
	},2000)
	await next();
	ctx.body += '3';
})

app.use(async (ctx,next)=>{
	
	ctx.body = '4'
	await delay();
	await next();
	ctx.body += '5';
})

app.use(async (ctx,next)=>{	
	ctx.body = '6'
})


app.listen(3000);





