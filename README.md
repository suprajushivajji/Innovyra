# Innovyra: Smart Career Execution Engine

![Innovyra](public/logo.png)

Innovyra is an AI-powered platform designed to transform your career goals into an actionable, step-by-step execution system. By taking your specific inputs, Innovyra researches the market, plans a custom roadmap, and orchestrates a workflow designed for visible progress and success.

## 🚀 How It Works: The Execution Flow

Innovyra replaces scattered searching with a structured research, reasoning, and execution loop.

### 1. Input (The Goal)
The journey begins when you provide the engine with your specific constraints and goals:
- **Career Domain:** (e.g., Generative AI, Machine Learning, Data Engineering, Cloud AI)
- **Current Skill Level:** (Beginner, Intermediate, Advanced)
- **Timeline:** Time available to achieve the goal (e.g., 3, 6, 9, or 12 Months)
- **Time Commitment:** Hours available per week

### 2. Processing (The AI Engine)
Once you hit "Launch", the backend orchestrates a suite of AI agents powered by **Gemini 2.0 Flash** to process your request:
- **DeepSearch Intelligence (Research Agent):** Scans the market to collect trends, hiring demand, salary signals, and top tech stacks specific to your domain.
- **AI Reasoning Engine (Planning Agent):** Ranks skill dependencies and converts your constraints into a priority-based, multi-phase roadmap.
- **Workflow Synthesis:** Generates a structured breakdown of weekly tasks, milestone goals, and tailored portfolio projects.
- **Interview & Resume Prep (Interview Agent):** Packages your proof-of-work into mock interview loops and resume-building strategies.

### 3. Output (The Dashboard)
The generated data is dynamically rendered into a highly interactive, premium Project HUB:
- **Market Insights:** Real-time data on hiring demand, salary ranges, and GenAI growth.
- **Interactive Roadmap:** A 30/90/180-day execution path with clear milestones.
- **Kanban Board:** Your generated tasks are populated into a drag-and-drop Kanban board (To Learn, In Progress, Completed, etc.).
- **Portfolio Projects:** Custom project recommendations with estimated times, difficulty levels, and tech stacks.
- **Analytics:** Visual tracking of your productivity, workflow synthesis, and milestone progression.

---

## 🛠️ Tech Stack

Innovyra is built using a modern, scalable, and highly responsive technology stack.

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive, and premium UI styling.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid micro-interactions, particle effects, and dynamic transitions.
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend
- **Framework:** Next.js API Routes (Serverless Functions)
- **Architecture:** Orchestrated endpoint (`/api/execution-plan`) that handles concurrent/sequential generation tasks to optimize response times and API rate limits.

### Artificial Intelligence
- **LLM Provider:** [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Model:** `gemini-2.0-flash`
- **Integration:** Custom system prompts and domain-specific knowledge bases (defined in `lib/ai-services.ts`) ensure the generated JSON outputs are highly accurate and tailored to specific tech domains.

### Database & Persistence
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL) integrated for user state and execution plan memory persistence.

---

## 🧩 Core Components

- `app/page.tsx`: The main landing page and interactive application shell. Contains the Hero section, dynamic input forms, Kanban board, and analytics visualizations.
- `app/api/execution-plan/route.ts`: The master API endpoint that orchestrates the workflow. It takes the user's inputs and calls specific AI generation functions.
- `lib/ai-services.ts`: The core AI service layer containing specific prompts and logic for generating Market Research, Roadmaps, Task Plans, Portfolio Projects, Interview Prep, and Analytics using the Gemini API.
- `lib/gemini.ts`: Configuration and initialization for the Google Generative AI SDK.

---

## 💻 Running Locally

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:** Create a `.env.local` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
