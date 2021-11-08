let canvas = document.getElementById("Canvas");
let GameOverWindow = document.getElementById("GameOverPanel");
let BtnReload = document.getElementById("reloadgame");
let VictoryWindow = document.getElementById("VictoryPanel");
let Replay = document.getElementById("Replaybtn");
let ScoreWindow = document.getElementById("scorePanel");
let ctx = canvas.getContext("2d");
let Cx = canvas.width;
let Cy = canvas.height;


    let balleRadius = 5;
    let balleXposition = canvas.width/2;
    let balleYposition = canvas.height-30;
    let ballXspeed = -1;
    let ballYspeed = -1;
    

    let playeurXposition = Cx/2;
    let PlayeurWidth = 30;
    let playerSpeed = 3;
    let mouveLeft = false;
    let mouveRight = false;

    let brickOffsetX =20;
    let brickOffsetY = 10;
    let brickWidth = 45;
    let brickHeigth = 10;
    let brickCulumn = 5;
    let brickRows = 3;
    let brickEspace = 10;
    let bricksContener = [];


    let isDead = false;
    let isVictory = false;
    let Score = 0;
    let ScoreMax = 450;


    for(Col = 0;Col < brickCulumn; Col++){
        bricksContener[Col] = [];
        for(Row = 0;Row < brickRows;Row++){
            bricksContener[Col][Row] = {x : 0, y : 0, lifes: 3};
       
        }
    }
    
    

function main(){
    ctx.clearRect(0,0,Cx,Cy);
    drawBalle();
    OnCollition();
    DrawPlayer();
    playerMouvement();
    DrawBriqueWall();
    Victory();
   balleXposition += ballXspeed;
   balleYposition += ballYspeed;






}


function OnCollition(){

//balle 
    if(balleXposition+balleRadius >= Cx || balleXposition <= 0 + balleRadius){
        ballXspeed = -ballXspeed;
    }
    if(balleYposition <= 0 + balleRadius){
        ballYspeed = -ballYspeed;
 }else if(balleYposition+balleRadius >= Cy ){
    
    if( balleXposition > playeurXposition && balleXposition < playeurXposition + PlayeurWidth + 1){
    ballYspeed = -ballYspeed;

 }else{
     VictoryWindow.remove();
     GameOverWindow.style.opacity = 1;
     ScoreWindow.innerHTML = Score.toString();
     isDead = true;
     clearInterval(interval);
     
    

 };
};

 //player
  if(playeurXposition <= 0){
      playeurXposition = 0;
  }

  if(playeurXposition >= Cx-PlayeurWidth){
      playeurXposition = Cx - PlayeurWidth;
  }


  //bricks
 
    //pour cahque brique contenue dans le tableaux
    for(Col = 0;Col < brickCulumn; Col++){
        
        for(Row = 0;Row < brickRows;Row++){
           //ont les inclu a une variable nommer b
            var b = bricksContener[Col][Row];
            // si le statue de la brique est egale a 1
            if(b.lifes >= 1){
                //si la balle touche la brique sur l'un de ces cote
            if(balleXposition > b.x && balleXposition < b.x+brickWidth && balleYposition > b.y && balleYposition <b.y+brickHeigth){
                //ont change la direction de la balle sur l'axe y 
                ballYspeed = -ballYspeed;
                //le statue de la brique passe a 0
                Score += 10;
                b.lifes -= 1;
            }}}}
         
}


function drawBalle(){
  ctx.beginPath();
  ctx.arc(balleXposition, balleYposition,balleRadius,10, 0,Math.PI*2)
  ctx.fillStyle = "#1f2D";
  ctx.fill();
  ctx.closePath();

}


function DrawPlayer(){
ctx.beginPath();
ctx.rect(playeurXposition, Cy-5, PlayeurWidth, 5);
ctx.fillStyle = "#000";
ctx.fill();
ctx.closePath();


}


function playerMouvement(){
    if(mouveRight){
        playeurXposition += playerSpeed;
    }

    if(mouveLeft){
        playeurXposition -= playerSpeed;
    }

}



function DrawBriqueWall(){



    for(Col = 0;Col<brickCulumn; Col++){
     
        for(Row = 0;Row < brickRows;Row++){



           if(bricksContener[Col][Row].lifes == 1){
                var brickx = (Col*(brickWidth+brickEspace))+brickOffsetX;
                var bricky = (Row*(brickHeigth+brickEspace))+brickOffsetY;
                bricksContener[Col][Row].x = brickx;
                bricksContener[Col][Row].y = bricky;
     
                   ctx.beginPath();
                   ctx.rect(brickx, bricky, brickWidth, brickHeigth);
                   ctx.fillStyle = "#FF0000";
                   ctx.fill();
                   ctx.closePath();
             }else if(bricksContener[Col][Row].lifes == 2){
                    var brickx = (Col*(brickWidth+brickEspace))+brickOffsetX;
                    var bricky = (Row*(brickHeigth+brickEspace))+brickOffsetY;
                    bricksContener[Col][Row].x = brickx;
                    bricksContener[Col][Row].y = bricky;
         
                    ctx.beginPath();
                    ctx.rect(brickx, bricky, brickWidth, brickHeigth);
                    ctx.fillStyle = "#FFD000";

                    ctx.fill();

                    ctx.closePath();
                }else if(bricksContener[Col][Row].lifes == 3){
                    var brickx = (Col*(brickWidth+brickEspace))+brickOffsetX;
                    var bricky = (Row*(brickHeigth+brickEspace))+brickOffsetY;
                    bricksContener[Col][Row].x = brickx;
                    bricksContener[Col][Row].y = bricky;
         
                    ctx.beginPath();
                    ctx.rect(brickx, bricky, brickWidth, brickHeigth);
                    ctx.fillStyle = "#11FF00";
                    ctx.fill();
                    ctx.closePath();
                  
                

           }
        }
    }
}






document.addEventListener("keydown",KeyPressed,false);
document.addEventListener("keyup", KeyDontPressed, false);
BtnReload.addEventListener("click", Reloadgame);
Replay.addEventListener("click", ReplayAgaine);


function ReplayAgaine (){
    if(isVictory == true){
        location.reload();
    }
}

function Reloadgame(){
    if(isDead == true){
location.reload();
    }
}

function KeyPressed(e){
    
    if(e.key == "Right" || e.key == "ArrowRight"){
       
        mouveRight = true;
        
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        
        mouveLeft = true;
    }
        
}

function KeyDontPressed(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        mouveRight = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        mouveLeft = false;
    }
        
}

function Victory(){
   if(Score >= ScoreMax){
       isVictory = true;
       VictoryWindow.style.opacity = 1;
     clearInterval(interval);
   }
}


let interval = setInterval(main, 10);