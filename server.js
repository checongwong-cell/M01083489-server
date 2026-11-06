require("dotenv").config();
var mongoose = require("mongoose");
var Lesson = require("./models/lesson");
var Order = require("./models/order");

var express = require("express");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
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

app.post("/seed-lessons", async function(request, response) {
    try {
        const existingLessons = await Lesson.find({}, { id: 1 });
        const existingIds = existingLessons.map(lesson => lesson.id);

        const newLessons = lessons.filter(
            lesson => !existingIds.includes(lesson.id)
        );

        if (newLessons.length === 0) {
            return response.json({ message: "All lessons already exist" });
        }

        const inserted = await Lesson.insertMany(newLessons);

        response.json({
            message: "Lessons inserted successfully",
            count: inserted.length
        });

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

app.post("/orders", async function(request, response) {
    try {
        const order = new Order(request.body);
        await order.save();

        console.log("New order saved:", order);

        response.status(201).json({
            message: "Order saved successfully",
            order: order
        });
    } catch (error) {
        console.error("Order saving error:", error);
        response.status(500).json({
            error: error.message
        });
    }
});

app.get("/lessons", async function(request, response) {
    try {
        const lessonsFromDB = await Lesson.find({});
        response.json(lessonsFromDB);
    } catch (error) {
        response.status(500).json({ error: "Failed to fetch lessons" });
    }
});

app.use(function(request, response) {
    response.status(404).send("Page not found!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', function() {
    console.log(`App started on port ${PORT}`);
});
