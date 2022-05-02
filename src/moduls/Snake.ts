class Snake {
    head:HTMLElement;//head表示蛇头
     //表示蛇的身体。包括蛇头,当snake里添加新元素HTMLCollection会自动收集
    bodies:HTMLCollection;
    //获取蛇容器
    element:HTMLElement;
    constructor() {
        this.head = document.querySelector("#snake>div")!;
        //querySelectorAll返回的是NodeList,获取当前状态的节点，如果有新增节点，需要重新获取
        //this.bodies = document.querySelectorAll("#snake>div")!;
        this.element = document.querySelector("#snake")!;
        this.bodies = this.element!.getElementsByTagName('div');
    }
    //获取蛇的坐标
    get top(){
        return this.head.offsetTop;
    }
    get left(){
        return this.head.offsetLeft;
    }
    set top(value){
        if(this.top ===value)return;//没有发生变化就不修改
        //top的合法范围在0-290之间,蛇撞墙了
        if(value<0 || value>290){
            throw new Error("蛇撞墙了");
        }
        this.moveBody();//从后往前变
        this.head.style.top = value +'px';
        this.checkHeadBody();
    }
    set left(value){
        if(this.left ===value)return;//没有发生变化就不修改
         //left的合法范围在0-290之间,蛇撞墙了
         if(value<0 || value>290){
            throw new Error("蛇撞墙了");
        }
        this.moveBody(); //从后往前变
        this.head.style.left = value +'px';
        this.checkHeadBody();
    }
    //蛇吃到食物会增加身体
    addBody(){
        //在结束标签之前添加元素
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
    //蛇身体移动
    moveBody(){
    /*
    每一块的新坐标应该变成它前一块的旧坐标，修改应该从后往前修改，这样才知道它前一块的旧位置在哪里
    */
   
    for(let i=this.bodies.length-1;i>0;i--){  
        /*
        bodies是HTMLCollection类型是Element接口，实际类型是HTMLElement，
        所以会报错Element没有xxx属性，HTMLElement是Eelement的子类,增加断言
        */
        (<HTMLElement>this.bodies[i]).style.left = (<HTMLElement>this.bodies[i-1]).offsetLeft +'px';
        (<HTMLElement>this.bodies[i]).style.top = (<HTMLElement>this.bodies[i-1]).offsetTop +'px';
    }    
    }
    
  // 检查蛇是否撞上了自己的身体
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let body = <HTMLElement>this.bodies[i];
      if (this.left === body.offsetLeft && this.top === body.offsetTop) {
        throw new Error("蛇撞自己了")
      }
    }
  }
}

export default Snake