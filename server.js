
var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());

app.use(express.json());

app.use("/images", express.static("Staticfiles"));

app.use(function(request, response, next) {
    console.log("Incoming " + request.method + " request to " + request.url);
    next();
});

var lessons = [
  {
    id: 1,
    topic: 'Math',
    location: 'Hendon',
    price: 100,
    space: 5,
    image: 'http://localhost:3000/images/math.jpg'
  },
  {
    id: 2,
    topic: 'Science',
    location: 'Colindale',
    price: 80,
    space: 5,
    image: 'http://localhost:3000/images/science.jpg'
  },
  {
    id: 3,
    topic: 'English',
    location: 'Brent Cross',
    price: 90,
    space: 5,
    image: 'http://localhost:3000/images/english.jpg'
  },
  {
    id: 4,
    topic: 'Art',
    location: 'Golders Green',
    price: 70,
    space: 5,
    image: 'http://localhost:3000/images/art.jpg'
  },
  {
    id: 5,
    topic: 'Music',
    location: 'Wembley',
    price: 120,
    space: 5,
    image: 'http://localhost:3000/images/music.jpg'
  },
  {
    id: 6,
    topic: 'Computing',
    location: 'Mill Hill',
    price: 110,
    space: 5,
    image: 'http://localhost:3000/images/computing.jpg'
  },
  {
    id: 7,
    topic: 'Football',
    location: 'Barnet',
    price: 60,
    space: 5,
    image: 'http://localhost:3000/images/football.jpg'
  },
  {
    id: 8,
    topic: 'Swimming',
    location: 'Finchley',
    price: 75,
    space: 5,
    image: 'http://localhost:3000/images/swimming.jpg'
  },
  {
    id: 9,
    topic: 'Drama',
    location: 'Edgware',
    price: 85,
    space: 5,
    image: 'http://localhost:3000/images/drama.jpg'
  },
  {
    id: 10,
    topic: 'Dance',
    location: 'Watford',
    price: 95,
    space: 5,
    image: 'http://localhost:3000/images/dance.jpg'
  }
];

app.post("/orders", function(request, response) {
    const order = request.body;

    console.log("New order received:");
    console.log(order);

    response.json("Order received successfully");
});

app.get("/lessons", function(request, response) {
    response.json(lessons);
});

app.use(function(request, response) {
    response.status(404).send("Page not found!");
});

app.listen(3000, function() {
  console.log("App started on port 3000");
});
