//Create variables here
var dog,hdog,doging ; 
var db;
var foods ,foodStock;
var fedTime, lastFeed;
var feed,addFood ;
var foodObj;


function preload() {
  dogimg = loadImage("images/dogImg1.png");
  hdog = loadImage("images/dog1.png")
}


function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();

  db = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogimg);
  dog.scale = 0.2

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(700, 30);
  addFood.mousePressed(addFoodItems);

foodStock = db.ref('Food');
foodStock.on("value", readFood);
}

function draw() {  
background(255)

foodObj.display(); 

fedTime = db.ref('fedTime');
fedTime.on('value',function(data){
  lastFeed = data.val();
})


if (lastFeed>=12) {
  text("last Feed : "+ lastFeed % 12 + "PM",350,30);
} else if(lastFeed == 0){
  text("Last Feed : 12 AM",350,30);
} else{
  text("Last Feed : " + lastFeed + "AM",350,30)
}

drawSprites();
}

function readFood(data) {
  foods = data.val();
  foodObj.updateFoodStock(foods)
}

//function to update food stock and last fed time
function feedDog() {
  hdog = loadImage("images/dog1.png")

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food: foodObj.getFoodStock(),
    fedTime: hour()
  });
}

function addFoodItems(){
  foods++
  db.ref('/').update({
    Food:foods
  })
}

