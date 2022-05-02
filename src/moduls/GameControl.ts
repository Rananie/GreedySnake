import Food from "./Food";
import Snake from "./snake";
import ScorePanel from "./ScorePanel";

//游戏控制器，控制其他所有类
class GameControl{
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    //创建一个属性来存储蛇的移动方向，也就是按键方向，比如蛇往左移动后不能立即向右移动，所以我们需要先保存起来
    direction='';
    isLive = true;//表示游戏的是否结束
    constructor(){//获取实例
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);
        this.init();
    }
    //游戏的初始化，调用后游戏开始
    init(){
        document.addEventListener('keydown',this.keydownHandle.bind(this));
        this.run();
    }
    //创建一个键盘按下的响应函数
     /* event.key,字符串
        ArrowRight
        ArrowLeft
        ArrowUp
        ArrowDown
    */
    
     keydownHandle(event:KeyboardEvent){
        //如果按键和当前方向相同，则不改变
        if (this.direction === event.key) return;
            //蛇不能掉头，那么遇见当前水平方向应该也是不起作用的,也就是不修改当前方向
         switch(event.key){
             case"ArrowUp":
             case"ArrowDown":
                 if(this.direction === "ArrowUp"||this.direction ==="ArrowDown")return;
                 this.direction = event.key;
                 break;
     
             case"ArrowLeft":
             case"ArrowRight":
                 if(this.direction === "ArrowRight"||this.direction ==="ArrowLeft")return;
                 this.direction = event.key;
                 break;
             default:
                 break;
             }
     }   
    //创建控制蛇移动的方法
    run(){//根据方法改变蛇的位置,方向可能是四个方法
        //这里top和left只是计算，不会调用snake的setter
        let Y = this.snake.top;
        let X = this.snake.left;
        switch (this.direction) {
            case "ArrowUp":
                Y-=10;
                break;
            case "ArrowDown":
                Y+=10;
                break;
            case "ArrowLeft":
                X-=10;
                break;    
            case "ArrowRight":
                X+=10;
                break;
        }
        this.checkEat(X,Y); 
        //修改蛇的坐标值,调用snake的setter
        try{
            this.snake.top = Y;
            this.snake.left = X;
        }catch(e){
            //e是unknown会报错
            alert((<any>e).message);           
            this.isLive = false;
        }
        //开启定时调用,定时器回调window调用
        this.isLive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30); //蛇开始动了应该一直动
    }
    //定义一个方法，用来检查蛇是否吃到食物
    checkEat(X:number,Y:number,){ 
        if(X===this.food.X && Y===this.food.Y){
                //食物的位置要进行重置
                this.food.change(this.snake.bodies);
                //分数增加
                this.scorePanel.addScore();  
                //蛇要增加异界
                this.snake.addBody();   
        }
    } 
}
export default GameControl;