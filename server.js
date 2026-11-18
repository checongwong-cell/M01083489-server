require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Serve lesson images
app.use("/images", express.static("Staticfiles"));

// Logger middleware
app.use(function(request, response, next) {
    console.log(
        "Incoming " + request.method + " request to " + request.url
    );
    next();
});

// Native MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db("test");

        console.log("Connected to MongoDB Atlas!");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, "0.0.0.0", function() {
            console.log("App started on port " + PORT);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

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


// Seed lessons into MongoDB
app.post("/seed-lessons", async function(request, response) {
    try {
        const existingLessons = await db.collection("lessons")
            .find({}, { projection: { id: 1 } })
            .toArray();

        const existingIds = existingLessons.map(lesson => lesson.id);

        const newLessons = lessons.filter(
            lesson => !existingIds.includes(lesson.id)
        );

        if (newLessons.length === 0) {
            return response.json({
                message: "All lessons already exist"
            });
        }

        const inserted = await db.collection("lessons")
            .insertMany(newLessons);

        response.json({
            message: "Lessons inserted successfully",
            count: inserted.insertedCount
        });

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Save an order
app.post("/orders", async function(request, response) {
    try {
        const order = {
            ...request.body,
            createdAt: new Date()
        };

        const result = await db.collection("orders").insertOne(order);

        response.status(201).json({
            message: "Order saved successfully",
            order: {
                ...order,
                _id: result.insertedId
            }
        });

    } catch (error) {
        console.error("Order saving error:", error);

        response.status(500).json({
            error: error.message
        });
    }
});

// Get all orders
app.get("/orders", async function(request, response) {
    try {
        const orders = await db.collection("orders")
            .find({})
            .toArray();

        response.json(orders);

    } catch (error) {
        response.status(500).json({
            error: "Failed to fetch orders"
        });
    }
});

// Get all lessons
app.get("/lessons", async function(request, response) {
    try {
        const lessonsFromDB = await db.collection("lessons")
            .find({})
            .toArray();

        response.json(lessonsFromDB.map(lesson => ({
    ...lesson,
    image: lesson.image.replace(
        /^.*\/images\//,
        `${request.protocol}://${request.get("host")}/images/`
    )
})));

    } catch (error) {
        response.status(500).json({
            error: "Failed to fetch lessons"
        });
    }
});

// Update lesson spaces when a lesson is purchased
app.put("/lessons/:id", async function(request, response) {
    try {
        const lessonId = Number(request.params.id);

        const result = await db.collection("lessons").updateOne(
            {
                id: lessonId,
                space: { $gt: 0 }
            },
            {
                $inc: { space: -1 }
            }
        );

        if (result.matchedCount === 0) {
            return response.status(404).json({
                message: "Lesson not found or no spaces available"
            });
        }

        const updatedLesson = await db.collection("lessons")
            .findOne({ id: lessonId });

        response.json({
            message: "Lesson space updated successfully",
            lesson: updatedLesson
        });

    } catch (error) {
        response.status(500).json({
            error: error.message
        });
    }
});

// Handle unknown routes
app.use(function(request, response) {
    response.status(404).send("Page not found!");
});

// Start the server after connecting to MongoDB
connectToMongoDB();
