
var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());

var lessons = [
  {
    id: 1,
    topic: 'Math',
    location: 'Hendon',
    price: 100,
    space: 5,
    image: '/images/math.jpg'
  },
  {
    id: 2,
    topic: 'Science',
    location: 'Colindale',
    price: 80,
    space: 5,
    image: '/images/science.jpg'
  },
  {
    id: 3,
    topic: 'English',
    location: 'Brent Cross',
    price: 90,
    space: 5,
    image: '/images/english.jpg'
  },
  {
    id: 4,
    topic: 'Art',
    location: 'Golders Green',
    price: 70,
    space: 5,
    image: '/images/art.jpg'
  },
  {
    id: 5,
    topic: 'Music',
    location: 'Wembley',
    price: 120,
    space: 5,
    image: '/images/music.jpg'
  },
  {
    id: 6,
    topic: 'Computing',
    location: 'Mill Hill',
    price: 110,
    space: 5,
    image: '/images/computing.jpg'
  },
  {
    id: 7,
    topic: 'Football',
    location: 'Barnet',
    price: 60,
    space: 5,
    image: '/images/football.jpg'
  },
  {
    id: 8,
    topic: 'Swimming',
    location: 'Finchley',
    price: 75,
    space: 5,
    image: '/images/swimming.jpg'
  },
  {
    id: 9,
    topic: 'Drama',
    location: 'Edgware',
    price: 85,
    space: 5,
    image: '/images/drama.jpg'
  },
  {
    id: 10,
    topic: 'Dance',
    location: 'Watford',
    price: 95,
    space: 5,
    image: '/images/dance.jpg'
  }
];

app.get("/", function(request, response) {
  response.json(lessons);
});

app.listen(3000, function() {
  console.log("App started on port 3000");
});
