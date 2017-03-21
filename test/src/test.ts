var canvas = document.getElementById("app") as HTMLCanvasElement;
var stage = engine.run(canvas);

engine.Ticker.getInstance().register((deltaTime) => {

    //console.log(deltaTime);
    button.y = button.y + deltaTime / 10;

});

//第二层容器
var panel = new engine.DisplayObjectContainer();
panel.x = 120;
panel.y = 50;
panel.alpha = 0.5;

//按钮
var button = new engine.Button();
button.x = 10;
button.y = 30;
button.text = "点我";
button.color = "#FF0000"
button.size = 20;
button.enable = true;
button.addEventListener("onclick", ()=>{

    button.text = "欧尼酱";     

},this,false);

var word2 = new engine.TextField();
word2.text = "第二层容器"
word2.color = "#0000FF"
word2.size = 30;

var list = new engine.DisplayObjectContainer();
list.addEventListener("onmousemove", (e : MouseEvent) =>{

    var dy = engine.currentY - engine.lastY;
    list.y = list.y + dy;

}, this, false);


//帧动画
var idleData : engine.MovieClipData = {

    name : "111",

    frames : [
        {"image" : "playerIdle1.jpg"},
        {"image" : "playerIdle1.jpg"},
        {"image" : "playerIdle1.jpg"},
        {"image" : "playerIdle1.jpg"},
        {"image" : "playerIdle1.jpg"},
        {"image" : "playerIdle1.jpg"},
        {"image" : "playerIdle2.jpg"},
        {"image" : "playerIdle2.jpg"},
        {"image" : "playerIdle2.jpg"},
        {"image" : "playerIdle2.jpg"},
        {"image" : "playerIdle2.jpg"},
        {"image" : "playerIdle2.jpg"}

    ]

}

var moveData : engine.MovieClipData = {

    name : "111",

    frames : [
        {"image" : "playerMove1.jpg"},
        {"image" : "playerMove1.jpg"},
        {"image" : "playerMove1.jpg"},
        {"image" : "playerMove1.jpg"},
        {"image" : "playerMove1.jpg"},
        {"image" : "playerMove1.jpg"},
        {"image" : "playerMove2.jpg"},
        {"image" : "playerMove2.jpg"},
        {"image" : "playerMove2.jpg"},
        {"image" : "playerMove2.jpg"},
        {"image" : "playerMove2.jpg"},
        {"image" : "playerMove2.jpg"}

    ]

}

var player = new engine.MovieClip(idleData);
player.image.src = "player1.jpg";
player.image.width = 128;
player.image.height = 128;

var playerTween = new engine.Tween(player, moveData, idleData);


//图片
var avater = new engine.Bitmap();
avater.image.src = "avater.jpg";


//加载完图片资源
avater.image.onload = () => {


    stage.addChild(new MyMap());

    stage.addChild(player);

}


//vertexShaderSourceCode : 顶点着色器，决定形状  模型-决定数据
//fragmentShaderSourceCode ： 片元着色器，决定颜色   材质-决定数据



var config = [

        {x:0, y:0, walkable:true, image:"road.jpg"},
        {x:0, y:1, walkable:true, image:"road.jpg"},
        {x:0, y:2, walkable:true, image:"road.jpg"},
        {x:0, y:3, walkable:true, image:"road.jpg"},
        {x:0, y:4, walkable:true, image:"road.jpg"},
        {x:0, y:5, walkable:true, image:"road.jpg"},
        {x:0, y:6, walkable:true, image:"road.jpg"},
        {x:0, y:7, walkable:true, image:"road.jpg"},

        {x:1, y:0, walkable:true, image:"road.jpg"},
        {x:1, y:1, walkable:true, image:"road.jpg"},
        {x:1, y:2, walkable:true, image:"road.jpg"},
        {x:1, y:3, walkable:true, image:"road.jpg"},
        {x:1, y:4, walkable:true, image:"road.jpg"},
        {x:1, y:5, walkable:false, image:"noRoad.jpg"},
        {x:1, y:6, walkable:true, image:"road.jpg"},
        {x:1, y:7, walkable:true, image:"road.jpg"},

        {x:2, y:0, walkable:false, image:"noRoad.jpg"},
        {x:2, y:1, walkable:false, image:"noRoad.jpg"},
        {x:2, y:2, walkable:false, image:"noRoad.jpg"},
        {x:2, y:3, walkable:false, image:"noRoad.jpg"},
        {x:2, y:4, walkable:true, image:"road.jpg"},
        {x:2, y:5, walkable:false, image:"noRoad.jpg"},
        {x:2, y:6, walkable:true, image:"road.jpg"},
        {x:2, y:7, walkable:true, image:"road.jpg"},

        {x:3, y:0, walkable:true, image:"road.jpg"},
        {x:3, y:1, walkable:true, image:"road.jpg"},
        {x:3, y:2, walkable:true, image:"road.jpg"},
        {x:3, y:3, walkable:false, image:"noRoad.jpg"},
        {x:3, y:4, walkable:false, image:"noRoad.jpg"},
        {x:3, y:5, walkable:false, image:"noRoad.jpg"},
        {x:3, y:6, walkable:true, image:"road.jpg"},
        {x:3, y:7, walkable:true, image:"road.jpg"},

        {x:4, y:0, walkable:true, image:"road.jpg"},
        {x:4, y:1, walkable:true, image:"road.jpg"},
        {x:4, y:2, walkable:true, image:"road.jpg"},
        {x:4, y:3, walkable:true, image:"road.jpg"},
        {x:4, y:4, walkable:true, image:"road.jpg"},
        {x:4, y:5, walkable:true, image:"road.jpg"},
        {x:4, y:6, walkable:true, image:"road.jpg"},
        {x:4, y:7, walkable:true, image:"road.jpg"}   
        ]



class MyMap extends engine.DisplayObjectContainer{

    //width:5*8,height:128*8
    public static SIZE = 128;

    constructor(){

        super();

        //生成地图
        for(var i = 0; i < config.length; i++){
                     
            var mapNode = new MapNode(config[i].x, config[i].y, config[i].image);
            this.addChild(mapNode);
        }

        var aStar : AStar  = new AStar();
        var grid = new Grid(5, 8);

        for(var i = 0; i < config.length; i++){
            
            grid.setWalkable(config[i].x, config[i].y, config[i].walkable);
        }

        this.addEventListener("onclick", (e : MouseEvent) =>{


            grid.setStartNode(Math.floor(player.x / MyMap.SIZE) , Math.floor(player.y / MyMap.SIZE));
            grid.setEndNode(Math.floor(e.offsetX / MyMap.SIZE) , Math.floor(e.offsetY / MyMap.SIZE));

            var stepMoveInterval;

            
            //有路
            if(aStar.findPath(grid)){

               console.log("自动寻路开始");
               var path = aStar._path;

               var i = 0;

               stepMoveInterval = setInterval(function(){
                   
                   if(!player.isMove){
                       
                       playerTween.moveTo(path[i].x, path[i].y);
                    
                  }else{
                    
                       playerTween.removeTween();                       

                  }

                  if(player.x == path[path.length - 1].x && player.y == path[path.length - 1].y){

                      clearInterval(stepMoveInterval);
                  }

console.log("playerX:" + player.x)
console.log("playerY:" + player.y)
console.log("X:" + path[i].x)
console.log("Y:" + path[i].y)

                  if(i < path.length - 1 && player.x == path[i].x && player.y == path[i].y){

                      i++;
                   }
                     console.log("i:" + i);

               }, 500);





  
            }else{
                       
               console.log("自动寻路结束");
            }


        },this, false);

    }



    

    
}


//每一个网格
class MapNode extends engine.Bitmap{

    public girdX : number;
    public girdY : number;

    public walkable : boolean;

    public f : number;
    public g : number;
    public h : number;
    public parentNode : MapNode;
    public costMultiplier : number = 1.0;

    public constructor(girdX : number, girdY : number, imageSrc : string) {

        super();

        this.girdX = girdX;
        this.girdY = girdY;
        this.x = girdX * MyMap.SIZE;
        this.y = girdY * MyMap.SIZE;

        this.image.width = 128;//128 * 5 = 640
        this.image.height = 128;//128 * 8 = 1024
        this.image.src = imageSrc;

    }

}


//整个地图的所有网格，控制所有的节点
class Grid{

    public _startNode : MapNode;
    public _endNode : MapNode;
    public _nodes = [];
    public _numCols : number;
    public _numRows : number;

    public constructor(numCols:number,numRows:number) {

        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();

        var configAmount = 0;

        for(var i = 0; i < this._numCols; i++) {

            this._nodes[i] =  new Array();

            for(var j = 0; j < this._numRows; j++) {

                this._nodes[i][j] = new MapNode(config[configAmount].x , config[configAmount].y , config[configAmount].image);
                configAmount++;

            }
        }
    }


    public getNode(x:number,y:number) : MapNode {

        return this._nodes[x][y] as MapNode;
    }

    public setEndNode(x:number,y:number):void {

        this._endNode = this._nodes[x][y] as MapNode; 
    }

    public setStartNode(x:number,y:number):void {

        this._startNode = this._nodes[x][y] as MapNode;
    }


    public setWalkable(x:number,y:number,value:boolean) {

        this._nodes[x][y].walkable = value;
    }

    public getNumCols():number {

        return this._numCols;
    }

    public getNumRows():number {

        return this._numRows;
    }

}





class AStar {

          //待查列表
		  _openList: MapNode[] = [];

          //已查列表
		  _closedList: MapNode[] = [];  

          //最终路径
		  _path: MapNode[] = [];

		  _grid: Grid;

		  _startNode: MapNode;
		  _endNode: MapNode;

		  
          //设置启发函数
	      _heuristic: Function = this.diagonal;

		  _straightCost: number = 1.0;
		  _diagCost: number = Math.SQRT2;


	      public findPath(grid: Grid): Boolean {
			  
			  this._grid = grid;
			  this._openList = new Array();
			  this._closedList = new Array();
			  this._startNode = this._grid._startNode;
			  this._endNode = this._grid._endNode;
			  
			  this._startNode.g = 0;
			  this._startNode.h = this._heuristic(this._startNode);
			  this._startNode.f = this._startNode.g + this._startNode.h;

			  return this.search();

			}


			//一直到找到路为止
			public search(): Boolean {
				
				var currentNode: MapNode = this._startNode;

				while (currentNode != this._endNode) {
					
					//保证节点不在地图外
					var startX: number = Math.max(0, currentNode.girdX - 1);
					var endX: number = Math.min(this._grid._numCols - 1, currentNode.girdX + 1);
					var startY: number = Math.max(0, currentNode.girdY - 1);
					var endY: number = Math.min(this._grid._numRows - 1, currentNode.girdY + 1);
					
					for (var i: number = startX; i <= endX; i++) {
						
						for (var j: number = startY; j <= endY; j++) {
							
							var test: MapNode = this._grid._nodes[i][j];

							//检测节点为当前节点或不可通过时，无需计算代价
							if (test == currentNode || !test.walkable||!this._grid._nodes[currentNode.girdX][test.girdY].walkable||!this._grid._nodes[test.girdX][currentNode.girdY].walkable){
								continue;
							}

							var cost: number = this._straightCost;
							if (!((currentNode.girdX == test.girdX) || (currentNode.girdY == test.girdY))){

								cost = this._diagCost;
							}
							
							var g: number = currentNode.g + cost;
							var h: number = this._heuristic(test);
							var f: number = g + h;
							
							if (this.isOpen(test) || this.isClosed(test)) {
								if (test.f > f) {
									test.f = f;
									test.g = g;
									test.h = h;
									test.parentNode = currentNode;
								}
							}else{
								test.f = f;
								test.g = g;
								test.h = h;
								test.parentNode = currentNode;
								this._openList.push(test);
							}
						}
					}
					
					this._closedList.push(currentNode);  
					
					//待查列表
					if (this._openList.length == 0) {
						
						return false;
					}
					
					
					this._openList.sort(function (a, b) {
						
						return a.f - b.f;
					});
					
					currentNode = this._openList.shift() as MapNode;
				}
				
				this.buildPath();
				
				return true;
			}
			
			
			public isOpen(node: MapNode): Boolean {
				
				for (var i: number = 0; i < this._openList.length; i++) {

					if (this._openList[i] == node) {

						return true;
					}
				}

				return false;
			}
			
			
			
			public isClosed(node: MapNode): Boolean {
				
				for (var i: number = 0; i < this._closedList.length; i++) {
					
					if (this._closedList[i] == node) {
						
						return true;
					}
				}
				
				return false;
			}
			
			

			public buildPath(): void {
				
				this._path = new Array();

				var node: MapNode = this._endNode;
				this._path.push(node);

				while (node != this._startNode){

					node = node.parentNode;
					this._path.unshift(node);  

				}
			}
			

			public diagonal(node: MapNode): number {
				
				var dx: number = Math.abs(this._endNode.girdX - node.girdX);
				var dy: number = Math.abs(this._endNode.girdY - node.girdY);
				
				var diag: number = Math.min(dx, dy);
				var straight: number = dx + dy;
				
				return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
				
			}
}
			
		

