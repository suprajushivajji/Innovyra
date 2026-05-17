import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateCareerPlan(goal: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are an expert career advisor and tech roadmap planner. Always respond with strict JSON.",
  });

  const prompt = `
Generate a detailed career execution plan for someone who wants to achieve this goal: "${goal}".
Return ONLY a valid JSON object matching this structure:
{
  "career_goal": "Refined title",
  "market_insights": {
    "trending_skills": ["skill1", "skill2"],
    "salary_range": "e.g. $80k - $120k",
    "industry_growth": "Quick insight",
    "top_tools": ["tool1", "tool2"]
  },
  "roadmap": [
    {
      "phase": "Phase Name",
      "duration": "e.g. 1 month",
      "topics": ["topic1", "topic2"]
    }
  ],
  "daily_tasks": [
    { "title": "Task title", "status": "To Learn" }
  ],
  "projects": [
    {
      "title": "Project Idea",
      "difficulty": "Beginner/Intermediate/Advanced",
      "estimated_time": "time",
      "tech_stack": ["tech1"],
      "learning_outcomes": ["outcome1"]
    }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // Parse the JSON. Clean up markdown formatting if Gemini wrapped it in ```json
    const cleanText = text.replace(/```json\n?|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini generation failed:", error);
    throw error;
  }
}
