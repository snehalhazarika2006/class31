const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var bunny;
var button;

function preload(){
  bgImg = loadImage("background.png");
  bunnyImg = loadImage("Rabbit-01.png");
  food = loadImage("melon.png");
  butto
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,690,600,20);
  rope = new Rope(6, {x : 250, y : 40});
  bunny = createSprite(200,620,100,100);
  bunny.addImage(bunnyImg);
  bunny.scale = 0.2;

  button = createImg("cut_button.png");
  button.position(200, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);

  var fruitOptions = {
    density : 0.001
  }

  fruit = Bodies.circle(300, 300, 15, fruitOptions);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope, fruit);
  
}

function draw() {
  Engine.update(engine);
  background(51);
  image(bgImg,width/2,height/2,500,690);
  ground.show();
  rope.show();

  image(food,fruit.position.x, fruit.position.y, 60, 60);
  drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}