var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup,cloudImage;
var obstacleGroup,ob1,ob2,ob3,ob4,ob5,ob6;
var score;
var play = 1
var end = 0
var gameState = play 
var gameOver,gameOverImage;
var restart,restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage ("obstacle1.png");
  ob2 = loadImage ("obstacle2.png");
  ob3 = loadImage ("obstacle3.png");
  ob4 = loadImage ("obstacle4.png");
  ob5 = loadImage ("obstacle5.png");
  ob6 = loadImage ("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  gameover = createSprite(300,100,20,50);
  gameover.addImage("gameover",gameOverImage);

  restart = createSprite(270,70,20,50);
  restart.addImage("restart",restartImage);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  trex.addAnimation("collided",trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
}

function draw() {
  background("white") ;
  
  console.log(gameState)
  
  text("score:"+score,550,70)
  
  if(gameState === play) {
  score = score + Math.round(getFrameRate()/60);
  
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    
  if(obstacleGroup.isTouching(trex)){
  gameState=end
  }
    
  restart.visible=false;
  gameover.visible=false;
    
  spawnClouds();
  spawnObstacles();
  }
  
else if(gameState===end){
  ground.velocityX=0
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1)
  trex.changeAnimation("collided",trex_collided);
  restart.visible=true;
  gameover.visible=true;
  if(mousePressedOver(restart)){
    reset();
  }
}
  
  trex.collide(invisibleGround);
  
  spawnClouds();
  
  spawnObstacles();
  
  drawSprites();
}

function reset(){
  gameState=play;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage("ob1",ob1);
        break;
      case 2:obstacle.addImage("ob2",ob2);
        break;
      case 3:obstacle.addImage("ob3",ob3);
        break;
      case 4:obstacle.addImage("ob4",ob4);
        break;
      case 5:obstacle.addImage("ob5",ob5);
        break;
      case 6:obstacle.addImage("ob6",ob6);
        break;  
        default:break;
           }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}