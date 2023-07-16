module.exports = {
    getCompliment: (req, res) => {
      const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your JavaScript skills are stellar."];
  
      // choose random compliment
      const randomIndex = Math.floor(Math.random() * compliments.length);
      const randomCompliment = compliments[randomIndex];
  
      res.status(200).send(randomCompliment);
    },
  
    getFortune: (req, res) => {
      const fortunes = [
        "Be grateful for what you have because it can all get taken away.",
        "Be careful these next few days.",
        "You are about to receive a lot of money.",
        "Expect a surprise soon.",
        "Your love life is about to change."
      ];
  
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      const randomFortune = fortunes[randomIndex];
  
      res.status(200).json({ fortune: randomFortune });
    }
  };
  