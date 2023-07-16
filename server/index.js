const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getCompliment, getFortune } = require("./controller");

app.get("/api/fortune", getFortune);
app.get("/api/compliment", getCompliment);

const moodEntries = [];
let nextMoodEntryId = 1; 

app.get("/api/moodEntries", (req, res) => {
  res.status(200).json(moodEntries);
});

app.post("/api/mood", (req, res) => {
  const { mood, timestamp } = req.body;

  const moodEntry = {
    id: nextMoodEntryId++, // Generate and assign the ID
    mood,
    timestamp,
  };

  moodEntries.push(moodEntry);
  console.log("New mood entry ID:", moodEntry.id);
  
  res.status(200).json(moodEntry);
});

app.put("/api/mood/:id", (req, res) => {
  const moodEntryId = req.params.id;
  const moodEntryToUpdate = moodEntries.find((entry) => entry.id === parseInt(moodEntryId));

  if (!moodEntryToUpdate) {
    return res.status(404).json({ error: "Mood entry not found" });
  }

  const { mood, timestamp } = req.body;
  moodEntryToUpdate.mood = mood;
  moodEntryToUpdate.timestamp = timestamp;

  res.status(200).json({ message: "Mood entry updated successfully" });
});

app.delete("/api/mood/:id", (req, res) => {
    const moodEntryId = req.params.id;
    const moodEntryIndex = moodEntries.findIndex((entry) => entry.id === parseInt(moodEntryId));
  
    console.log("Mood Entry ID:", moodEntryId);
    console.log("Mood Entry Index:", moodEntryIndex);
    console.log("Mood Entries (Before):", moodEntries);
  
    if (moodEntryIndex === -1) {
      console.log("Mood Entry not found");
      return res.status(404).json({ error: "Mood entry not found" });
    }
  
    moodEntries.splice(moodEntryIndex, 1);
  
    console.log("Mood Entries (After):", moodEntries);
  
    res.status(200).json({ message: "Mood entry deleted successfully" });
  });
  
  
  
  

app.listen(4000, () => console.log("Server running on port 4000"));
