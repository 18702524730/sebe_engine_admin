function Drag(id){
    var _this = this; //首先把this存起来,是为了下面的方法的面向对象会有this的指向问题.

    this.id = id;
    this.disX = 0;//用来存储鼠标按下时，鼠标和拖拽元素的左上角的水平距离
    this.disY = 0;//用来存储鼠标按下时，鼠标和拖拽元素的左上角的垂直距离
    this.oDiv = document.getElementById(this.id);
    this.oDiv.onmousedown = function(ev){
    　　_this.fnDown(ev);
    }

  }

  Drag.prototype.fnDown = function(ev){
  　　this.down(ev);
  };

  Drag.prototype.down = function(ev){
  　　var _this = this;

  　　var e = ev || event;
      e.stopPropagation()
  if (this.oDiv.setCapture) {
  this.oDiv.setCapture();
  } 

  this.disX = e.clientX - this.oDiv.offsetLeft;
  this.disY = e.clientY - this.oDiv.offsetTop;

  document.onmousemove = function(ev){

  _this.fnMove(ev);

  };

  document.onmouseup = function(){
  　　_this.fnUp();    
  };
  return false; //阻止默认行为.

  }


  Drag.prototype.fnMove = function(ev){

  var e = ev || event;
  e.stopPropagation()
  this.SetCapture();
  var l = e.clientX - this.disX;
  var t = e.clientY - this.disY;
  this.oDiv.style.left = l +"px";
  this.oDiv.style.top = t + "px";
  };

  Drag.prototype.SetCapture = function(){
  if (this.oDiv.setCapture) {
  　　this.oDiv.setCapture();//针对IE低版本拖拽的bug,事件捕获.
  }    
  };

  Drag.prototype.fnUp = function(ev){

  document.onmousemove = null;
  document.onmouseup = null; // 
  this.ReleaseCapture(); 

  };

  Drag.prototype.ReleaseCapture = function(){
  if (this.oDiv.releaseCapture) {
  　　this.oDiv.releaseCapture();//鼠标抬起的时候,释放捕获.
  }

  };


  function LimitDrag(id,canleId){
    this.drag = Drag;//对象冒充的方法实现继承
    this.drag(id); //这里必须得调用一下,(当然也可以用其它的继承方式.)
    }
    
    for(var i in Drag.prototype){
    　　LimitDrag.prototype[i] = Drag.prototype[i];    
    }
    LimitDrag.prototype.fnMove = function(e){
    this.SetCapture();
    this.fnLimit(e);
    }
    LimitDrag.prototype.fnLimit = function(e){
    var e = e || window.event;
    
    var l = e.clientX - this.disX;
    var t = e.clientY - this.disY;
    
    if(l < 0){ //拖拽的元素不能出屏幕的左侧
    
    l = 0;    
    }
    else if( l > document.documentElement.clientWidth - this.oDiv.offsetWidth){
    
    //拖拽的元素不能出屏幕的右侧
    
    l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
    }
    if(t < 0){
    t = 0;    //拖拽的元素不能出屏幕的上侧 
    }
    else if(t > document.documentElement.clientHeight - this.oDiv.offsetHeight){
    
    　//拖拽的元素不能出屏幕的下侧
    t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
    }
    
    this.oDiv.style.left = l +"px";
    this.oDiv.style.top = t + "px";
    }
    export{
        Drag, LimitDrag
    }