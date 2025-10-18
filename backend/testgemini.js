require('dotenv').config();
const { askGemini } = require('./utils/gemini');

(async () => {
  const prompt = "Say hello in a friendly way.";
  const result = await askGemini(prompt);
  console.log("Test Gemini result:", result);
})();
