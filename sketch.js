//Defining ground
  var ground,invisibleGround,groundi;

//Defining monkey
var monkey,monkeyImage;

//Defining Banana
var banana, bananaImage, bananaGroup;

//Defining Obstacles
var obstacles, obstacleImage, obstacleGroup, x;

//survival time
var score=0;

//Gamestates
var gameState;

//some other variables
var num=0;


function preload(){

groundi=loadImage("jungle.jpg");
  
monkeyImage=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
  
}

function setup(){
  createCanvas(600,400);

 // ground=createSprite(300,390,600,20);
   ground=createSprite(300,200,600,20);
   ground.addImage(groundi);
  
  invisibleGround=createSprite(300,390,603,20);
  invisibleGround.visible=false;
  
  monkey=createSprite(80,350,50,80);
  monkey.addAnimation("walking",monkeyImage);
  monkey.scale=0.23;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  gameState="play";
  

}

function food(){
  
  var rand=random(120,200);
  
 
    banana=createSprite(620,200,30,40);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=rand;
    banana.velocityX=-4;
  
  
  lifetime=300;
  
  bananaGroup.add(banana);
    banana.depth=monkey.depth-1;
}
function obstacles(){
  
    obstacle=createSprite(620,360,30,40);
  obstacle.debug=false;
  obstacle.setCollider("rectangle", 0, 0,250,200);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-5;
  obstacle.velcityY=10;
  obstacle.collide(invisibleGround);
  
  lifetime=300;
  
  obstacleGroup.add(obstacle);
   obstacle.depth=monkey.depth-banana.depth;
    monkey.depth=monkey.depth+obstacle.depth;
}

function draw(){
  background("lightblue");
  
   monkey.velocityY = monkey.velocityY + 0.5;
  
  if(gameState==="play"){
    
      ground.velocityX=-5;
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
    if(keyDown("space")&&monkey.y>307){
  
    monkey.velocityY = -14;
      
  }
  
   if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  
  }
    

    
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    monkey.scale=monkey.scale-0.05;
    score=score-3;
    num=num+1;
    
    if(monkey.scale<0.2){
      monkey.scale=0.2;
    }
    
  }
  
 console.log(monkey.velocityY);

   
  
  
  if(frameCount%80==0){
  food();
  }
  
  if(frameCount%300==0){
    obstacles();
  }
  
  monkey.collide(invisibleGround);
  
    if(num>1||score<0){
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      monkey.destroy();
      gameState="end";
    }    
    
  drawSprites();
  
   text("Score: "+score,100,50,textSize(20));
  
    
  }
  
  if(gameState==="end"){
    background("black");
    fill("yellow");
    text("Game Over", 180, 200, textSize(50));
  }
  

  
}