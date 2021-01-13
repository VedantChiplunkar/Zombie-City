var bg;
var player,pr;
var shoot;
var bullet;
var c;
var bulletg;
var e;
var area;
var a1,a2,a3,a4;
var w1,w2,w3,w4;
var  enemyg,enemyg1;
var whealth;
var PLAY=1;
var END = 0;
var WIN =2;
var gameState=PLAY;
var gameover,restart,rsimg,goimg;
var bolg;
var score;
var Win,Winimg;
var shootsound
var winsound;
var gameoversound;
var killsound;



function preload(){
bg = loadImage("images/Background.png")
pr = loadAnimation("images/SO1.png","images/SO_2.png","images/SO_4.png")
shoot = loadAnimation("images/SFO-2.png")
shootsound = loadSound("shoot.wav");
winsound = loadSound("win.wav");
gameoversound = loadSound("gameover.wav");
killsound = loadSound ("kill.wav");
e = loadAnimation("images/E1-removebg-preview.png","images/E2-removebg-preview.png","images/E3-removebg-preview.png","images/E4-removebg-preview.png","images/E5-removebg-preview.png","images/E6-removebg-preview.png","images/E7-removebg-preview.png","images/E8-removebg-preview.png")
w1 = loadAnimation("images/Wall_1-removebg-preview.png","images/wall_2-removebg-preview.png","images/wall_3-removebg-preview.png","images/wall_4-removebg-preview.png","images/wall_6-removebg-preview.png")
w2 = loadAnimation("images/Wall_1-removebg-preview.png","images/wall_2-removebg-preview.png","images/wall_3-removebg-preview.png","images/wall_4-removebg-preview.png","images/wall_6-removebg-preview.png")
w3 = loadAnimation("images/Wall_1-removebg-preview.png","images/wall_2-removebg-preview.png","images/wall_3-removebg-preview.png","images/wall_4-removebg-preview.png","images/wall_6-removebg-preview.png")
w4 = loadAnimation("images/Wall_1-removebg-preview.png","images/wall_2-removebg-preview.png","images/wall_3-removebg-preview.png","images/wall_4-removebg-preview.png","images/wall_6-removebg-preview.png")
goimg = loadImage("images/Game_Over-removebg-preview.png")
rsimg = loadImage("images/reset-removebg-preview.png")
Winimg = loadImage("images/WIN.PNG")
}

function setup() {
  
  createCanvas(1200,800);
 // area=createSprite(745,400,160,160)
  a1=createSprite(835,400,10,160);
  a1.addAnimation("wall",w1)
  a2=createSprite(650,400,10,160);
  a2.addAnimation("wall",w2)
  a3=createSprite(745,320,160,10);
  a3.addAnimation("wall",w3)
  a4=createSprite(745,480,160,10);
  a4.addAnimation("wall",w4)
  c=0
  score=0;
  whealth=100;
  gameover=createSprite(600,400,50,50)
  gameover.addImage("gameover",goimg)
  Win = createSprite(600,400,50,50)
  Win.addImage("win",Winimg)
  restart = createSprite(600,650,50,50)
  restart.addImage("resatrt",rsimg)
  gameover.visible=false
  restart.visible=false
  Win.visible= false;
  player=createSprite(740, 400, 20, 50);
  player.addAnimation("standing",pr)
  player.addAnimation("shooting",shoot)
  player.debug=false;
  player.setCollider("Circle",0,0,20)
  a1.debug=false;
  a1.setCollider("Rectangle",0,0,12,165)
  a2.debug=false;
  a2.setCollider("Rectangle",0,0,12,165)
  a3.debug=false;
  a3.setCollider("Rectangle",0,0,12,165)
  a4.debug=false;
  a4.setCollider("Rectangle",0,0,12,165)
  bulletg= new Group ();
  enemyg = new Group ();
  bolg = new Group ();
  enemyg1 = new Group();
edges = createEdgeSprites();
 // player.shapeColor="white"
 // player.rotation=180;
}

function draw() {
  background(bg);
  player.collide(a1)
  player.collide(a2)
  player.collide(a3)
  player.collide(a4)

  a3.rotation=90;
  a4.rotation=270;

  drawSprites();
  textSize(28)
 fill("yellow")
  text("WALL HEALTH: "+ whealth+"/100",40,40)
  text("SCORE: "+ score,40,70)
  spawnenemy();
  spawnenemy1();
  
if (score===20){
  gameState=WIN;
  restart.visible=true
  Win.visible=true
  enemyg.destroyEach();
  enemyg1.destroyEach();
  gameover.visible=false;
  player.visible=false;
  winsound.play();
}if (mousePressedOver(restart)){
  reset();
  gameState=PLAY;
}





  if (enemyg.isTouching(a1)||enemyg.isTouching(a2)||enemyg.isTouching(a3)||enemyg.isTouching(a4)){
    
    whealth=whealth-10
    
    
      }
      if (enemyg1.isTouching(a1)||enemyg1.isTouching(a2)||enemyg1.isTouching(a3)||enemyg1.isTouching(a4)){
    
        whealth=whealth-10
        
        
          }

  if (bolg.isTouching(enemyg)){
    enemyg.destroyEach();
    score=score+1
    killsound.play();
    }
    if (bolg.isTouching(enemyg1)){
      enemyg1.destroyEach();
      score=score+1
      killsound.play()
      }
if (whealth===0){
a1.visible=false
a2.visible=false
a3.visible=false
a4.visible=false

}
if (player.isTouching(enemyg)&&whealth<=0){
gameState=END;
gameoversound.play();
}
if (player.isTouching(enemyg1)&&whealth<=0){
  gameState=END;
  gameoversound.play();
  }
  if (keyDown(UP_ARROW)){
   player.y=player.y-2
  player.rotation=0;
  c=1;
}
if (keyDown(DOWN_ARROW)){
  player.y=player.y+2
 player.rotation=180;
 c=2;
}
if (keyDown(LEFT_ARROW)){
  player.x=player.x-2
 player.rotation=270;
 c=3;
}
if (keyDown(RIGHT_ARROW)){
  player.x=player.x+2
player.rotation=90;
  c=4;
}
if (keyWentDown("space")&&c===1){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 shootsound.play();
 bulletg.setSpeedAndDirectionEach(8,270)
 bulletg.remove(bullet)
}
if (keyWentDown("space")&&c===2){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 shootsound.play();
 bulletg.setSpeedAndDirectionEach(8,90)
 bulletg.remove(bullet)
}
if (keyWentDown("space")&&c===3){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 shootsound.play();
 bulletg.setSpeedAndDirectionEach(8,180)
bulletg.remove(bullet)
}
if (keyWentDown("space")&&c===4){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 shootsound.play();
 bulletg.setSpeedAndDirectionEach(8,0)
 bulletg.remove(bullet)
}
if (a1.visible===true&&(enemyg.isTouching(a1)||enemyg.isTouching(a2)||enemyg.isTouching(a3)||enemyg.isTouching(a4))){
enemyg.destroyEach();

}
if (a1.visible===true&&
  (enemyg1.isTouching(a1)||enemyg1.isTouching(a2)||enemyg1.isTouching(a3)||enemyg1.isTouching(a4))){
  enemyg1.destroyEach();
  }
if (gameState===END){
  enemyg.destroyEach();
  enemyg1.destroyEach();
  gameover.visible=true
  restart.visible=true
  player.visible=false
  
}
if (mousePressedOver(restart)){
  reset();
  gameState=PLAY;
}
}

function spawnbullet(){
  
  bullet=createSprite(740,400,8,8)
  bullet.shapeColor="red"
  bullet.x=player.x
  bullet.x=bullet.x+8
  bullet.y=player.y
 // bullet.rotation=player.rotation
  bullet.lifetime=50;
  bulletg.add(bullet)
  bolg.add(bullet)
}

function spawnenemy(){
  if (frameCount%100===0){
    var enemy = createSprite(0,400,30,40)
    enemy.addAnimation("walking",e)
    var rand=Math.round(random(1,4))
    if (rand===1){
      enemy.x=0;
      enemy.y=random(330,480)
      enemy.velocityX=3;
      enemy.rotation=270;
    }
    if (rand===2){
      enemy.x=1200;
      enemy.y=random(330,480)
      enemy.velocityX=-3
      enemy.rotation=90;
    }
    if (rand===3){
      enemy.x=random(680,780);
      enemy.y=0;
      enemy.velocityY=3;
      enemy.rotation=0
    }
    if (rand===4){
      enemy.x=random(680,780);
      enemy.y=800;
      enemy.velocityY=-3
      enemy.rotation=180
    }
    

    enemyg.add(enemy);
  }
}
function spawnenemy1(){
  if (frameCount%150===0){
    var enemy = createSprite(0,400,30,40)
    enemy.addAnimation("walking",e)
    var rand=Math.round(random(1,4))
    if (rand===1){
      enemy.x=0;
      enemy.y=random(330,480)
      enemy.velocityX=3;
      enemy.rotation=270;
    }
    if (rand===2){
      enemy.x=1200;
      enemy.y=random(330,480)
      enemy.velocityX=-3
      enemy.rotation=90;
    }
    if (rand===3){
      enemy.x=random(680,780);
      enemy.y=0;
      enemy.velocityY=3;
      enemy.rotation=0
    }
    if (rand===4){
      enemy.x=random(680,780);
      enemy.y=800;
      enemy.velocityY=-3
      enemy.rotation=180
    }
    

    enemyg1.add(enemy);
  }

}
function reset(){
  gameState=PLAY;
  whealth=100
  score=0;
  player.visible=true;
  Win.visible=false;
  gameover.visible=false
  restart.visible=false;
  a1.visible=true
  a2.visible=true
  a3.visible=true
  a4.visible=true

}
  