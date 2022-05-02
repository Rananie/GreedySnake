class ScorePanel{
    score=0;
    level=1;
    maxLeval:number;//设置一个变量限制等级
    upScore:number;//设置一个变量表示多少分升级
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    constructor(maxLeval:number=10,upScore:number=10){//不传值就默认10
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLeval = maxLeval;
        this.upScore = upScore;
    }
    //设置加分的方法
    addScore(){
        this.score++;
        this.scoreEle.innerHTML = this.score + '';
        if(this.score % this.upScore ===0 ){
            this.levelUp();
        }
    }
    //设置等级升级的方法
    levelUp(){
        if(this.level<this.maxLeval){//等级有上限
            this.level++;
            this.levelEle.innerHTML = this.level + ''; //需要是字符串类型
        }
    }
}
export default ScorePanel;