//mui初始化
mui.init({
});
var subpages = ['tab-webview-subpage-about.html', 'tab-webview-subpage-topic.html', 'tab-webview-subpage-contact.html', 'tab-webview-subpage-setting.html'];
var subpage_style = {
	top: '50px',
	bottom: '51px'
};

var aniShow = {};

 //创建子页面，首个选项卡页面显示，其它均隐藏；
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	for (var i = 0; i < 4; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if (i > 0) {
			sub.hide();
		}else{
			temp[subpages[i]] = "true";
			mui.extend(aniShow,temp);
		}
		self.append(sub);
	}
});
 //当前激活选项
var activeTab = subpages[0];
var title = document.getElementById("title");
var slider = document.getElementById('slider');
 //选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if (targetTab == activeTab) {
		return;
	}
	var thisTitle = this.querySelector('.mui-tab-label').innerHTML;
	if (thisTitle == "话题") {
		title.style.display = "none";
		slider.style.display = "block";
	} else {
		slider.style.display = "none";
		title.style.display = "block";
		//更换标题
		title.innerHTML = thisTitle;
	}
	
	if (slider.style.display == "block"){

		var subpages_chat = ['tab-webview-subpage-topic.html', 'tab-webview-subpage-asking.html', 'tab-webview-subpage-attention.html'];
		var subpage_chat_style = {
			top: '50px',
			bottom: '51px'
		};
		
		var aniShow_chat = {};

		 //创建子页面，首个选项卡页面显示，其它均隐藏；
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			for (var i = 0; i < 3; i++) {
				var temp = {};
				var sub = plus.webview.create(subpages_chat[i], subpages_chat[i], subpage_chat_style);
				if (i > 0) {
					sub.hide();
				}else{
					temp[subpages_chat[i]] = "true";
					mui.extend(aniShow_chat,temp);
				}
				self.append(sub);
			}
		});
		 //当前激活选项
		var activeTab_chat = subpages_chat[0];
		
		 //选项卡点击事件
		mui('.mui-slider').on('tap', 'a', function(e) {
			var targetTab = this.getAttribute('href');
			if (targetTab == activeTab_chat) {
				return;
			}
			
			//显示目标选项卡
			//若为iOS平台或非首次显示，则直接显示
			if(mui.os.ios||aniShow[targetTab]){
				plus.webview.show(targetTab);
			}else{
				//否则，使用fade-in动画，且保存变量
				var temp = {};
				temp[targetTab] = "true";
				mui.extend(aniShow_chat,temp);
				plus.webview.show(targetTab,"fade-in",30);
			}
			//隐藏当前;
			plus.webview.hide(activeTab_chat);
			//更改当前活跃的选项卡
			activeTab_chat = targetTab;
		});
		
	} else {
		//显示目标选项卡
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios||aniShow[targetTab]){
			plus.webview.show(targetTab);
		}else{
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow,temp);
			plus.webview.show(targetTab,"fade-in",30);
		}
		//隐藏当前;
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
		}
		//自定义事件，模拟点击“首页选项卡”
		document.addEventListener('gohome', function() {
			var defaultTab = document.getElementById("defaultTab");
			//模拟首页点击
			mui.trigger(defaultTab, 'tap');
			//切换选项卡高亮
			var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
			if (defaultTab !== current) {
				current.classList.remove('mui-active');
				defaultTab.classList.add('mui-active');
			}
		});
	
});

//自定义事件，模拟点击“子首页选项卡”
document.getElementById('topic').addEventListener('tap', function() {
	var defaultSubTab = document.getElementById("defaultSubTab");
	//模拟子首页点击
	mui.trigger(defaultSubTab, 'tap');
	//切换选项卡高亮
	var current = document.querySelector("#slider>.mui-control-item.mui-active");
	if (defaultSubTab !== current) {
		current.classList.remove('mui-active');
		defaultSubTab.classList.add('mui-active');
	}
});