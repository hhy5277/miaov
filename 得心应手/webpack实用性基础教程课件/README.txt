设置entry
设置output
设置plugin：HtmlWebpackPlugin//生成html文件
设置module：在rules里面添加解析jsx 的 babel-loader, 并把options中的presets设置为'react'

设置devServer:{
	open:true,//启动时，自动在浏览器打开
	port:9000//自定义启动的端口
}
启动webpack-dev-server时，会自动先打包，再启动。使用webpack-dev-server 打包后的文件保存在内存 还支持热更新，如果想让打包后的文件保存到磁盘，需要运行相应的打包命令
（package.json的script配置的命令）

			再添加一个解析css的css-loader,和一个把css插入html的style-loader，顺序分别是从右自左（从后往前）
			rules里面的添加的对象对应的test，用于匹配处理的文件（atom编辑器会自动图形化显示正则表达式）
								 对应的use属性，可以是对象（添加自定义配置时），也可以是字符串（默认配置）
            再添加一个用于加载图片文件的file-loader，copy图片文件到目标路径，并将路径重命名
			（处理1.css样式里面的图片url，background:url('path/img.jpg'); 2.import导入图片; 3.require 引入的图片）
			再添加url-loader加载图片，会以base64编码图片，减少请求次数，适合用于小图片，图片太大，得不偿失
			在url-loader的options配置项里面添加limit属性，约束处理的图片大小，小于limit的使用url-loader，大于limit的使用file-loader。
			拷贝字体文件到代码路径下，在css文件中通过@font-face引入字体文件，使用引入的字体文件定义字体样式或字体图标，配置file-loader加载字体文件。
			安装第三方字体库 npm i -S font-awesome，import 引入 font-awesome.css，依然是通过file-loader匹配加载字体文件。
			修改css-loader配置为对象形式，在options里面增加用于css模块化的属性module:true，修改import css文件的方式，增加一个变量来接收导入的模块对象，使用的时候方式修改为 模块变量名.选择器（样式名，最后一级选择器）。不同的样式文件可以导出为不同的变量。
			在与use平级的css-loader规则配置的地方添加一个exclude配置，用于排除不想应用到此loader的（这里是module模块化）规则的css样式。配置的值是一个路径的数组。
			将上面的css-loader配置拷贝一份，并将exclude修改成include，用于配置包含那些不使用模块化的路径下的css样式。
			在模块化配置的css-loader的配置中增加localIdentName:'[path]-[name]-[local]_[hash:base64:6]'  
			[path]-[name]-[local]-[hash:base64:6] 分别代表 路径（src）-模块名-类名-6位hash值
			添加scss样式文件，npm i -D sass-loader node-sass，增加处理scss的loader配置 ['style-loader','css-loader','sass-loader']
			如果想要scss文件模块化，需要将上面的css-loader配置修改成如下：
			{
				'loader':'css-loader',
				options:{
					module:true,
					localIdentName:'[name]-[local]_[hash:base64:6]'
				}
			}
			然后，使用的时候也要相应的修改成import到一个变量中，再使用差值表达式形式。
			如果不希望所有的scss样式都模块化，也可以将上面匹配scss的loader配置删除，而将之前包含exclude、include的css-loader的配置拷贝一份然后在修改。（其实还有更好的方法，使用变量动态修改module配置的方式） 
			要增加less文件处理的loader，npm i -D less-loader less ,然后可以将上面scss处理的配置拷贝一份，然后匹配改成less，sass-loader改成less-loader
			

			
			
新建一个babel的文件夹，进入babel目录，npm init
npm i -D babel-cli
babel script.js//会报错 因为是安装到项目的 不是全局安装
可以这样使用：./node_modules/.bin/babel src/script.js
也可以在package.json 的 scripts 里面增加 babel的命令配置
"babel":"babel src/script.js -o out/a.js"

npm install --save-dev babel-plugin-transform-es2015-arrow-functions//把ES6箭头函数编译为ES5的插件

babel --plugins  transform-es2015-arrow-functions script.js

npm install --save-dev babel-plugin-transform-es2015-classes //把ES6的类编译为ES5的插件

"babel":"babel src/script.js --plugins=transform-es2015-arrow-functions,transform-es2015-classes"

添加.babelrc配置文件 

在文件中添加配置:
{
	"plugins":["transform-es2015-arrow-functions","transform-es2015-classes"]
}

此时可以去掉 package.json中scripts中babel配置的 plugins参数选项 --plugins=transform-es2015-arrow-functions,transform-es2015-classes

安装presets

//官网安装命令是 npm install --save-dev babel-cli babel-preset-es2015 由于我们已经安装过babel-cli所以只需要执行先的命令
npm i -D babel-preset-es2015

修改.babelrc配置文件 
{
	"presets":["es2015"]
}

如果编译命令不指定 -o 参数 ，编译后不会有输出文件。




重新认识babel-loader

npm i -D babel-preset-env

在babel-loader的options中的presets配置中增加 'env',env包含所有最新的标准语法（es2015,es2016,es2017,es2018）。

变成：
options:{
	presets:['react','env'],
	plugins:['transform-object-rest-spread']
}

npm i -D babel-plugin-transform-object-rest-spread//支持对象扩展转换的插件

如果使用的是.babelrc，修改.babelrc配置文件 
{
	"presets":["es2015"],
	"plugins":["transform-object-rest-spread"]
}

如果是babel-loader，修改babel-loader的options配置，在presets后面增加plugins配置"plugins":['transform-object-rest-spread']


优化babel-loader配置

增加exclude配置  exclude:[path.resolve(__dirname,'node_modules')]//排除掉第三方包，减少编译时间和打包文件大小。

把配置写到配置.babelrc文件
{
	"presets":["react","env"],
	"plugins":["transform-object-rest-spread"]
}

然后，去掉babel-loader中相应的options配置。

babel-loader所做的事情就是把匹配到的文件交给babel处理，也就是babel-core，他会查找options选项配置，如果没有就会查找.babelrc配置文件。



输出路径处理

修改webpack.config.dev.js中的输出路径 path:path.resolve(__dirname,'dist/assets')

修改HTMLWebpackPlugin的filename:'../index.html'

npm i -D clean-webpack-plugin

webpack.config.dev.js中引入clean-webpack-plugin

const CleanWebpackPlugin = require('clean-webpack-plugin');

修改plugins配置

plugins:[
	new HtmlWebpackPlugin({
		filename:'../index.html',//一般还是使用'index.html'
		template:'src/index.html'
	}),
	new CleanWebpackPlugin(['dist'])
]

设置字体文件的输出路径，也就是设置加载字体文件的file-loader

{
	test:'/\.(ttf|eot|woff|woff2|svg)$/',
	use:[{
		loader:'file-loader',
		options:{
			name:'fonts/ [name]_[hash:8].[ext]'
		}
	}]
}

同理，修改加载图片的url-loader配置
{
	test:'/\.(jpg|png|gif|jpeg)$/',
	use:[{
		loader:'url-loader',
		options:{
			name:'img/ [name]_[hash:8].[ext]'
		}
	}]
}
修改入口文件输出路径为'js/app.js'
output:{
	path:path.resolve(__dirname,'dist/assets'),
	filename:'js/app.js'
}



publicPath
修改文件输出路径配置
output:{
	path:path.resolve(__dirname,'dist/assets'),//一般设置为 'dist'
	filename:'js/app.js',
	publicPath:'assets/'//所有资源的基础路径，修正引入的资源文件路径，会在引入的资源文件路径前加此前缀，注意此处的/   一般设置为 '/'
}

修改devServer配置

devServer:{
	open:true,//启动时，自动在浏览器打开
	port:9000,//自定义启动的端口,
	contentBase:'./src/common',//本地文件查找路径入口，如果devServer内存中查找不到路径，就会在本地查找。
	publicPath:'/'//服务器打包资源后的输出路径 内存中的路径入口
}

