import { NextRequest, NextResponse } from "next/server";
import { generateCareerRoadmap, generateMilestones } from "@/lib/ai-services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      goal, 
      timeline = "6 months", 
      skillLevel = "Beginner", 
      domain = "Technology",
      weeklyHours = 20
    } = body;

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    // Generate domain-specific roadmap and milestones from Gemini
    const timelineMonths = parseInt(timeline.split(" ")[0]) || 6;
    const [roadmapData, milestonesData] = await Promise.all([
      generateCareerRoadmap(goal, timeline, skillLevel, domain, weeklyHours),
      generateMilestones(goal, timelineMonths, domain, weeklyHours),
    ]);

    return NextResponse.json({
      success: true,
      roadmap: roadmapData,
      milestones: milestonesData,
      source: "gemini",
      domain,
      weeklyHours
    });
  } catch (error) {
    console.error("Roadmap API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to generate roadmap",
      source: "error"
    }, { status: 500 });
  }
}
