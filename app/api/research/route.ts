import { NextRequest, NextResponse } from "next/server";
import { generateCareerResearch } from "@/lib/ai-services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      goal, 
      timeline = "6 months", 
      skillLevel = "Beginner", 
      domain = "Technology",
      weeklyHours = 20,
      userId 
    } = body;

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    // Generate domain-specific research from Gemini
    const research = await generateCareerResearch(goal, timeline, skillLevel, domain, weeklyHours);

    return NextResponse.json({
      success: true,
      data: research,
      source: "gemini",
      domain,
      weeklyHours
    });
  } catch (error) {
    console.error("Research API error:", error);
    // Return generic structure on error
    return NextResponse.json({
      success: false,
      error: "Failed to generate research",
      source: "error",
      note: "Please try again"
    }, { status: 500 });
  }
}
