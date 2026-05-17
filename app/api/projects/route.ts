import { NextRequest, NextResponse } from "next/server";
import { generatePortfolioProjects } from "@/lib/ai-services";

// Generate portfolio projects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      goal, 
      skillLevel = "Beginner", 
      domain = "Technology",
      weeklyHours = 20
    } = body;

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    // Generate domain-specific projects from Gemini
    const projectsData = await generatePortfolioProjects(goal, skillLevel, domain, weeklyHours);

    return NextResponse.json({
      success: true,
      projects: projectsData.projects,
      source: "gemini",
      domain,
      weeklyHours,
      skillLevel
    });
  } catch (error) {
    console.error("Projects API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to generate projects",
      source: "error"
    }, { status: 500 });
  }
}
