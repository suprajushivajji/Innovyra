import { NextRequest, NextResponse } from "next/server";
import { generateAnalytics } from "@/lib/ai-services";

// Get analytics for user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain") || "Technology";
    const weeklyHours = parseInt(searchParams.get("weeklyHours") || "20");
    const skillLevel = searchParams.get("skillLevel") || "Beginner";
    const timeline = searchParams.get("timeline") || "6 months";

    const analytics = await generateAnalytics(domain, weeklyHours, skillLevel, timeline);

    return NextResponse.json({
      success: true,
      analytics: [analytics],
      source: "gemini",
      domain
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics", success: false },
      { status: 500 }
    );
  }
}

// Calculate and update analytics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      domain = "Technology",
      weeklyHours = 20,
      skillLevel = "Beginner",
      timeline = "6 months"
    } = body;

    const analytics = await generateAnalytics(domain, weeklyHours, skillLevel, timeline);

    return NextResponse.json({
      success: true,
      analytics,
      source: "gemini",
      domain
    });
  } catch (error) {
    console.error("Post analytics error:", error);
    return NextResponse.json(
      { error: "Failed to calculate analytics", success: false },
      { status: 500 }
    );
  }
}
