const complimentButton = document.getElementById("complimentButton");
const fortuneButton = document.getElementById("fortuneButton");
const saveMoodButton = document.getElementById("saveMoodButton");
const editMoodButton = document.getElementById("editMoodButton");
const deleteMoodButton = document.getElementById("deleteMoodButton");

complimentButton.addEventListener("click", getCompliment);
fortuneButton.addEventListener("click", getFortune);
saveMoodButton.addEventListener("click", saveMoodEntry);
editMoodButton.addEventListener("click", editMoodEntry);
deleteMoodButton.addEventListener("click", deleteMoodEntry);

function getCompliment() {
  axios
    .get("http://localhost:4000/api/compliment")
    .then((res) => {
      const data = res.data;
      alert(data);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function getFortune() {
  axios
    .get("http://localhost:4000/api/fortune")
    .then((res) => {
      const fortune = res.data.fortune;
      displayFortune(fortune);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function saveMoodEntry() {
  const moodDropdown = document.getElementById("moodDropdown");
  const selectedMood = moodDropdown.value;
  const timestamp = new Date().toISOString();

  const moodEntry = {
    mood: selectedMood,
    timestamp: timestamp,
  };

  axios
    .post("http://localhost:4000/api/mood", moodEntry)
    .then((res) => {
      console.log("Mood entry has been saved:", res.data);
      // Retrieve the updated mood entries after saving
      getMoodEntries();
    })
    .catch((error) => {
      console.error("Error saving mood entry:", error);
    });
}

function editMoodEntry() {
  const moodDropdown = document.getElementById("moodDropdown");
  const selectedMood = moodDropdown.value;
  const timestamp = new Date().toISOString();

  const moodEntryToUpdate = moodEntries.find((entry) => entry.mood === selectedMood);

  if (!moodEntryToUpdate) {
    console.error("Mood entry not found");
    return;
  }

  const updatedMoodEntry = {
    ...moodEntryToUpdate,
    timestamp: timestamp,
  };

  axios
    .put(`http://localhost:4000/api/mood/${moodEntryToUpdate.id}`, updatedMoodEntry)
    .then((res) => {
      console.log("Mood entry has been updated:", res.data);
      // Retrieve the updated mood entries after editing
      getMoodEntries();
    })
    .catch((error) => {
      console.error("Error updating mood entry:", error);
    });
}

function deleteMoodEntry() {
    const moodDropdown = document.getElementById("moodDropdown");
    const selectedMoodId = moodDropdown.options[moodDropdown.selectedIndex].id;
    console.log("Selected Mood ID:", selectedMoodId);
    
    axios
      .delete(`http://localhost:4000/api/mood/${selectedMoodId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Mood entry has been deleted successfully");
        } else {
          console.log("Unexpected response from the server:", res);
        }
      })
      .catch((error) => {
        console.error("Error deleting mood entry:", error);
      });
  }
  

function displayFortune(fortune) {
  const fortuneContainer = document.createElement("div");
  fortuneContainer.textContent = fortune;
  document.body.appendChild(fortuneContainer);
}

function getMoodEntries() {
  axios
    .get("http://localhost:4000/api/moodEntries")
    .then((res) => {
      moodEntries = res.data;
    })
    .catch((error) => {
      console.error("Error retrieving mood entries:", error);
    });
}


getMoodEntries();
