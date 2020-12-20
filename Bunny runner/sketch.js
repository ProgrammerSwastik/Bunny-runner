var garden, gardenimg, bunny, bunny2, bunnyimg, bunnyimg2, ground, carrotimg, carrotimg2, goldcarrot, cage, cageimg, cageimg2, carrotGroup, goldGroup, cageGroup, cageGroup, text1, text1img, text2, text2img, start1, startimg, instructions, instructionsimg, returnbutton, returnbuttonimg, onion, onionimg, gameover, gameover1, refresh, refreshimg, exit, exitimg;

var score=0;
var life=2;

var Start=3;
var Inst=4;
var Play=5;
var End=6;
var gameState=Start;

function preload(){
  gardenimg = loadAnimation("background.png");
  bunnyimg = loadAnimation("bunny1.png", "bunny2.png");
  carrotimg = loadAnimation("carrot.png");
  carrotimg2 = loadAnimation("gold carrot.png");
  cageimg = loadAnimation("cage.png");
  onionimg = loadAnimation("onion.png")
  startimg = loadAnimation("start.png");
  text1img = loadAnimation("text.png");
  text2img = loadAnimation("text-1.png");
  instructionsimg = loadAnimation("instructions.png");
  returnbuttonimg = loadAnimation("return.png");
  over = loadAnimation("over.png");
  over1 = loadAnimation("cage2.png");
  refreshimg = loadAnimation("refresh.png");
  exitimg = loadAnimation("exit.png");
  carrotGroup = new Group();
  cageGroup = new Group();
  goldGroup = new Group();
  onionGroup = new Group();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  garden = createSprite(width/2+1300, height/2, 20, 20);
  garden.addAnimation("background", gardenimg);
  garden.scale=2;
  garden.velocityX=-5;
  
  bunny = createSprite(100, height-100, 20, 20);
  bunny.addAnimation("bunny1", bunnyimg);
  bunny.setCollider("rectangle", 0, 10, 50, 60)
  
  ground = createSprite(width/2, height-70, width, 2);
  ground.visible=false;
  
  start1 = createSprite(width/2, height-50, 20, 20);
  start1.addAnimation("start", startimg);
  start1.visible=false;
  
  text1 = createSprite(width/2, 150, 100, 100);
  text1.addAnimation("text", text1img);
  text1.visible=false;
  
  text2 = createSprite(width/2, 200, 100, 100);
  text2.addAnimation("text", text2img);
  text2.visible=false;
  
  instructions = createSprite(width/2, height-150, 20, 20);
  instructions.addAnimation("instr", instructionsimg);
  instructions.scale=0.3;
  instructions.visible=false
  
  returnbutton = createSprite(width-100, height-50, 20, 20);
  returnbutton.addAnimation("return", returnbuttonimg);
  returnbutton.scale=0.5;
  returnbutton.visible=false;
  
  gameover = createSprite(width/2, 100, 20, 20);
  gameover.addAnimation("game", over);
  gameover.visible=false;
  
  gameover1 = createSprite(width/2, 250, 20, 20);
  gameover1.addAnimation("game", over1);
  gameover1.visible=false;
  
  refresh = createSprite(100, height-100, 20, 20);
  refresh.addAnimation("game", refreshimg);
  refresh.visible=false;
  refresh.scale=0.6;
  refresh.setCollider("circle", 0, 0,  70);
  
  exit = createSprite(width-100, height-100, 20, 20);
  exit.addAnimation("game", exitimg);
  exit.visible=false;
}

function draw() {
 background("black");
 bunny.velocityY=bunny.velocityY+0.8;
 bunny.collide(ground);
  
  if(gameState===Start){
    
    start1.visible=true;
    text1.visible=true;
    instructions.visible=true;
    bunny.visible=false;
    garden.visible=false;
    
    if(mousePressedOver(instructions)){
      gameState=Inst;
    }
    
    if(mousePressedOver(start1)){
      gameState=Play
    }
  }
  
  
  
  if(gameState===Inst){
    text1.visible=false
    text2.visible=true;
    bunny.visible=false;
    garden.visible=false;
    instructions.visible=false;
    returnbutton.visible=true;
    
    if(mousePressedOver(returnbutton)){
      gameState=Start;
      start1.visible=true;
      text1.visible=true;
      text2.visible=false;
      returnbutton.visible=false;
      instructions.visible=true;
      bunny.visible=false;
      garden.visible=false;
    }
    
    if(mousePressedOver(start1)){
      gameState=Play;
      text2.visible=false;
      returnbutton.visible=false;
    }
  }
  
  
  
  if(gameState===Play){
    
    start1.visible=false;
    text1.visible=false;
    instructions.visible=false;
    bunny.visible=true;
    garden.visible=true;
    
    if(garden.x<=-500){
    garden.x=width/2;
  }
  
  if(keyDown("space")&&bunny.y>=410){
    bunny.velocityY=-22;
  }
  
  if(bunny.isTouching(carrotGroup)){
    score=score+1;
    carrotGroup.destroyEach();
  }
    
  if(bunny.isTouching(goldGroup)){
    score=score+2;
    goldGroup.destroyEach();
  }
  
  if(bunny.isTouching(cageGroup)){
    life=life-1;
    cageGroup.destroyEach();
  }

    if(bunny.isTouching(onionGroup)){
    life=life-1;
    onionGroup.destroyEach();
  }
  
  if(frameCount%150===0){
    carrot();
  }
    
    if(frameCount%850===0){
      goldCarrot();
    }
    
    if(frameCount%250===0){
      cage();
    }
    
    if(frameCount%350===0){
      onionG();
    }
    
    if(life===-1){
      gameState=End
    }
    
  }
  
  if(gameState===End){
    gameover.visible=true;
    gameover1.visible=true;
    refresh.visible=true;
    exit.visible=true;
    bunny.visible=false;
    garden.visible=false;
    cageGroup.destroyEach();
    onionGroup.destroyEach();
    carrotGroup.destroyEach();
    goldGroup.destroyEach();
    if(mousePressedOver(refresh)){
      gameState=Play;
      gameover.visible=false;
    gameover1.visible=false;
    refresh.visible=false;
    exit.visible=false;
      life=2;
      score=0;
    }
    if(mousePressedOver(exit)){
      gameState=Start;
      gameover.visible=false;
    gameover1.visible=false;
    refresh.visible=false;
    exit.visible=false;
      life=2;
      score=0;
    }
  }

  drawSprites();
  fill("black")
  textSize(20)
  text("Score: "+score, width-100, 20);
  text("Remaining Life: "+life, 5, 20)
}

function carrot(){
  var carrot = createSprite(width, height/2, 20, 20);
  carrot.addAnimation("carrot", carrotimg);
  carrot.y=Math.round(random(70, height-200));
  carrot.velocityX=-9;
  carrot.lifeTime=100;
  carrotGroup.add(carrot);
 }

function cage(){
  
    var cage = createSprite(width, height-110, 20, 20);
  cage.addAnimation("cage", cageimg);
  cage.scale=0.5;
  cage.velocityX=-7;
  cage.lifetme=100;
  cageGroup.add(cage);
}
function goldCarrot(){
  goldcarrot = createSprite(width, height/2, 20, 20);
  goldcarrot.addAnimation("carret2", carrotimg2);
  goldcarrot.velocityX=-12;
  goldcarrot.y=Math.round(random(70, height-200));
  goldcarrot.lifeTime=100;
  goldGroup.add(goldcarrot);
}

function onionG(){
  onion = createSprite(width, height/2, 20, 20);
  onion.addAnimation("onion1", onionimg);
  onion.scale=0.1;
  onion.y=Math.round(random(70, height-200));
  onion.velocityX=-4;
  onion.lifeTime=200;
  onionGroup.add(onion);
}