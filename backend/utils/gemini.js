const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/text-bison-001" });

    const response = await model.generateContent({
      prompt: { text: prompt },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);
    return "AI is currently unavailable.";
  }
};
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

module.exports = { askGemini };
