//webpack.config.js 导出一个node模块，供webpack去调用，导出是一个对象，该对象设置webpack运行过程中的一些配置参数

const path = require('paht'); 
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')//npm i -D uglifyjs-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');//npm i -D extract-text-webpack-plugin 提取分离成独立的css文件

module.exports = {
	
	//应用的入口文件，webpack会分析这个入口文件中导入的其他文件，并进行处理，最后进行打包
	//entry:'./src/index.js',
	//entry:[
		//'./src/index.js',//
		//'./node_modules/webpack-dev-server/client/index.js?http://localhost:8080/'//webpack2 实现热加载的方式 通过websocket通讯实现。
		//]
	
	entry:{
		rawLoader:'./src/rawLoader.js',//处理文本文件  import content from './raw.txt';
		jsonLoader:'./src/jsonLoader.js',//处理json文件  import data from './data.json';
		fileLoader:'./src/fileLoader.js',//处理图片文件  import img from './img.png ';
		babelLoader:'./src/babelLoader.js',//ES6转成ES5
		cssLoader:'./src/cssLoader.js',//
		vueIndexLoader:'./src/vue.index.js',//
		jqueryLoader:'./src/jqueryLoader.js',//
		commonLoader1:'./src/commonLoader1.js',//
		commonLoader2:'./src/commonLoader2.js',//
		
		
	},
	
	//设置打包后的文件输出设置
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'[name].js'
	},
	
	module:{
		rules:[
			{
				//当加载的是该类型的文件
				test:'/\.txt$/',
				//使用什么loader去处理该文件
				use:'raw-loader'//npm i -D raw-loader
			},
			{
				
				test:'/\.json$/',//
				use:{
					loader:'json-loader'//已内置
				}
			},
			{
				
				test:'/\.(png|jpg|gif)$/',//
				use:{
					loader:'file-loader',//
					options:{
						name:'[hash].[ext]'
					}
				}
			},
			{
				
				test:'/\.js$/',//
				use:{
					loader:'babel-loader',//
					options:{
						presets:'[env]'
					}
				}
			},
			{
				
				test:'/\.css$/',//
				//use:loader:['style-loader','css-loader'],// npm i -D css-loader style-loader  使用顺序是倒序的
				use:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'})
			},
			{
				
				test:'/\.vue$/',//
				use:{
					loader:['vue-loader'']// npm i -D vue-loader vue-template-compiler
					
				}
			}
		]
	},
	plugins:[
		new UglifyJSPlugin(),
		new ExtractTextPlugin('style.css'),
		new webpack.ProvidePlugin({//自动加载模块，而不必到处import或require
			$:'jquery',
			jQuery:'jquery'
		}),
		new webpack.optimize.CommonChunkPlugin({//提取chunks直接共享的通用模块
			name:'vendor'
		})
	]
};