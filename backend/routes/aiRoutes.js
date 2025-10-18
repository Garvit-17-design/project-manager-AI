const express=require("express");
const { summarizeTasks, askAboutTasks } =require("../controllers/aiController");

const router = express.Router();

router.post("/summarize", summarizeTasks);
router.post("/ask", askAboutTasks);

module.exports = router;
