const express = require("express");
const { default: mongoose } = require("mongoose");
const connectDB = require("./db");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

const pack = new mongoose.Schema({
    destination: String,
    image: String,
    start: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    stayingPlace: String,
    numberOfPacks: Number
})

const news = new mongoose.Schema({
    title: String,
    image: String,
    createdAt: Date
})

const PacksModel = mongoose.model('packs', pack)
const NewsModel = mongoose.model('news', news)

app.use(bodyParser.json())

app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002'] }));

// Set up routes
app.get("/news", async (req, res) => {
    try {
        const document = await NewsModel.find()
        res.send(document)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
});

app.get("/news/:id", async (req, res) => {
    try {
        const document = await NewsModel.findById(req.params.id)
        if (!document) {
            return res.status(404).send({message: 'Not found!'})
        }
        res.send(document)
    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }
})

app.delete("/news/:id", async (req, res) => {
    try {
        const document = await NewsModel.findByIdAndDelete(req.params.id)
        console.log(req.params.id);
        if (!document) {
            return res.status(404).send({message: 'Not found!'})
        }
        res.send({message: "Document deleted successfully"})
    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }
})

app.put('/news/:id', async (req, res) => {
    try {
      console.log(req.params.id);
      const document = await NewsModel.findByIdAndUpdate(req.params.id, req.body); // Find and update the document with the specified ID
      if (!document) {
        return res.status(404).send({ message: 'Document not found' });
      }
      console.log(document);
      res.send(document);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/news', async (req, res) => {
    try {
      const document = new NewsModel(req.body); // Create a new document based on the request body
      await document.save(); // Save the document to the database
      res.send(document);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

app.get("/packs", async (req, res) => {
    try {
        const document = await PacksModel.find()
        res.send(document)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
});

app.get("/packs/:id", async (req, res) => {
    try {
        const document = await PacksModel.findById(req.params.id)
        if (!document) {
            return res.status(404).send({message: 'Not found!'})
        }
        res.send(document)
    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }
})

app.delete("/packs/:id", async (req, res) => {
    try {
        const document = await PacksModel.findByIdAndDelete(req.params.id)
        if (!document) {
            return res.status(404).send({message: 'Not found!'})
        }
        res.send({message: "Document deleted successfully"})
    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }
})

app.put('/packs/:id', async (req, res) => {
    try {
      const document = await PacksModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find and update the document with the specified ID
      if (!document) {
        return res.status(404).send({ message: 'Document not found' });
      }
      res.send(document);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/packs', async (req, res) => {
    try {
      const document = new PacksModel(req.body); // Create a new document based on the request body
      res.send(document);
      await document.save(); // Save the document to the database
      console.log(document)
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});