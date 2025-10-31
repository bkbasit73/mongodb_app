// --------------------------------------------
//  MongoDB + Express + CRUD + Frontend (Bootstrap)
// --------------------------------------------

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Your MongoDB Atlas connection string
const CONNECTION_STRING = "mongodb+srv://dbUser:Canada2541@cluster0.cheqisg.mongodb.net/CPAN212?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(CONNECTION_STRING);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

// Schema & Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  program: { type: String, required: true },
  semester: { type: Number, required: true }
});
const Student = mongoose.model('Student', studentSchema);

// API Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
  connectDB();
});
