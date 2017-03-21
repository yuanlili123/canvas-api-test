namespace engine {

        export class Tween {

        private moveTimer;

        private moveData : engine.MovieClipData;

        private idleData : engine.MovieClipData;

        private object : engine.MovieClip;

        constructor(object : engine.MovieClip, moveData : engine.MovieClipData, idleData : engine.MovieClipData){

            this.object = object;
            this.moveData = moveData;
            this.idleData = idleData;
        }

        moveTo(targetX : number, targetY : number){

            var object = this.object;
            var idleData = this.idleData;
            var moveData = this.moveData;
       
            object.isMove = true;
            object.setMovieClipData(moveData);
            
            //开启移动线程
            this.moveTimer = setInterval(function(){

            
                if(Math.abs(object.x - targetX) <= object.moveSpeed && Math.abs(object.y - targetY) <= object.moveSpeed){

                    console.log("OK")
                    object.x = targetX;
                    object.y = targetY;
                    object.setMovieClipData(idleData);
                    object.isMove = false;
                    clearInterval(this.moveTimer);

                }
                

                if(object.x > targetX){
                    
                    object.x = object.x - object.moveSpeed;
                
                }else if(object.x < targetX){
                    
                    object.x = object.x + object.moveSpeed;
                }
                
                if(object.y > targetY){
                    
                    object.y = object.y - object.moveSpeed;
                
                }else if(object.y < targetY){
                    
                    object.y = object.y + object.moveSpeed;
                
                }
            
            }, 50);

        }


        removeTween(){
            
            this.object.isMove = false;
            if(this.moveTimer){                 
                clearInterval(this.moveTimer); 
            }
        }
    }
}

