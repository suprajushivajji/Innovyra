import { NextRequest, NextResponse } from "next/server";
import { generateTaskPlan } from "@/lib/ai-services";

// Generate tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      goal, 
      phase = "Foundation", 
      domain = "Technology",
      weeklyHours = 20,
      skillLevel = "Beginner"
    } = body;

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    // Generate domain-specific tasks from Gemini
    const tasksData = await generateTaskPlan(goal, phase, domain, weeklyHours, skillLevel);

    return NextResponse.json({
      success: true,
      tasks: tasksData.tasks,
      daily_tasks: tasksData.tasks,
      source: "gemini",
      domain,
      weeklyHours,
      skillLevel
    });
  } catch (error) {
    console.error("Tasks API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to generate tasks",
      source: "error"
    }, { status: 500 });
  }
}
