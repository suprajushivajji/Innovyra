import { NextRequest, NextResponse } from "next/server";
import { generateInterviewPrepPlan } from "@/lib/ai-services";

// Generate interview prep plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      goal, 
      domain = "Technology",
      skillLevel = "Beginner"
    } = body;

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    // Generate domain-specific interview prep from Gemini
    const interviewData = await generateInterviewPrepPlan(goal, domain, skillLevel);

    return NextResponse.json({
      success: true,
      interview_prep: interviewData.categories,
      source: "gemini",
      domain,
      skillLevel
    });
  } catch (error) {
    console.error("Interview API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to generate interview prep",
      source: "error"
    }, { status: 500 });
  }
}
