//定义食物类
class Food{
    //定义一个属性表示食物对应的元素，食物在页面中设置好了，所以类型为HTMLElement
    element:HTMLElement;
    constructor(){
        //！非空断言，表示document.getElementById('food')不可能为空
        this.element = document.getElementById('food')!;
    }
    //获取食物坐标，当蛇的坐标和食物坐标重叠后，表示食物被蛇吃了
    get X(){
        return this.element.offsetLeft;
    }
    get Y(){
        return this.element.offsetTop;
    }
    change(snakeBody:HTMLCollection){
        //生成一个随机的位置[0,290]，蛇每次移动一格一个是10px，为了蛇能吃到食物，食物的位置应该是10的倍数
        const top = Math.round(Math.random()*29)*10;//Math.round四舍五入取整
        const left = Math.round(Math.random()*29)*10;
        let foodInSnake = false;
        for(let i=0;i<snakeBody.length;i++){//判断食物是不是刷新在了蛇身里
            let body = <HTMLElement>snakeBody[i];
            if (left === body.offsetLeft && top === body.offsetTop) {
                foodInSnake = true
                break; //找到了就不用再找了
            }
        }
        if(foodInSnake){
            this.change(snakeBody);//重新生成新坐标
        }else{
            this.element.style.left = `${top}px`;
            this.element.style.top = `${left}px`;
        }
       
    }
}

export default Food;