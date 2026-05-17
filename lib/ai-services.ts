import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Domain-specific tech stack and skill definitions
const DOMAIN_SPECS: Record<string, any> = {
  "Generative AI": {
    coreSkills: ["LLMs", "Prompt Engineering", "RAG", "Vector Databases", "Fine-tuning"],
    mainTools: ["LangChain", "LLaMA", "GPT", "Claude", "Anthropic", "OpenAI API", "HuggingFace"],
    relatedFields: ["LLM Orchestration", "AI Agents", "Chain-of-Thought", "Multi-Agent Systems"],
    salaryRange: { min: 130000, max: 200000, level: "Mid-Level" },
    marketGrowth: "35% YoY - Highest growth in AI sector",
    focusAreas: ["Large Language Models", "Prompt Engineering", "RAG Systems", "AI Agents", "LangChain/LlamaIndex", "Vector DBs (Pinecone, Weaviate)", "Fine-tuning techniques"]
  },
  "Machine Learning": {
    coreSkills: ["Python", "NumPy", "Pandas", "Scikit-learn", "Deep Learning"],
    mainTools: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Jupyter"],
    relatedFields: ["Feature Engineering", "Model Tuning", "Regression", "Classification", "Neural Networks"],
    salaryRange: { min: 120000, max: 180000, level: "Mid-Level" },
    marketGrowth: "18% YoY - Steady growth",
    focusAreas: ["ML Fundamentals", "Deep Learning", "Feature Engineering", "Model Optimization", "TensorFlow/PyTorch", "Computer Vision", "NLP"]
  },
  "Data Engineering": {
    coreSkills: ["SQL", "ETL", "Data Warehousing", "Spark", "Kafka"],
    mainTools: ["Apache Spark", "Kafka", "Airflow", "BigQuery", "Snowflake", "DBT", "Postgres"],
    relatedFields: ["Data Pipelines", "Real-time Processing", "Data Lakes", "Streaming", "Batch Processing"],
    salaryRange: { min: 130000, max: 190000, level: "Mid-Level" },
    marketGrowth: "22% YoY - Rapid adoption",
    focusAreas: ["ETL/ELT Pipelines", "Apache Spark", "Kafka Streaming", "Data Warehousing", "SQL Optimization", "Airflow Orchestration", "Cloud Data Platforms"]
  },
  "Cloud AI": {
    coreSkills: ["Kubernetes", "Docker", "MLOps", "AWS/Azure/GCP", "CI/CD"],
    mainTools: ["Kubernetes", "Docker", "AWS SageMaker", "Azure ML", "GCP Vertex AI", "GitLab CI"],
    relatedFields: ["DevOps", "Infrastructure-as-Code", "Model Deployment", "Scaling", "Monitoring"],
    salaryRange: { min: 140000, max: 210000, level: "Mid-Level" },
    marketGrowth: "28% YoY - Critical infrastructure skill",
    focusAreas: ["Containerization (Docker)", "Kubernetes Orchestration", "Cloud ML Platforms", "CI/CD Pipelines", "MLOps Frameworks", "Infrastructure-as-Code", "Model Monitoring"]
  }
};

async function callGeminiAPI(userPrompt: string, systemPrompt: string = ""): Promise<string> {
  const systemInstruction = systemPrompt || "You are an expert career advisor, tech recruiter, and roadmap strategist specializing in creating highly personalized, domain-specific career execution systems. Always respond with ONLY valid JSON, no markdown formatting, no code fences, no explanations.";

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstruction,
  });

  const result = await model.generateContent(userPrompt);
  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  return text;
}

function cleanJsonResponse(text: string): string {
  try {
    text = text.replace(/```json\n?|```/g, "").trim();
    text = text.trim();
    const startIdx = text.indexOf('{');
    const endIdx = text.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      text = text.substring(startIdx, endIdx + 1);
    }
    JSON.parse(text);
    return text;
  } catch (e) {
    throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
  }
}

export async function generateCareerResearch(
  goal: string,
  timeline: string = "6 months",
  skillLevel: string = "Beginner",
  domain: string = "Technology",
  weeklyHours: number = 20
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];
  
  const prompt = `You are a ${domain} career research specialist. Create a comprehensive market research analysis for this goal: "${goal}"

CONTEXT:
- Domain: ${domain}
- Timeline: ${timeline}
- Skill Level: ${skillLevel}
- Weekly Study Hours: ${weeklyHours}
- Core Skills in ${domain}: ${domainSpec.coreSkills.join(", ")}
- Key Tools: ${domainSpec.mainTools.join(", ")}
- Market Growth: ${domainSpec.marketGrowth}

IMPORTANT: Generate content that is COMPLETELY SPECIFIC to ${domain}. Do NOT generate generic AI/ML content.

Generate ONLY this JSON (no markdown, no explanation):
{
  "trending_skills": ["5 skills specific to ${domain}"],
  "secondary_skills": ["3 secondary skills for ${domain}"],
  "salary_insights": {
    "min": ${domainSpec.salaryRange.min},
    "max": ${domainSpec.salaryRange.max},
    "currency": "USD",
    "level": "${domainSpec.salaryRange.level}"
  },
  "salary_range": "$${Math.round(domainSpec.salaryRange.min/1000)}K - $${Math.round(domainSpec.salaryRange.max/1000)}K",
  "hiring_trends": "3-4 sentences about ${domain} market trends, demand, and growth. Be specific to ${domain} technologies.",
  "top_tools": ${JSON.stringify(domainSpec.mainTools)},
  "industry_growth": "${domainSpec.marketGrowth}",
  "market_demand": "Very High",
  "domain_insights": "2-3 sentences about unique opportunities in ${domain}",
  "skill_progression": {
    "immediate": "Must learn in first month for ${skillLevel}",
    "intermediate": "Critical skills for months 2-3",
    "advanced": "Specialization areas for later months"
  }
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Research generation error:", error);
    // Return domain-specific fallback
    return {
      trending_skills: domainSpec.coreSkills,
      secondary_skills: domainSpec.relatedFields.slice(0, 3),
      salary_insights: domainSpec.salaryRange,
      salary_range: `$${Math.round(domainSpec.salaryRange.min/1000)}K - $${Math.round(domainSpec.salaryRange.max/1000)}K`,
      hiring_trends: `${domain} professionals are in high demand. ${domainSpec.marketGrowth}. Key skills include ${domainSpec.coreSkills.join(", ")}.`,
      top_tools: domainSpec.mainTools,
      industry_growth: domainSpec.marketGrowth,
      market_demand: "Very High",
      domain_insights: `${domain} offers excellent career opportunities with focus on ${domainSpec.focusAreas.slice(0, 3).join(", ")}.`,
      skill_progression: {
        immediate: domainSpec.coreSkills[0],
        intermediate: domainSpec.coreSkills.slice(1, 3).join(", "),
        advanced: domainSpec.relatedFields.slice(0, 2).join(", ")
      }
    };
  }
}

export async function generateCareerRoadmap(
  goal: string,
  timeline: string = "6 months",
  skillLevel: string = "Beginner",
  domain: string = "Technology",
  weeklyHours: number = 20
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];
  const timelineMonths = parseInt(timeline.split(" ")[0]) || 6;
  const phaseCount = timelineMonths <= 3 ? 2 : timelineMonths <= 6 ? 3 : 4;

  const prompt = `You are a ${domain} learning architect. Create a detailed learning roadmap for: "${goal}"

PARAMETERS:
- Domain: ${domain} (focus areas: ${domainSpec.focusAreas.join(", ")})
- Timeline: ${timeline}
- Skill Level: ${skillLevel}
- Weekly Hours: ${weeklyHours}
- Number of Phases: ${phaseCount}

IMPORTANT: Every phase, topic, tool, and milestone MUST be specific to ${domain}. Do NOT include generic content.

Generate ONLY this JSON (NO markdown):
{
  "phases": [
    {
      "name": "Phase name specific to ${domain}",
      "duration": "week/month duration",
      "order": 1,
      "topics": ["topic1", "topic2", "topic3", "topic4"],
      "focus_tools": ["tool1", "tool2"],
      "milestones": ["concrete achievement 1", "concrete achievement 2"],
      "key_outcome": "what learner can build/do after this phase",
      "difficulty_level": "Beginner|Intermediate|Advanced"
    }
  ],
  "total_duration": "${timeline}",
  "estimated_hours": ${weeklyHours * timelineMonths * 4},
  "domain_focus": "${domain}",
  "learning_intensity": "${weeklyHours >= 30 ? 'High' : weeklyHours >= 15 ? 'Medium' : 'Low'}"
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Roadmap generation error:", error);
    // Domain-specific fallback
    return {
      phases: [
        {
          name: `${domain} Foundations`,
          duration: "Month 1",
          order: 1,
          topics: domainSpec.coreSkills.slice(0, 3),
          focus_tools: domainSpec.mainTools.slice(0, 2),
          milestones: [`Understand core ${domain} concepts`, `Set up ${domainSpec.mainTools[0]} environment`],
          key_outcome: `Basic understanding of ${domain}`,
          difficulty_level: skillLevel
        },
        {
          name: `Advanced ${domain}`,
          duration: "Month 2-3",
          order: 2,
          topics: domainSpec.relatedFields.slice(0, 3),
          focus_tools: domainSpec.mainTools.slice(2, 4),
          milestones: [`Build first ${domain} project`, `Master ${domainSpec.mainTools[1]}`],
          key_outcome: `Intermediate ${domain} skills`,
          difficulty_level: "Intermediate"
        }
      ],
      total_duration: timeline,
      estimated_hours: weeklyHours * timelineMonths * 4,
      domain_focus: domain,
      learning_intensity: weeklyHours >= 30 ? 'High' : weeklyHours >= 15 ? 'Medium' : 'Low'
    };
  }
}

export async function generateTaskPlan(
  goal: string,
  phase: string = "Foundation",
  domain: string = "Technology",
  weeklyHours: number = 20,
  skillLevel: string = "Beginner"
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];
  const tasksPerWeek = weeklyHours >= 30 ? 12 : weeklyHours >= 15 ? 8 : 4;

  const prompt = `You are a ${domain} task planning expert. Create weekly tasks for: "${goal}" in the "${phase}" phase.

CONTEXT:
- Domain: ${domain}
- Phase: ${phase}
- Skill Level: ${skillLevel}
- Weekly Hours: ${weeklyHours}
- Tasks to generate: ${tasksPerWeek}
- Core tools: ${domainSpec.mainTools.join(", ")}
- Core skills: ${domainSpec.coreSkills.join(", ")}

IMPORTANT: ALL tasks must be specific to ${domain}. Do NOT generate generic Python/ML tasks unless ${domain} is Machine Learning.

Generate ONLY this JSON:
{
  "tasks": [
    {
      "title": "specific task for ${domain}",
      "description": "what to build, learn, or implement",
      "category": "Learning|Practice|Project|Review",
      "domain_specific_tools": ["tool1", "tool2"],
      "priority": "High|Medium|Low",
      "estimated_hours": 2,
      "order": 1,
      "outcome": "what you can do after completing this"
    }
  ],
  "total_tasks": ${tasksPerWeek},
  "domain": "${domain}",
  "weekly_structure": "How to distribute tasks across the week"
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Task plan generation error:", error);
    // Domain-specific fallback
    return {
      tasks: [
        {
          title: `Study ${domainSpec.coreSkills[0]} concepts`,
          description: `Learn the fundamentals of ${domainSpec.coreSkills[0]} for ${domain}`,
          category: "Learning",
          domain_specific_tools: [domainSpec.mainTools[0]],
          priority: "High",
          estimated_hours: 4,
          order: 1,
          outcome: `Solid grasp of ${domainSpec.coreSkills[0]}`
        },
        {
          title: `Practice with ${domainSpec.mainTools[0]}`,
          description: `Hands-on practice building a small ${domain} script`,
          category: "Practice",
          domain_specific_tools: [domainSpec.mainTools[0]],
          priority: "High",
          estimated_hours: 6,
          order: 2,
          outcome: `Familiarity with ${domainSpec.mainTools[0]}`
        },
        {
          title: `Explore ${domainSpec.relatedFields[0]}`,
          description: `Read about how ${domainSpec.relatedFields[0]} connects to ${domain}`,
          category: "Review",
          domain_specific_tools: [],
          priority: "Medium",
          estimated_hours: 2,
          order: 3,
          outcome: `Broader context of ${domain}`
        }
      ].slice(0, tasksPerWeek),
      total_tasks: Math.min(3, tasksPerWeek),
      domain: domain,
      weekly_structure: `Focus heavily on ${domainSpec.coreSkills[0]} early in the week.`
    };
  }
}

export async function generatePortfolioProjects(
  goal: string,
  skillLevel: string = "Beginner",
  domain: string = "Technology",
  weeklyHours: number = 20
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];

  const prompt = `You are a ${domain} portfolio expert. Design 3 portfolio projects that showcase expertise in ${domain}.

PROJECT CONTEXT:
- Domain: ${domain}
- Skill Level: ${skillLevel}
- Key Technologies: ${domainSpec.mainTools.join(", ")}
- Core Skills: ${domainSpec.coreSkills.join(", ")}

IMPORTANT: Projects must be UNIQUE to ${domain}. Do NOT suggest generic projects.

Generate ONLY this JSON:
{
  "projects": [
    {
      "title": "Domain-specific project name for ${domain}",
      "description": "What the project does and why it matters in ${domain}",
      "difficulty": "${skillLevel}",
      "tech_stack": ["tech1", "tech2", "tech3"],
      "estimated_days": 14,
      "learning_outcomes": ["outcome1", "outcome2", "outcome3"],
      "why_build": "Why this project matters for ${domain} career",
      "deployment": "Where/how to deploy this",
      "stack": "tech1, tech2, tech3",
      "time": "14 days",
      "outcome": "Key learning outcome summary"
    }
  ],
  "portfolio_strategy": "How these projects build a ${domain} portfolio",
  "domain_focus": "${domain}"
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Projects generation error:", error);
    // Domain-specific fallback
    return {
      projects: [
        {
          title: `${domainSpec.coreSkills[0]} Implementation for ${domain}`,
          description: `Build a basic system demonstrating ${domainSpec.coreSkills[0]} using ${domainSpec.mainTools[0]}`,
          difficulty: skillLevel,
          tech_stack: [domainSpec.mainTools[0], domainSpec.mainTools[1]],
          estimated_days: 7,
          learning_outcomes: [`Practical ${domainSpec.coreSkills[0]}`, `Familiarity with ${domainSpec.mainTools[0]}`],
          why_build: `Foundational proof of ${domain} skills`,
          deployment: "Local or GitHub Pages",
          stack: `${domainSpec.mainTools[0]}, ${domainSpec.mainTools[1]}`,
          time: "7 days",
          outcome: `Practical ${domainSpec.coreSkills[0]} experience`
        },
        {
          title: `Advanced ${domainSpec.relatedFields[0]} Pipeline`,
          description: `End-to-end ${domain} project focusing on ${domainSpec.relatedFields[0]}`,
          difficulty: "Intermediate",
          tech_stack: domainSpec.mainTools.slice(1, 4),
          estimated_days: 14,
          learning_outcomes: [`System design for ${domain}`, `Integration of multiple tools`],
          why_build: `Demonstrates ability to build real-world ${domain} apps`,
          deployment: "Cloud Provider (AWS/GCP)",
          stack: domainSpec.mainTools.slice(1, 4).join(", "),
          time: "14 days",
          outcome: "System integration expertise"
        }
      ],
      portfolio_strategy: `Start with basics in ${domainSpec.coreSkills[0]} and scale up.`,
      domain_focus: domain
    };
  }
}

export async function generateInterviewPrepPlan(
  goal: string,
  domain: string = "Technology",
  skillLevel: string = "Beginner"
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];

  const prompt = `You are a ${domain} interview coach. Create domain-specific interview preparation for: "${goal}"

INTERVIEW FOCUS:
- Domain: ${domain}
- Skill Level: ${skillLevel}
- Main Technologies: ${domainSpec.mainTools.join(", ")}
- Core Skills: ${domainSpec.coreSkills.join(", ")}

IMPORTANT: ALL questions and topics must be specific to ${domain}.

Generate ONLY this JSON:
{
  "categories": {
    "technical": [
      {
        "topic": "${domain}-specific technical topic",
        "difficulty": "Easy|Medium|Hard",
        "example_question": "Real interview question",
        "how_to_answer": "What companies look for",
        "resources": "How to prepare"
      }
    ],
    "domain_concepts": [
      {
        "concept": "Key ${domain} concept",
        "why_asked": "Why companies ask about this",
        "common_questions": ["question1", "question2"],
        "best_practices": "What to emphasize"
      }
    ],
    "projects_and_experience": [
      {
        "question": "Tell me about a ${domain} project",
        "evaluation_criteria": "What they evaluate",
        "tips": "How to structure your answer"
      }
    ],
    "behavioral": [
      {
        "scenario": "Scenario in ${domain} context",
        "star_structure": "Situation-Task-Action-Result",
        "what_they_want": "What this demonstrates"
      }
    ]
  },
  "domain": "${domain}",
  "interview_focus": "${domainSpec.coreSkills.join(", ")}"
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Interview prep generation error:", error);
    // Domain-specific fallback
    return {
      categories: {
        technical: [
          {
            topic: `${domainSpec.coreSkills[0]} Deep Dive`,
            difficulty: "Medium",
            example_question: `How does ${domainSpec.coreSkills[0]} work under the hood in ${domainSpec.mainTools[0]}?`,
            how_to_answer: "Explain the architecture and common use cases.",
            resources: `Official ${domainSpec.mainTools[0]} docs`
          }
        ],
        domain_concepts: [
          {
            concept: domainSpec.relatedFields[0],
            why_asked: `It's critical for scaling ${domain} apps`,
            common_questions: [`Explain ${domainSpec.relatedFields[0]} to a non-technical person.`],
            best_practices: "Focus on tradeoffs and performance"
          }
        ],
        projects_and_experience: [
          {
            question: `Describe a challenging bug you fixed in a ${domain} project.`,
            evaluation_criteria: "Debugging skills and domain knowledge",
            tips: "Use the STAR method"
          }
        ],
        behavioral: [
          {
            scenario: `Working with a legacy ${domain} system`,
            star_structure: "Situation-Task-Action-Result",
            what_they_want: "Adaptability and problem-solving"
          }
        ]
      },
      domain: domain,
      interview_focus: domainSpec.coreSkills.join(", ")
    };
  }
}

export async function generateMilestones(
  goal: string,
  timelineMonths: number = 6,
  domain: string = "Technology",
  weeklyHours: number = 20
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];

  const prompt = `You are a ${domain} milestone planner. Create meaningful milestones for: "${goal}" over ${timelineMonths} months.

MILESTONE PLANNING:
- Domain: ${domain}
- Timeline: ${timelineMonths} months
- Weekly Hours: ${weeklyHours}
- Key Technologies: ${domainSpec.mainTools.join(", ")}
- Core Skills: ${domainSpec.coreSkills.join(", ")}

IMPORTANT: Every milestone must be specific to ${domain}.

Generate ONLY this JSON:
{
  "milestones": [
    {
      "title": "${domain}-specific milestone",
      "description": "What this milestone represents",
      "target_month": 1,
      "success_criteria": ["criteria 1", "criteria 2"],
      "domain_focus": "${domain}",
      "technologies_involved": ["tech1", "tech2"],
      "why_important": "Why this matters for ${domain} career"
    }
  ],
  "domain": "${domain}",
  "total_milestones": ${Math.ceil(timelineMonths / 2)},
  "progression": "How milestones build toward ${domain} mastery"
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Milestones generation error:", error);
    // Domain-specific fallback
    return {
      milestones: [
        {
          title: `Master ${domainSpec.coreSkills[0]}`,
          description: `Gain solid foundation in ${domainSpec.coreSkills[0]}`,
          target_month: 1,
          success_criteria: [`Build a basic app using ${domainSpec.mainTools[0]}`],
          domain_focus: domain,
          technologies_involved: [domainSpec.mainTools[0]],
          why_important: `Core requirement for ${domain}`
        },
        {
          title: `Deploy ${domainSpec.relatedFields[0]} system`,
          description: `Create a production-ready ${domain} system`,
          target_month: Math.max(2, Math.floor(timelineMonths / 2)),
          success_criteria: [`System handles real data`, `Deployed to cloud`],
          domain_focus: domain,
          technologies_involved: domainSpec.mainTools.slice(0, 3),
          why_important: `Proves real-world capability in ${domain}`
        }
      ],
      domain: domain,
      total_milestones: 2,
      progression: `Foundation -> Project -> Production for ${domain}`
    };
  }
}

export async function generateAnalytics(
  domain: string = "Technology",
  weeklyHours: number = 20,
  skillLevel: string = "Beginner",
  timeline: string = "6 months"
) {
  const domainSpec = DOMAIN_SPECS[domain] || DOMAIN_SPECS["Generative AI"];

  const prompt = `You are a ${domain} analytics expert. Generate realistic learning analytics for a ${skillLevel} learner studying ${domain} for ${weeklyHours} hours/week over ${timeline}.

Generate ONLY this JSON:
{
  "completion_percentage": 0,
  "streak_count": 0,
  "productivity_score": 0,
  "roadmap_progress": 0,
  "top_focus_skill": "${domainSpec.coreSkills[0]}",
  "weekly_hours_target": ${weeklyHours},
  "domain": "${domain}",
  "skill_level": "${skillLevel}",
  "recommended_daily_hours": ${Math.round(weeklyHours / 7 * 10) / 10},
  "intensity": "${weeklyHours >= 30 ? 'High' : weeklyHours >= 15 ? 'Medium' : 'Low'}",
  "domain_specific_metrics": {
    "primary_skill": "${domainSpec.coreSkills[0]}",
    "tools_to_master": ${JSON.stringify(domainSpec.mainTools.slice(0, 3))},
    "market_growth": "${domainSpec.marketGrowth}"
  }
}`;

  try {
    const result = await callGeminiAPI(prompt);
    const text = cleanJsonResponse(result);
    return JSON.parse(text);
  } catch (error) {
    console.error("Analytics generation error:", error);
    return {
      completion_percentage: 0,
      streak_count: 0,
      productivity_score: 0,
      roadmap_progress: 0,
      top_focus_skill: domainSpec.coreSkills[0],
      weekly_hours_target: weeklyHours,
      domain: domain,
      skill_level: skillLevel,
      intensity: weeklyHours >= 30 ? 'High' : weeklyHours >= 15 ? 'Medium' : 'Low',
      domain_specific_metrics: {
        primary_skill: domainSpec.coreSkills[0],
        tools_to_master: domainSpec.mainTools.slice(0, 3),
        market_growth: domainSpec.marketGrowth
      }
    };
  }
}
