var ASMag = {
	myScroll:'',
	debug:true,
	log:function(msg){
		if(this.debug){
			alert(msg);
		}
	},
	init:function(){
		pageInit();
		scrollerInit();
		registerEvent();
	} 
}

var ASEvents={
	init:function(){
		var mylifeCycle;
		//注册init事件
		$.each(ASPage,function(obj){
			mylifeCycle = ASPage[obj].lifeCycle;
			mylifeCycle.init();
		});
	},
	fliped:function(myscroller){
		//ASMag.log(myscroller.currentXPage);
		var pageContainer = this._getCurrentPageId(myscroller.currentXPage);
		//ASMag.log(pageContainer);
		var mylifeCycle = ASPage[pageContainer].lifeCycle;
		mylifeCycle.fliped(myscroller);	
	},
	//TODO: 目前不能获得真正的得touch偏移量
	moving:function(myscroller){
		var pageContainer = this._getCurrentPageId(myscroller.currentXPage);
		//ASMag.log(pageContainer);
		var mylifeCycle = ASPage[pageContainer].lifeCycle;
		mylifeCycle.moving(myscroller);
	},
	_getCurrentPageId:function(currentPage){
		var div_current_num = parseInt(currentPage)-1;
		return  $('#scroller li:eq('+div_current_num+') > div').attr('id');
	}
}

var ASScroller = {
		snap: true,
		momentum: false,
		hScrollbar: false,  
		pageWidth:320,
		onScrollEnd: function () {
			//ASMag.log(this.y);		
			// ASMag.log(this.x);
			ASEvents.moving(this);
		},
		onScrollXPageFliped:function () { 
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + this.currentXPage + ')').className = 'active';
		
			//注册翻页事件
 			ASEvents.fliped(this);
		}
}


function registerEvent(){
	ASEvents.init();
}

function pageInit(){
	$.each(ASPage,function(obj){
		addPage(obj,ASPage[obj]);
	});	
}

function addPage(id,options){
	// ASMag.log(id);
	var defaults={
		css:{ 
			width:'320px',
			height:'389px',
			'text-align':'center',
			background:'#99ff99',
			margin: 0,
			padding: 0,
			background: 'transparent url(../demo/images/mymag/008.jpg) top left no-repeat',
			'background-position':'center',
			'background-size':'320px 389px'
		}, 
		bg:'../demo/images/mymag/008.jpg', 
		pageNum:1
	}

	var opts = $.extend({},defaults, options);    

	//保证id唯一
	if($('#'+id).length==1){
		$('#'+id).remove();
	}

	$('<li></li>',
		{  
		 	id:'page_'+id+'' 
		}
	 ).appendTo($('#thelist'));

	
	$('<div></div>',
		{  
		 	id:''+id+'',  
			css:opts.css 
		}
	 )
    .css('background', 'transparent url('+opts.bg+') top left no-repeat')
	.appendTo($('#page_'+id));
};
	
function scrollerInit(){
	ASMag.myScroll = new iScroll3('scroller', ASScroller);
}



function ASMain(){
	ASMag.init();
}



$(function(){
	//初始化
	ASMain();
 
 	/*返回目录*/
 	$('#next').click(function(){
 		var count=0;
 		if(ASMag.myScroll.currentPage>2){
 			count = ASMag.myScroll.currentPage - 2;
 			for(var i=0;i<count;i++){
 				myScroll.scrollToPage('prev', 0);
 			}
 		}
 		
 		if(ASMag.myScroll.currentPage==1){
 		 	ASMag.myScroll.scrollToPage('next', 0);
 		}
 		
 		return false;
 	});
 	
 	/*返回书架*/
 	$('#prev').click(function(){
 		window.location.href='../index.html';
 		return false;
 	});			
});