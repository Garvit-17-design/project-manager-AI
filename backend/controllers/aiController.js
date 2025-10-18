// backend/controllers/aiController.js
const { askGemini } =require ("../utils/gemini");

const summarizeTasks = async (req, res) => {
  const { tasks } = req.body;

  if (!tasks || !tasks.length) {
    return res.status(400).json({ error: "No tasks provided." });
  }

  const taskList = tasks.map(
    (task, i) => `${i + 1}. ${task.title} - ${task.description} [${task.status}]`
  ).join("\n");

  const prompt = `Summarize the following project tasks:\n\n${taskList}`;

  const aiResponse = await askGemini(prompt);
  res.json({ summary: aiResponse });
};


const askAboutTasks = async (req, res) => {
  const { tasks, question } = req.body;

  if (!tasks || !question) {
    return res.status(400).json({ error: "Tasks and question are required." });
  }

  const taskList = tasks.map(
    (task, i) => `${i + 1}. ${task.title} - ${task.description} [${task.status}]`
  ).join("\n");

  const prompt = `Here are the project tasks:\n\n${taskList}\n\nNow answer this question:\n${question}`;

  const aiResponse = await askGemini(prompt);
  res.json({ answer: aiResponse });
};

module.exports = {
  summarizeTasks,
  askAboutTasks,
};