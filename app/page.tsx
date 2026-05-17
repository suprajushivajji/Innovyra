"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Code2,
  Cpu,
  Database,
  FileText,
  Gauge,
  GitBranch,
  GraduationCap,
  Kanban,
  Layers3,
  LineChart,
  MessageCircle,
  MoveRight,
  Orbit,
  PanelLeft,
  Play,
  Puzzle,
  RefreshCw,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  Users,
  Video,
  Workflow,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Stage = "idle" | "research" | "planning" | "dashboard";

type Task = {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  points: number;
};

type KanbanColumn = {
  title: string;
  tone: string;
  tasks: Task[];
};

type EngineOutput = {
  provider: string;
  database: string;
  generatedAt: string;
  career_goal: string;
  market_insights: {
    trending_skills: string[];
    salary_range: string;
    industry_growth: string;
    top_tools: string[];
  };
  roadmap: {
    phase: string;
    duration: string;
    topics: string[];
  }[];
  daily_tasks: {
    title: string;
    status: string;
  }[];
  projects: {
    title: string;
    difficulty: string;
    estimated_time: string;
    tech_stack: string[];
    learning_outcomes: string[];
  }[];
};

const navItems = [
  ["Execution Plan", "#builder"],
  ["Project HUB", "#hub"],
  ["Analytics", "#analytics"],
  ["DeepSearch", "#deepsearch"],
  ["AI Agents", "#agents"],
  ["Features", "#features"]
];

const particles = Array.from({ length: 56 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 17) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 14) * 0.18,
  duration: 4.5 + (index % 6) * 0.5
}));

const marketCards = [
  {
    label: "Hiring Demand",
    value: "91/100",
    delta: "+18%",
    icon: TrendingUp,
    tone: "text-cyan-200"
  },
  {
    label: "Salary Insights",
    value: "$118k-$172k",
    delta: "US median",
    icon: Briefcase,
    tone: "text-emerald-200"
  },
  {
    label: "GenAI Growth",
    value: "3.8x",
    delta: "project demand",
    icon: Sparkles,
    tone: "text-violet-200"
  },
  {
    label: "Portfolio Weight",
    value: "42%",
    delta: "screening impact",
    icon: GitBranch,
    tone: "text-amber-200"
  }
];

const skillSignals = [
  { name: "Python", score: 94, signal: "High Demand", color: "bg-cyan-300" },
  { name: "MLOps", score: 86, signal: "Rapid Growth", color: "bg-emerald-300" },
  { name: "GenAI", score: 91, signal: "Trending", color: "bg-violet-300" },
  { name: "SQL", score: 78, signal: "Baseline", color: "bg-amber-300" },
  { name: "System Design", score: 72, signal: "Interview Lift", color: "bg-rose-300" }
];

const technologies = [
  "Python",
  "NumPy",
  "Pandas",
  "Scikit-learn",
  "PyTorch",
  "FastAPI",
  "Docker",
  "MLflow",
  "LangChain",
  "Vector DBs"
];

const roadmap30 = [
  "Python fundamentals and data structures",
  "NumPy, Pandas, EDA notebook practice",
  "Regression and classification mini labs",
  "GitHub portfolio structure",
  "Weekly proof-of-work review"
];

const roadmap90 = [
  "Ship 3 ML portfolio projects",
  "Deploy one FastAPI inference service",
  "Add MLOps tracking and Docker workflow",
  "Rewrite resume around project metrics",
  "Complete 8 mock interview loops"
];

const dailyPlan = [
  { time: "07:00", title: "Python drills", detail: "List comps, functions, OOP basics" },
  { time: "18:30", title: "ML lab", detail: "Train baseline model and document metrics" },
  { time: "21:00", title: "Portfolio push", detail: "Commit README and experiment log" }
];

const initialKanban: KanbanColumn[] = [
  {
    title: "To Learn",
    tone: "border-cyan-300/30",
    tasks: [
      { id: "python", title: "Learn Python Basics", priority: "High", points: 8 },
      { id: "numpy", title: "Master NumPy arrays", priority: "Medium", points: 5 }
    ]
  },
  {
    title: "In Progress",
    tone: "border-violet-300/30",
    tasks: [
      { id: "mini-project", title: "Build ML Mini Project", priority: "High", points: 13 }
    ]
  },
  {
    title: "Completed",
    tone: "border-emerald-300/30",
    tasks: [
      { id: "setup", title: "Create GitHub Portfolio", priority: "Medium", points: 5 }
    ]
  },
  {
    title: "Revision",
    tone: "border-amber-300/30",
    tasks: [
      { id: "resume", title: "Complete Resume Draft", priority: "High", points: 8 }
    ]
  },
  {
    title: "Interview Prep",
    tone: "border-rose-300/30",
    tasks: [
      { id: "mock", title: "Schedule Mock Interview", priority: "Low", points: 3 }
    ]
  }
];

const agents = [
  {
    name: "Research Agent",
    icon: Search,
    status: "Scanning market signals",
    work: "Tracks hiring demand, salaries, trends, and skill relevance."
  },
  {
    name: "Planning Agent",
    icon: BrainCircuit,
    status: "Resolving dependencies",
    work: "Turns career goals into 30-day, 90-day, and weekly execution paths."
  },
  {
    name: "Resume Agent",
    icon: FileText,
    status: "Packaging proof",
    work: "Converts projects into metric-backed resume bullets and portfolio copy."
  },
  {
    name: "Interview Agent",
    icon: MessageCircle,
    status: "Preparing loops",
    work: "Schedules mocks, coding practice, aptitude drills, and readiness checks."
  }
];

const projectIdeas = [
  {
    name: "Sentiment Analysis App",
    difficulty: "Beginner",
    stack: "Python, FastAPI, React",
    time: "12 days",
    outcome: "Text preprocessing, model evaluation, API deployment"
  },
  {
    name: "AI Resume Analyzer",
    difficulty: "Intermediate",
    stack: "OpenAI API, Supabase, Next.js",
    time: "18 days",
    outcome: "LLM evaluation, scoring workflows, product UI thinking"
  },
  {
    name: "Stock Prediction Dashboard",
    difficulty: "Advanced",
    stack: "Pandas, PyTorch, Plotly",
    time: "21 days",
    outcome: "Time series modeling, dashboards, experiment tracking"
  }
];

const milestones = [
  { label: "Foundation", progress: 76, icon: GraduationCap },
  { label: "Projects", progress: 48, icon: Code2 },
  { label: "Resume", progress: 64, icon: FileText },
  { label: "Interviews", progress: 32, icon: Video }
];

const productivity = [42, 68, 51, 78, 88, 74, 92];

const sidebarItems = [
  { label: "Dashboard", icon: Gauge },
  { label: "Roadmap", icon: Route },
  { label: "Tasks", icon: ClipboardCheck },
  { label: "Projects", icon: Layers3 },
  { label: "Interviews", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "AI Mentor", icon: Bot }
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHeader({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{body}</p>
    </div>
  );
}

function HeroVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="grid-overlay absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-200/70 shadow-neon-cyan"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            opacity: [0.15, 0.85, 0.15],
            y: [0, -18, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        className="orbital-ring absolute left-1/2 top-[44%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 md:h-96 md:w-96"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbital-ring absolute left-1/2 top-[44%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 md:h-[34rem] md:w-[34rem]"
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute left-6 top-28 hidden w-64 rounded-lg border border-cyan-300/20 bg-slate-950/35 p-3 text-xs text-slate-300 shadow-neon-cyan backdrop-blur md:block">
        <div className="mb-3 flex items-center gap-2 text-cyan-100">
          <CircleDot className="h-4 w-4" />
          DeepSearch running
        </div>
        <div className="space-y-2">
          <div className="h-2 w-11/12 rounded-lg bg-cyan-300/60" />
          <div className="h-2 w-8/12 rounded-lg bg-violet-300/50" />
          <div className="h-2 w-10/12 rounded-lg bg-emerald-300/50" />
        </div>
      </div>

      <div className="absolute bottom-20 right-6 hidden w-72 rounded-lg border border-violet-300/20 bg-slate-950/35 p-3 text-xs text-slate-300 shadow-neon-violet backdrop-blur lg:block">
        <div className="mb-3 flex items-center justify-between text-violet-100">
          <span>Workflow synthesis</span>
          <span>87%</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {productivity.map((value, index) => (
            <div key={index} className="flex h-24 items-end rounded bg-white/5 px-1">
              <div
                className="w-full rounded bg-gradient-to-t from-violet-400 to-cyan-200"
                style={{ height: `${value}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const tone =
    priority === "High"
      ? "border-rose-300/40 text-rose-100"
      : priority === "Medium"
        ? "border-amber-300/40 text-amber-100"
        : "border-emerald-300/40 text-emerald-100";

  return (
    <span className={`rounded-lg border px-2 py-1 text-[11px] font-medium ${tone}`}>
      {priority}
    </span>
  );
}

export default function Home() {
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [timeline, setTimeline] = useState("6 Months");
  const [domain, setDomain] = useState("Machine Learning");
  const [weeklyHours, setWeeklyHours] = useState(14);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [engineOutput, setEngineOutput] = useState<EngineOutput | null>(null);
  const [kanbanColumns, setKanbanColumns] = useState(initialKanban);
  
  // Dynamic data states
  const [insights, setInsights] = useState<any>(null);
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [tasksData, setTasksData] = useState<any>(null);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");

  // Domain-based goal text
  const domainGoals: { [key: string]: string } = {
    "Machine Learning": "Become ML Engineer",
    "Generative AI": "Master Generative AI",
    "Data Engineering": "Become Data Engineer",
    "Cloud AI": "Become Cloud AI Specialist"
  };

  const goal = `${domainGoals[domain] || "Build AI Career"} in ${timeline.split(" ")[0]} months`;



  // Update Kanban based on tasks
  useEffect(() => {
    const taskList = tasksData?.tasks || tasksData?.daily_tasks;
    if (taskList && Array.isArray(taskList)) {
      const newColumns: KanbanColumn[] = initialKanban.map(col => ({
        ...col,
        tasks: []
      }));

      taskList.forEach((task: any, i: number) => {
        const colIdx = i < Math.ceil(taskList.length * 0.5) ? 0 : i < Math.ceil(taskList.length * 0.75) ? 1 : 2;
        const priority = task.priority === "High" ? "High" : task.priority === "Low" ? "Low" : "Medium";
        newColumns[colIdx].tasks.push({
          id: `ai-${i}`,
          title: task.title,
          priority: priority as Task["priority"],
          points: task.estimated_hours || task.points || 3
        });
      });
      setKanbanColumns(newColumns);
    }
  }, [tasksData]);

  const stageLabel = useMemo(() => {
    if (stage === "research") return "DeepSearch intelligence gathering";
    if (stage === "planning") return "AI reasoning and workflow synthesis";
    if (stage === "dashboard") return "Execution dashboard generated";
    return "Ready to build";
  }, [stage]);

  useEffect(() => {
    if (stage !== "research" && stage !== "planning") return;

    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + (stage === "research" ? 6 : 8), 100));
    }, 145);

    return () => window.clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (progress < 100) return;

    if (stage === "research") {
      const timer = window.setTimeout(() => {
        setProgress(0);
        setStage("planning");
      }, 480);
      return () => window.clearTimeout(timer);
    }

    if (stage === "planning") {
      const timer = window.setTimeout(() => {
        setProgress(100);
        setStage("dashboard");
      }, 560);
      return () => window.clearTimeout(timer);
    }
  }, [progress, stage]);

  async function runExecutionEngine() {
    setProgress(0);
    setStage("research");
    scrollToId("#demo");

    try {
      const response = await fetch("/api/execution-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          skillLevel,
          timeline,
          domain,
          weeklyHours
        })
      });
      const data = await response.json();
      // Set engine output for backward compat
      setEngineOutput(data as EngineOutput);
      // Also populate individual data states from execution plan
      if (data.executionPlan) {
        if (data.executionPlan.research) setInsights(data.executionPlan.research);
        if (data.executionPlan.roadmap) setRoadmapData({ roadmap: data.executionPlan.roadmap, milestones: data.executionPlan.milestones });
        if (data.executionPlan.tasks) setTasksData({ tasks: data.executionPlan.tasks, daily_tasks: data.executionPlan.tasks });
        if (data.executionPlan.projects) setProjectsData({ projects: data.executionPlan.projects });
        if (data.executionPlan.interview) setInterviewData({ interview_prep: data.executionPlan.interview?.categories || data.executionPlan.interview });
      }
    } catch {
      setEngineOutput(null);
    }
  }

  function showDemoDashboard() {
    setStage("dashboard");
    setProgress(100);
    scrollToId("#hub");
  }

  function moveTask(columnTitle: string, taskId: string) {
    setKanbanColumns((columns) => {
      const fromIndex = columns.findIndex((column) => column.title === columnTitle);
      const task = columns[fromIndex]?.tasks.find((item) => item.id === taskId);
      if (!task || fromIndex < 0) return columns;

      const toIndex = Math.min(fromIndex + 1, columns.length - 1);

      return columns.map((column, index) => {
        if (index === fromIndex) {
          return {
            ...column,
            tasks: column.tasks.filter((item) => item.id !== taskId)
          };
        }

        if (index === toIndex && fromIndex !== toIndex) {
          return {
            ...column,
            tasks: [...column.tasks, task]
          };
        }

        return column;
      });
    });
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/62 backdrop-blur-xl">
        <nav className="flex w-full items-center justify-between pr-4 py-2.5 md:pr-8 lg:pr-12 pl-0">
            <button
              type="button"
              onClick={() => scrollToId("#top")}
              className="flex items-center gap-1 rounded-lg text-left text-white pl-1"
              aria-label="Innovyra home"
            >
              <img src="/logo.png" alt="Innovyra Logo" className="h-12 w-auto object-contain scale-[1.4] origin-left -mr-1" />
              <span>
                <span className="block text-sm font-semibold">Innovyra</span>
                <span className="block text-[11px] text-cyan-200/75">Smart Career Execution Engine</span>
              </span>
            </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(([label, href]) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToId(href)}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToId("#builder")}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/18"
          >
            <Rocket className="h-4 w-4" />
            Launch
          </button>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-[88vh] items-center px-4 pb-12 pt-28 md:px-6">
        <HeroVisual />
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100"
          >
            <Sparkles className="h-4 w-4" />
            Smart Career Execution Engine
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.85 }}
            className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl"
          >
            Innovyra
            <span className="mt-3 block text-gradient">From Career Goal → AI Execution Workflow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl"
          >
            AI that researches, plans, and executes your career journey through DeepSearch intelligence,
            agent reasoning, and a Project HUB workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.85 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => scrollToId("#builder")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-200 px-5 py-3 text-sm font-bold text-slate-950 shadow-neon-cyan transition hover:bg-white sm:w-auto"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showDemoDashboard}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/14 sm:w-auto"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-4 md:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["DeepSearch", "market signals"],
            ["Planner", "dependency graph"],
            ["Project HUB", "execution board"],
            ["AI Agents", "orchestrated workflow"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/44 px-4 py-3">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs text-slate-400">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="Operating System Flow"
          title="A career goal becomes an executable system"
          body="Innovyra replaces scattered searching with a research, reasoning, and execution loop designed for visible progress."
        />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "DeepSearch Intelligence",
              body: "Collects market trends, hiring demand, salary signals, tech stacks, and roadmap patterns."
            },
            {
              icon: BrainCircuit,
              title: "AI Reasoning Engine",
              body: "Ranks skill dependencies, converts constraints into priorities, and generates a 30/90-day path."
            },
            {
              icon: Kanban,
              title: "Project HUB Workflow",
              body: "Transforms the plan into tasks, milestones, portfolio projects, interviews, and analytics."
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="glass-panel rounded-lg p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/12 text-cyan-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="builder" className="border-y border-white/10 bg-slate-950/52 px-4 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
              Onboarding Flow
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              Feed the engine a goal. Get a workflow back.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The prototype uses realistic dummy AI data, but the flow is shaped for a Node API,
              Supabase persistence, and OpenAI-powered orchestration.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Target, label: "Goal parsing", value: goal },
                { icon: Timer, label: "Constraint model", value: `${timeline}, ${weeklyHours} hrs/week` },
                { icon: Database, label: "Execution memory", value: "Supabase-ready workflow state" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Career Goal (Auto-generated)</span>
                <div className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 text-white">
                  {goal}
                </div>
              </label>

              <div className="grid gap-3">
                <span className="text-sm font-medium text-slate-200">Current Skill Level</span>
                <div className="grid grid-cols-3 gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSkillLevel(level)}
                      className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                        skillLevel === level
                          ? "border-cyan-300/70 bg-cyan-300/16 text-cyan-50"
                          : "border-white/12 bg-white/[0.035] text-slate-300 hover:bg-white/8"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-200">Time Available</span>
                  <select
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value)}
                    className="rounded-lg border border-white/12 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>9 Months</option>
                    <option>12 Months</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-200">Preferred Domain</span>
                  <select
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                    className="rounded-lg border border-white/12 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
                  >
                    <option>Machine Learning</option>
                    <option>Generative AI</option>
                    <option>Data Engineering</option>
                    <option>Cloud AI</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-3">
                <span className="flex items-center justify-between text-sm font-medium text-slate-200">
                  Weekly Study Hours
                  <span className="text-cyan-100">{weeklyHours} hrs</span>
                </span>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={weeklyHours}
                  onChange={(event) => setWeeklyHours(Number(event.target.value))}
                  className="accent-cyan-300"
                />
              </label>

              <button
                type="button"
                onClick={runExecutionEngine}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-200 via-violet-200 to-amber-100 px-5 py-3 font-bold text-slate-950 transition hover:brightness-110"
              >
                Generate Execution Workflow
                <Zap className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="deepsearch" className="px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="DeepSearch Intelligence"
          title="Research visualization that feels alive"
          body="Innovyra surfaces live-market style signals, ranks skills, and explains why each capability earns its place in the workflow."
        />

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {marketCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="glass-panel rounded-lg p-5">
                <div className="mb-5 flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${card.tone}`} />
                  <span className="rounded-lg border border-white/12 px-2 py-1 text-[11px] text-slate-300">
                    {card.delta}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-5 grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">Trending Skills Priority Map</h3>
                <p className="mt-2 text-sm text-slate-400">Why these skills are prioritized</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-cyan-100">
                <Activity className="h-4 w-4" />
                Live signal model
              </div>
            </div>
            <div className="space-y-5">
              {skillSignals.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-white">{skill.name}</span>
                    <span className="text-slate-300">{skill.signal}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-lg bg-white/8">
                    <motion.div
                      className={`h-full rounded-lg ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-300/12 text-violet-100">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">AI Reasoning</h3>
                <p className="text-sm text-slate-400">Dependency-aware planning</p>
              </div>
            </div>

            <p className="mt-5 leading-7 text-slate-300">
              Python earns the first slot because it unlocks data analysis, ML frameworks, automation,
              and interview fluency. MLOps follows after modeling because deployment proof separates
              job-ready candidates from course-only learners. GenAI becomes a portfolio accelerator
              once fundamentals are stable.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/12 bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="border-y border-white/10 bg-slate-950/52 px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="Demo Workflow"
          title="Watch your personalized roadmap come to life"
          body="Your execution workflow is being generated based on your career goal, preferred domain, and available time."
        />

        <div className="mx-auto max-w-7xl">
          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-cyan-100">{stageLabel}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{goal}</h3>
              </div>
              <button
                type="button"
                onClick={runExecutionEngine}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/18"
              >
                <RefreshCw className="h-4 w-4" />
                Generate Workflow
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Generating your personalized roadmap...</span>
                <span className="text-sm font-semibold text-cyan-100">{stage === "idle" ? 0 : progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-lg bg-white/8">
                <motion.div
                  className="h-full rounded-lg bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-200"
                  animate={{ width: `${stage === "idle" ? 0 : progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {engineOutput && (
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Domain Focus</p>
                  <p className="mt-2 text-sm font-semibold text-white">{domain}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Timeline</p>
                  <p className="mt-2 text-sm font-semibold text-white">{timeline}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Weekly Hours</p>
                  <p className="mt-2 text-sm font-semibold text-white">{weeklyHours} hrs</p>
                </div>
              </div>
            )}

            {progress === 100 && engineOutput && insights && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-4"
              >
                <div className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <p className="text-sm font-semibold text-emerald-100">Workflow Complete ✓</p>
                  </div>
                  <p className="text-sm text-slate-300">Your personalized execution plan is ready. Navigate to Project HUB below to see your roadmap, tasks, and projects.</p>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100">Top Skill</p>
                    <p className="mt-3 text-lg font-semibold text-white">{insights.trending_skills?.[0] || "Python"}</p>
                    <p className="mt-2 text-xs text-slate-400">High priority for {domain}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="rounded-lg border border-violet-300/25 bg-violet-300/10 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-violet-100">Second Skill</p>
                    <p className="mt-3 text-lg font-semibold text-white">{insights.trending_skills?.[1] || "ML Frameworks"}</p>
                    <p className="mt-2 text-xs text-slate-400">Build deeper expertise</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="rounded-lg border border-amber-300/25 bg-amber-300/10 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-amber-100">Salary Range</p>
                    <p className="mt-3 text-lg font-semibold text-white">{insights.salary_range || "$120K-$180K"}</p>
                    <p className="mt-2 text-xs text-slate-400">Market average for {domain}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100">Market Demand</p>
                    <p className="mt-3 text-lg font-semibold text-white">High Growth</p>
                    <p className="mt-2 text-xs text-slate-400">{insights.industry_growth || "Strong opportunity"}</p>
                  </motion.div>
                </div>

                <div className="mt-4 rounded-lg border border-slate-300/20 bg-slate-300/5 p-4">
                  <p className="text-xs font-semibold text-slate-400 mb-3">HIRING TRENDS</p>
                  <p className="text-sm text-slate-300 leading-6">{insights.hiring_trends || "Strong job market with competitive salaries and growing opportunities"}</p>
                </div>

                <button
                  onClick={() => scrollToId("#hub")}
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                >
                  View Your Project HUB →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="AI Execution Engine"
          title="Roadmaps that turn into daily action"
          body="The planner handles weekly goals, daily tasks, AI priorities, and skill dependency sequencing."
        />

        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="mb-6 flex items-center gap-3">
              <Route className="h-5 w-5 text-cyan-200" />
              <h3 className="text-xl font-semibold text-white">30-Day Roadmap</h3>
            </div>
            <div className="space-y-4">
              {roadmap30.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-xs font-bold text-cyan-100">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="mb-6 flex items-center gap-3">
              <Workflow className="h-5 w-5 text-violet-200" />
              <h3 className="text-xl font-semibold text-white">90-Day Roadmap</h3>
            </div>
            <div className="space-y-4">
              {roadmap90.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-300/30 bg-violet-300/10 text-xs font-bold text-violet-100">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="hub" className="border-y border-white/10 bg-slate-950/62 px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="Project HUB Workflow"
          title="The career execution dashboard"
          body="A Linear-like cockpit for roadmaps, tasks, projects, interviews, analytics, and AI mentor signals."
        />

        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[230px_1fr]">
          <aside className="glass-panel rounded-lg p-3">
            <div className="mb-4 flex items-center gap-2 px-2 py-2 text-sm font-semibold text-white">
              <PanelLeft className="h-4 w-4 text-cyan-200" />
              Project HUB
            </div>
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSidebar === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveSidebar(item.label)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                      isActive
                        ? "bg-cyan-300/12 text-cyan-50"
                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-5">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass-panel rounded-lg p-5">
                <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-semibold text-cyan-100">AI Insights</p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">{activeSidebar} Control Plane</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
                    <ShieldCheck className="h-4 w-4" />
                    {isLoading ? "Generating..." : "On track"}
                  </div>
                </div>

                {/* Dashboard Tab */}
                {activeSidebar === "Dashboard" && insights && (
                  <div className="grid gap-3 md:grid-cols-2">
                    {insights.trending_skills?.slice(0, 2).map((skill: string, i: number) => (
                      <div key={i} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm text-slate-400">Top Skill {i + 1}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{skill}</p>
                        <p className="mt-1 text-xs text-slate-500">Critical for your goal</p>
                      </div>
                    ))}
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-sm text-slate-400">Salary Range</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{insights.salary_range}</p>
                      <p className="mt-1 text-xs text-slate-500">Market average</p>
                    </div>
                  </div>
                )}

                {/* Roadmap Tab */}
                {activeSidebar === "Roadmap" && roadmapData?.roadmap && (
                  <div className="space-y-3">
                    {(roadmapData.roadmap.phases || roadmapData.roadmap || []).map((phase: any, i: number) => (
                      <div key={i} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm font-semibold text-cyan-100">{phase.name || phase.phase}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{phase.duration}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(phase.topics || []).slice(0, 4).map((topic: string, idx: number) => (
                            <span key={idx} className="inline-block rounded-lg bg-cyan-300/12 px-2 py-1 text-xs text-cyan-100">
                              {topic}
                            </span>
                          ))}
                        </div>
                        {phase.key_outcome && (
                          <p className="mt-2 text-xs text-slate-400">{phase.key_outcome}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tasks Tab */}
                {activeSidebar === "Tasks" && (tasksData?.tasks || tasksData?.daily_tasks) && (
                  <div className="space-y-3">
                    {(tasksData.tasks || tasksData.daily_tasks).map((task: any, i: number) => (
                      <div key={i} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">{task.title}</p>
                          {task.priority && (
                            <span className={`rounded-lg border px-2 py-1 text-[11px] font-medium ${
                              task.priority === "High" ? "border-rose-300/40 text-rose-100" :
                              task.priority === "Low" ? "border-emerald-300/40 text-emerald-100" :
                              "border-amber-300/40 text-amber-100"
                            }`}>{task.priority}</span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{task.description || task.detail || task.outcome}</p>
                        {task.estimated_hours && (
                          <p className="mt-1 text-xs text-cyan-200/60">{task.estimated_hours}h estimated</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects Tab */}
                {activeSidebar === "Projects" && projectsData?.projects && (
                  <div className="space-y-3">
                    {projectsData.projects.slice(0, 2).map((proj: any, i: number) => (
                      <div key={i} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm font-semibold text-white">{proj.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{proj.difficulty}</p>
                        <p className="mt-2 text-xs text-cyan-100">{proj.time}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interviews Tab */}
                {activeSidebar === "Interviews" && interviewData?.interview_prep && (
                  <div className="space-y-3">
                    {interviewData.interview_prep.technical && (
                      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm font-semibold text-cyan-100 mb-2">Technical Topics</p>
                        <div className="space-y-2">
                          {interviewData.interview_prep.technical.slice(0, 3).map((item: any, i: number) => (
                            <div key={i} className="flex flex-col gap-1">
                              <span className="inline-block rounded-lg bg-violet-300/12 px-2 py-1 text-xs text-violet-100 w-fit">
                                {item.topic || item}
                              </span>
                              {item.example_question && (
                                <p className="text-xs text-slate-400 pl-2">{item.example_question}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {interviewData.interview_prep.domain_concepts && (
                      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm font-semibold text-amber-100 mb-2">Domain Concepts</p>
                        <div className="space-y-2">
                          {interviewData.interview_prep.domain_concepts.slice(0, 3).map((item: any, i: number) => (
                            <span key={i} className="inline-block rounded-lg bg-amber-300/12 px-2 py-1 text-xs text-amber-100 mr-2">
                              {item.concept || item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {interviewData.interview_prep.behavioral && (
                      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm font-semibold text-emerald-100 mb-2">Behavioral</p>
                        <div className="space-y-2">
                          {interviewData.interview_prep.behavioral.slice(0, 2).map((item: any, i: number) => (
                            <p key={i} className="text-xs text-slate-300">{item.scenario || item}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Analytics Tab */}
                {activeSidebar === "Analytics" && (
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      ["Completion", "68%", "Roadmap progress"],
                      ["Consistency", "8.6", "Study rhythm score"],
                      ["Focus", insights?.trending_skills?.[0] || "Python", "Top priority"]
                    ].map(([label, value, detail]) => (
                      <div key={label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-sm text-slate-400">{label}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                        <p className="mt-1 text-xs text-slate-500">{detail}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI Mentor Tab */}
                {activeSidebar === "AI Mentor" && insights && (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-sm font-semibold text-cyan-100 mb-2">Industry Insights</p>
                      <p className="text-sm text-slate-300">{insights.industry_growth}</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-sm font-semibold text-emerald-100 mb-2">Tools to Learn</p>
                      <div className="flex flex-wrap gap-2">
                        {insights.top_tools?.map((tool: string, i: number) => (
                          <span key={i} className="inline-block rounded-lg bg-emerald-300/12 px-2 py-1 text-xs text-emerald-100">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && !insights && (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-20 rounded-lg border border-white/10 bg-white/[0.015] animate-pulse" />
                    ))}
                  </div>
                )}
              </div>

              <div className="glass-panel rounded-lg p-5">
                <div className="mb-5 flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-cyan-200" />
                  <h3 className="text-xl font-semibold text-white">Daily Plan</h3>
                </div>
                <div className="space-y-3">
                  {(tasksData?.tasks || tasksData?.daily_tasks)?.slice(0, 3).map((item: any, i: number) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <span className="text-sm font-semibold text-cyan-100">{item.time || `${8 + i * 2}:00`}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.description || item.detail || item.outcome}</p>
                      </div>
                    </div>
                  )) || dailyPlan.map((item) => (
                    <div key={item.time} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <span className="text-sm font-semibold text-cyan-100">{item.time}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel overflow-hidden rounded-lg">
              <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-5 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold text-violet-100">Workflow Board</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">AI-generated execution tasks</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <SlidersHorizontal className="h-4 w-4 text-cyan-200" />
                  Priority system active
                </div>
              </div>

              <div className="scrollbar-none grid auto-cols-[260px] grid-flow-col gap-3 overflow-x-auto p-4">
                {kanbanColumns.map((column) => (
                  <div
                    key={column.title}
                    className={`min-h-[280px] rounded-lg border ${column.tone} bg-slate-950/44 p-3`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">{column.title}</h4>
                      <span className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400">
                        {column.tasks.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {column.tasks.map((task) => (
                        <motion.div
                          layout
                          key={task.id}
                          className="rounded-lg border border-white/10 bg-white/[0.045] p-3"
                        >
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold leading-5 text-white">{task.title}</p>
                            <button
                              type="button"
                              onClick={() => moveTask(column.title, task.id)}
                              title={`Advance ${task.title}`}
                              aria-label={`Advance ${task.title}`}
                              className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-1.5 text-cyan-100 transition hover:bg-cyan-300/18"
                            >
                              <MoveRight className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <PriorityBadge priority={task.priority} />
                            <span className="text-xs text-slate-400">{task.points} pts</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="glass-panel rounded-lg p-5">
                <div className="mb-5 flex items-center gap-3">
                  <Target className="h-5 w-5 text-amber-200" />
                  <h3 className="text-xl font-semibold text-white">Milestones</h3>
                </div>
                <div className="space-y-4">
                  {milestones.map((milestone) => {
                    const Icon = milestone.icon;
                    return (
                      <div key={milestone.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 font-semibold text-white">
                            <Icon className="h-4 w-4 text-cyan-200" />
                            {milestone.label}
                          </span>
                          <span className="text-slate-400">{milestone.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-lg bg-white/8">
                          <div
                            className="h-full rounded-lg bg-gradient-to-r from-cyan-300 to-violet-300"
                            style={{ width: `${milestone.progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel rounded-lg p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LineChart className="h-5 w-5 text-cyan-200" />
                    <h3 className="text-xl font-semibold text-white">Progress Graph</h3>
                  </div>
                  <span className="text-sm text-slate-400">Weekly productivity</span>
                </div>
                <div className="grid h-52 grid-cols-7 items-end gap-2">
                  {productivity.map((value, index) => (
                    <div key={index} className="flex h-full flex-col justify-end gap-2">
                      <motion.div
                        className="rounded-lg bg-gradient-to-t from-cyan-400 via-violet-400 to-amber-200"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.04 }}
                      />
                      <span className="text-center text-xs text-slate-500">D{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agents" className="px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="AI Agent System"
          title="Specialized agents, one execution loop"
          body="Innovyra feels like an operating system because every agent owns part of the workflow."
        />

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.06 }}
                className="glass-panel rounded-lg p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/12 text-cyan-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                <p className="mt-2 text-sm text-cyan-100">{agent.status}</p>
                <p className="mt-4 leading-6 text-slate-300">{agent.work}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/52 px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="AI Project Generator"
          title="Portfolio projects with execution metadata"
          body="Each suggested project includes difficulty, stack, estimated time, and the learning outcome it proves."
        />

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {projectsData?.projects?.map((project: any) => (
            <div key={project.title} className="glass-panel rounded-lg p-5">
              <div className="mb-5 flex items-center justify-between">
                <Puzzle className="h-5 w-5 text-cyan-200" />
                <span className="rounded-lg border border-white/12 px-2 py-1 text-xs text-slate-300">
                  {project.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex items-center gap-2 text-slate-300">
                  <Cpu className="h-4 w-4 text-violet-200" />
                  {project.stack || (Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : project.tech_stack)}
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Timer className="h-4 w-4 text-amber-200" />
                  {project.time || (project.estimated_days ? `${project.estimated_days} days` : "")}
                </p>
                <p className="flex items-start gap-2 leading-6 text-slate-300">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                  {project.outcome || (Array.isArray(project.learning_outcomes) ? project.learning_outcomes[0] : project.description)}
                </p>
              </div>
            </div>
          )) || projectIdeas.map((project) => (
            <div key={project.name} className="glass-panel rounded-lg p-5">
              <div className="mb-5 flex items-center justify-between">
                <Puzzle className="h-5 w-5 text-cyan-200" />
                <span className="rounded-lg border border-white/12 px-2 py-1 text-xs text-slate-300">
                  {project.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex items-center gap-2 text-slate-300">
                  <Cpu className="h-4 w-4 text-violet-200" />
                  {project.stack}
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Timer className="h-4 w-4 text-amber-200" />
                  {project.time}
                </p>
                <p className="flex items-start gap-2 leading-6 text-slate-300">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                  {project.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
              Interview Prep System
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              Interview readiness becomes a workflow, too.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Mock scheduling, coding practice, aptitude loops, and readiness scoring live beside
              the roadmap instead of becoming another disconnected todo list.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: Video, title: "Mock Scheduler", detail: "2 AI interviews booked this week" },
              { icon: Code2, title: "Coding Practice", detail: "Arrays, SQL, ML case drills" },
              { icon: ClipboardCheck, title: "Aptitude Workflow", detail: "Quant, logic, communication loops" },
              { icon: Gauge, title: "Readiness Tracker", detail: "72% interview-ready score" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-panel rounded-lg p-5">
                  <Icon className="mb-4 h-5 w-5 text-cyan-200" />
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="analytics" className="border-y border-white/10 bg-slate-950/52 px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="Analytics"
          title="Progress signals without spreadsheet energy"
          body="Completion percentage, skill growth, consistency, weekly productivity, and roadmap completion update as the user works."
        />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5">
          {[
            ["Completion", "68%", CheckCircle2],
            ["Skill Growth", "+41%", TrendingUp],
            ["Consistency", "8.6/10", Activity],
            ["Productivity", "31 hrs", Timer],
            ["Roadmap", "Week 6/24", Route]
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="glass-panel rounded-lg p-5">
              <Icon className="mb-4 h-5 w-5 text-cyan-200" />
              <p className="text-sm text-slate-400">{label as string}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{value as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="px-4 py-20 md:px-6">
        <SectionHeader
          eyebrow="Features"
          title="Built for execution, not passive advice"
          body="The product positioning is clear: this is an AI Career Execution Operating System."
        />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Bot, title: "AI Mentor Layer", detail: "Contextual guidance attached to real workflow objects." },
            { icon: CalendarDays, title: "Calendar Planning", detail: "Daily tasks mapped to available study hours." },
            { icon: GitBranch, title: "Portfolio Pipeline", detail: "Projects become resume bullets and GitHub proof." },
            { icon: BarChart3, title: "Completion Analytics", detail: "Roadmap velocity, consistency, and skill growth." },
            { icon: Database, title: "Supabase Memory", detail: "Ready for progress, milestones, and agent state." },
            { icon: Zap, title: "OpenAI Orchestration", detail: "Ready for research, planning, resume, and interview agents." }
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glass-panel rounded-lg p-5">
                <Icon className="mb-4 h-5 w-5 text-cyan-200" />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 leading-6 text-slate-300">{feature.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="vision" className="border-t border-white/10 px-4 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
              Future Vision
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              Career execution that compounds every week.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              The next layer connects real DeepSearch sources, OpenAI agent calls, Supabase user memory,
              calendar sync, GitHub portfolio checks, and adaptive mock interviews into one career OS.
            </p>
          </div>

          <div className="glass-panel rounded-lg p-5 md:p-6">
            <div className="space-y-4">
              {[
                "Live job-market ingestion",
                "Agentic weekly sprint planning",
                "Supabase-backed execution memory",
                "OpenAI-powered interview simulations",
                "Portfolio quality scoring"
              ].map((item) => (
                <div key={item} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <span className="text-sm font-semibold text-white">{item}</span>
                  <ChevronRight className="h-4 w-4 text-cyan-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
