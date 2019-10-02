/*
 * @version : v1.0
 * @author  : 饭     
 * @update ：    new Date()
 * @fn : 模板文件 ！
 */


var template  = {
	
	//树形菜单模板
	treeMenuTemplate : function(data,id){
		
		var childs = dataControl.getChildById(data,id); //查找所有的子元素
		
		var html = "<ul style='display:block'>";
		childs.forEach(function(item){
			
			//获取当前的数据在第几层
			var level = dataControl.getLevelById(data,item.id);
			
			//判断当前数据有木有子集
			var hasChild = dataControl.hasChilds(data,item.id);
			
			//如果有子元素，则显示下拉状态control，否则control-none
			var classNames = hasChild ? "control" : "control-none";
			html += `
				<li>
					<div class="title ${classNames}" style="padding-left:${level*14}px;" data-file-id="${item.id}">
						<i class="icon icon1"></i>
						<i class="icon icon2"></i>
						<span>${item.title}</span>
					</div>
					${template.treeMenuTemplate(data,item.id)}
				</li>
			`;
		});
		html += "</ul>";
		return html;
	},
	
	//面包屑导航模板【parents:表示,所有的父级菜单】
	breadNavTemp : function(parents){
		var breadHtml = "";
		parents.forEach(function(elem,index){
			if(index == parents.length-1)return false;
			breadHtml += `<li>
						<a href="javascript:void(0)" data-file-id="${elem.id}">
							<span>${elem.title}</span>
						</a>
						<i class="icon"></i>
					</li>`;
		});
		breadHtml += `<li>
					<span class="currPath active" data-file-id="${parents[parents.length-1].id}">
						${parents[parents.length-1].title}
					</span>
				</li>`;
		$("#breadNav").html(breadHtml);		
	},
	
	//文件夹模板【视图模式,childs:表示当前文件下的所有一级子目录】
	folderView : function(childs){
		var fileHtml = `<div class="files" data-file-id = "${childs.id}">
					<a href="javascript:void(0)" class="selectBox"></a>
					<span class="icon folderIcon"></span>
					<p class="filename">${childs.title}</p>
					<input type="text" class="txt">
				</div>`;
		return fileHtml;
	},
	
	//文件列表模板
	forlderLists : function(childs){
		var listHtml = `
			<div class="files" data-file-id="${childs.id}">
				<div class="titles">
					<a href="javascript:void(0)" class="selectBox"></a>
					<span class="icon folderIcon"></span>
					<span class="filename">${childs.title}</span>
					<input type="text" class="txt">
				</div>
				<div class="tools">
					<a href="javascript:void(0)" class="icon download" title="下载"></a>
					<a href="javascript:void(0)" class="icon share" title="分享"></a>
					<a href="javascript:void(0)" class="icon move" title="移动"></a>
					<a href="javascript:void(0)" class="icon cancle" title="删除"></a>
				</div>
				<div class="timer">
					<span>${childs.timer}</span>
				</div>	
			</div>
		`;
		return listHtml;
	},
	
	//创建列表文件
	createListsFile : function(fileData){
		var newFile = $("<div class='files reNameFile newFile' data-file-id='"+fileData.id+"'></div>");
		newFile.html(FileHtml(fileData));
		
		function FileHtml(fileData){
			var html = `
				<div class="titles">
					<a href="javascript:void(0)" class="selectBox"></a>
					<span class="icon folderIcon"></span>
					<span class="filename">${fileData.title}</span>
					<input type="text" class="txt">
				</div>
				<div class="tools">
					<a href="javascript:void(0)" class="icon download" title="下载"></a>
					<a href="javascript:void(0)" class="icon share" title="分享"></a>
					<a href="javascript:void(0)" class="icon move" title="移动"></a>
					<a href="javascript:void(0)" class="icon cancle" title="删除"></a>
				</div>
				<div class="timer">
					<span>${fileData.timer}</span>
				</div>	
			`;
			return html;
		}
		return newFile;
	},
	
	//新建文件夹模板 【fileData:代表文件夹需要的数据,json】
	createFile : function(fileData){
		var newFile = $("<div class='files reNameFile newFile' data-file-id='"+fileData.id+"'></div>");
		newFile.html(FileHtml(fileData));
		
		function FileHtml(fileData){
			var html = `
				<a href="javascript:void(0)" class="selectBox"></a>
				<span class="icon folderIcon"></span>
				<p class="filename">${fileData.title}</p>
				<input type="text" class="txt">
				`;
			return html;
		}
		
		return newFile;
	},
	
	//创建树形菜单模板【opts:代表树形菜单需要的数据,json】
	createTreeMenu : function(opts){
		var $li = $("<li></li>")
		$li.html(`
			<div class="title control-none" style="padding-left:${opts.level*14}px;" data-file-id="${opts.id}">
				<i class="icon icon1"></i>
				<i class="icon icon2"></i>
				<span>${opts.title}</span>
			</div>
			<ul style="display:block"></ul>
		`);
		return $li;
	},
	
	//评论模板
	commentTemp : function(json){
		var pl = $("<div class='pl animated bounceInUp'></div>");
		pl.html(htmls(json));
		function htmls(json){
			var html = `
				<div class="header-pic">
					<img src="images/50.png" />
				</div>
				<div class="details">
					<div class="conlists">
						<span class="sj"></span>
						${json.cons}
					</div>
					<p class="timer">发表时间： <span>${json.timer}</span></p>
				</div>
			`;
			return html;
		}
		return pl;
	}
	
	
	
}

