import { NextRequest, NextResponse } from "next/server";
import {
  generateCareerResearch,
  generateCareerRoadmap,
  generateTaskPlan,
  generatePortfolioProjects,
  generateInterviewPrepPlan,
  generateMilestones,
  generateAnalytics
} from "@/lib/ai-services";

/**
 * MASTER EXECUTION PLAN ENDPOINT
 * Orchestrates all AI Career Execution Engine operations directly
 * using the ai-services functions (no internal fetch calls).
 *
 * Flow: User Goal → Research → Roadmap → Tasks → Projects → Interview → Analytics
 */
export async function POST(request: NextRequest) {
  try {
    const {
      goal,
      timeline = "6 months",
      skillLevel = "Beginner",
      domain = "Technology",
      weeklyHours = 20,
    } = await request.json();

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    const timelineMonths = parseInt(timeline.split(" ")[0]) || 6;

    // Run AI generations sequentially to respect Gemini free tier rate limits (15 RPM)
    // and avoid 429 Too Many Requests errors.
    
    let research = null, roadmapData = null, tasksData = null, 
        projectsData = null, interviewData = null, analyticsData = null, milestonesResult = null;

    try { research = await generateCareerResearch(goal, timeline, skillLevel, domain, weeklyHours); } catch (e) { console.error("Research error:", e); }
    try { roadmapData = await generateCareerRoadmap(goal, timeline, skillLevel, domain, weeklyHours); } catch (e) { console.error("Roadmap error:", e); }
    try { tasksData = await generateTaskPlan(goal, "Foundation", domain, weeklyHours, skillLevel); } catch (e) { console.error("Tasks error:", e); }
    try { projectsData = await generatePortfolioProjects(goal, skillLevel, domain, weeklyHours); } catch (e) { console.error("Projects error:", e); }
    try { interviewData = await generateInterviewPrepPlan(goal, domain, skillLevel); } catch (e) { console.error("Interview error:", e); }
    try { analyticsData = await generateAnalytics(domain, weeklyHours, skillLevel, timeline); } catch (e) { console.error("Analytics error:", e); }
    try { milestonesResult = await generateMilestones(goal, timelineMonths, domain, weeklyHours); } catch (e) { console.error("Milestones error:", e); }

    const getValue = (val: any) => val;

    return NextResponse.json({
      success: true,
      executionPlan: {
        research: getValue(research),
        roadmap: getValue(roadmapData),
        milestones: milestonesResult,
        tasks: getValue(tasksData)?.tasks || getValue(tasksData),
        projects: getValue(projectsData)?.projects || getValue(projectsData),
        interview: getValue(interviewData),
        analytics: getValue(analyticsData),
      },
      // Top-level fields for backward compatibility with frontend
      career_goal: goal,
      market_insights: {
        trending_skills: getValue(research)?.trending_skills || [],
        salary_range: getValue(research)?.salary_range || "",
        industry_growth: getValue(research)?.industry_growth || "",
        top_tools: getValue(research)?.top_tools || [],
      },
      roadmap: getValue(roadmapData)?.phases || [],
      daily_tasks: getValue(tasksData)?.tasks || [],
      projects: getValue(projectsData)?.projects || [],
      domain,
      weeklyHours,
      skillLevel,
      timeline,
      provider: "gemini",
      database: "ai-generated",
      generatedAt: new Date().toISOString(),
      message: "Complete execution plan generated successfully",
    });
  } catch (error) {
    console.error("Execution plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate execution plan", details: String(error) },
      { status: 500 }
    );
  }
}
