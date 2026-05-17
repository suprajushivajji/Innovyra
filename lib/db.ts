import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabaseAdminInstance: any = null;
let supabaseInstance: any = null;

export function getSupabaseAdmin() {
  if (!supabaseAdminInstance && supabaseUrl && supabaseServiceKey) {
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseAdminInstance;
}

export function getSupabase() {
  if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// For backward compatibility with direct exports
export const supabaseAdmin = {
  from: (table: string) => {
    const admin = getSupabaseAdmin();
    if (!admin) {
      return {
        select: () => ({ eq: () => ({ single: () => Promise.reject(new Error("Supabase not configured")) }) }),
        upsert: () => ({ select: () => ({ single: () => Promise.reject(new Error("Supabase not configured")) }) }),
        insert: () => ({ select: () => ({ single: () => Promise.reject(new Error("Supabase not configured")) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.reject(new Error("Supabase not configured")) }) }) }),
      };
    }
    return admin.from(table);
  },
} as any;

export const supabase = {
  from: (table: string) => {
    const instance = getSupabase();
    if (!instance) {
      return {
        select: () => ({ eq: () => ({ single: () => Promise.reject(new Error("Supabase not configured")) }) }),
      };
    }
    return instance.from(table);
  },
} as any;
// Database helper functions
export async function getOrCreateUser(userId: string, email: string, name?: string) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const { data, error } = await client
      .from("users")
      .upsert([{ id: userId, email, name }], { onConflict: "id" })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function saveCareerGoal(userId: string, goal: any) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const { data, error } = await client
      .from("career_goals")
      .insert([
        {
          user_id: userId,
          goal: goal.goal,
          timeline: goal.timeline,
          skill_level: goal.skillLevel,
          preferred_domain: goal.domain,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving career goal:", error);
    throw error;
  }
}

export async function saveAIResearch(userId: string, careerGoalId: string, research: any) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const { data, error } = await client
      .from("ai_research")
      .insert([
        {
          user_id: userId,
          career_goal_id: careerGoalId,
          trending_skills: research.trending_skills,
          salary_insights: research.salary_insights,
          hiring_trends: research.hiring_trends,
          market_analysis: research.market_analysis,
          top_tools: research.top_tools,
          industry_growth: research.industry_growth,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving AI research:", error);
    throw error;
  }
}

export async function saveRoadmap(userId: string, careerGoalId: string, roadmap: any) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const phases = roadmap.phases || [];
    const records = phases.map((phase: any, index: number) => ({
      user_id: userId,
      career_goal_id: careerGoalId,
      phase: phase.name,
      duration: phase.duration,
      topics: phase.topics,
      order_index: index,
    }));

    const { data, error } = await client
      .from("roadmaps")
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving roadmap:", error);
    throw error;
  }
}

export async function saveTasks(userId: string, careerGoalId: string, tasks: any[]) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const records = tasks.map((task: any) => ({
      user_id: userId,
      career_goal_id: careerGoalId,
      title: task.title,
      description: task.description,
      category: task.category || "Learning",
      priority: task.priority || "Medium",
      estimated_hours: task.estimated_hours,
      status: "To Learn",
    }));

    const { data, error } = await client
      .from("tasks")
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving tasks:", error);
    throw error;
  }
}

export async function saveProjects(userId: string, careerGoalId: string, projects: any[]) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const records = projects.map((project: any) => ({
      user_id: userId,
      career_goal_id: careerGoalId,
      title: project.title,
      description: project.description,
      difficulty: project.difficulty,
      tech_stack: project.tech_stack,
      estimated_days: project.estimated_days,
      learning_outcomes: project.learning_outcomes,
      status: "Suggested",
    }));

    const { data, error } = await client
      .from("projects")
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving projects:", error);
    throw error;
  }
}

export async function saveMilestones(userId: string, careerGoalId: string, milestones: any[]) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const records = milestones.map((milestone: any) => ({
      user_id: userId,
      career_goal_id: careerGoalId,
      title: milestone.title,
      description: milestone.description,
      target_date: new Date(Date.now() + milestone.target_month * 30 * 24 * 60 * 60 * 1000),
    }));

    const { data, error } = await client
      .from("milestones")
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving milestones:", error);
    throw error;
  }
}

export async function saveInterviewPrep(userId: string, careerGoalId: string, prep: any) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const records = [];

    if (prep.categories?.coding) {
      records.push(
        ...prep.categories.coding.map((item: any) => ({
          user_id: userId,
          career_goal_id: careerGoalId,
          question: item.topic,
          category: "Coding",
          difficulty: item.difficulty,
          notes: item.resources,
        }))
      );
    }

    if (prep.categories?.system_design) {
      records.push(
        ...prep.categories.system_design.map((item: any) => ({
          user_id: userId,
          career_goal_id: careerGoalId,
          question: item.topic,
          category: "System Design",
          difficulty: item.difficulty,
          notes: item.resources,
        }))
      );
    }

    if (prep.categories?.hr_questions) {
      records.push(
        ...prep.categories.hr_questions.map((item: any) => ({
          user_id: userId,
          career_goal_id: careerGoalId,
          question: item.question,
          category: "HR",
          difficulty: "Easy",
          notes: item.tips,
        }))
      );
    }

    if (records.length > 0) {
      const { data, error } = await client
        .from("interview_prep")
        .insert(records)
        .select();

      if (error) throw error;
      return data;
    }

    return [];
  } catch (error) {
    console.error("Error saving interview prep:", error);
    throw error;
  }
}

export async function createOrUpdateAnalytics(userId: string, careerGoalId: string) {
  try {
    const client = getSupabaseAdmin();
    if (!client) throw new Error("Supabase admin client not configured");
    
    const { data: existing } = await client
      .from("analytics")
      .select()
      .eq("user_id", userId)
      .eq("career_goal_id", careerGoalId)
      .single();

    if (existing) {
      const { data, error } = await client
        .from("analytics")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await client
        .from("analytics")
        .insert([
          {
            user_id: userId,
            career_goal_id: careerGoalId,
            completion_percentage: 0,
            streak_count: 0,
            total_tasks_completed: 0,
            total_projects_completed: 0,
            weekly_productivity_score: 0,
            roadmap_progress: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error managing analytics:", error);
    throw error;
  }
}

