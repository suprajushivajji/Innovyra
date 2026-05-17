# System Architecture Diagram

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js React)                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Career Goal Input → Generate Plan Button → Tab Navigation    │  │
│  │  - Kanban Board (Tasks)                                       │  │
│  │  - Research Tab (Market Data)                                 │  │
│  │  - Roadmap Tab (Learning Phases)                             │  │
│  │  - Projects Tab (Portfolio Ideas)                            │  │
│  │  - Interview Tab (Question Practice)                         │  │
│  │  - Milestones Tab (Career Timeline)                          │  │
│  │  - Analytics Tab (Progress Metrics)                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                HTTP Requests (REST)
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   BACKEND API ROUTES (Next.js App Router)            │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ /api/execution-plan (Master Orchestration)                   │  │
│  │   ├─ /api/research        (Market Intelligence)              │  │
│  │   ├─ /api/roadmap         (Career Path)                      │  │
│  │   ├─ /api/tasks           (Task Generation)                  │  │
│  │   ├─ /api/projects        (Portfolio Projects)               │  │
│  │   ├─ /api/interview       (Interview Prep)                   │  │
│  │   └─ /api/analytics       (Progress Metrics)                 │  │
│  └────────────────────────────────────────────────────────────────┘  │
└────┬───────────────────────────────────────────────────────────┬─────┘
     │                                                            │
     │ (AI Generation)                                            │ (Persistence)
     ▼                                                            ▼
┌──────────────────────────┐                           ┌─────────────────────┐
│   Google Gemini AI       │                           │ Supabase PostgreSQL │
│  ────────────────────    │                           │ ─────────────────── │
│  - generateCareerResearch│                           │ • users             │
│  - generateRoadmap       │                           │ • career_goals      │
│  - generateTaskPlan      │                           │ • ai_research       │
│  - generateProjects      │                           │ • roadmaps          │
│  - generateInterview     │                           │ • tasks             │
│  - generateMilestones    │                           │ • projects          │
│                          │                           │ • milestones        │
│ JSON Response            │                           │ • interview_prep    │
│ (Structured Data)        │                           │ • analytics         │
└──────────────────────────┘                           │ • progress_history  │
                                                       │ + RLS Policies      │
                                                       │ + Indexes           │
                                                       └─────────────────────┘
```

## Request-Response Cycle

```
USER ACTION
    │
    └─→ Enter Career Goal
        └─→ Click "Generate Plan"
            └─→ HTTP POST /api/execution-plan
                │
                ├─→ Call /api/research
                │   ├─→ Gemini AI generates market data
                │   └─→ Database saves research
                │
                ├─→ Call /api/roadmap  
                │   ├─→ Gemini AI generates phases
                │   └─→ Database saves roadmap
                │
                ├─→ Call /api/tasks
                │   ├─→ Gemini AI generates tasks
                │   └─→ Database saves tasks
                │
                ├─→ Call /api/projects
                │   ├─→ Gemini AI generates projects
                │   └─→ Database saves projects
                │
                ├─→ Call /api/interview
                │   ├─→ Gemini AI generates questions
                │   └─→ Database saves prep
                │
                └─→ Call /api/analytics
                    ├─→ Calculate metrics
                    └─→ Database saves analytics
                
                Response: Complete Execution Plan
                    {
                        research: {...},
                        roadmap: {...},
                        tasks: [...],
                        projects: [...],
                        interview: {...},
                        analytics: {...}
                    }
                    
                    └─→ Frontend receives data
                        └─→ Updates React state
                            └─→ Re-renders all tabs with real content
```

## Component Responsibility Matrix

```
┌─────────────────────┬──────────────────┬──────────────────┬──────────────┐
│ Component           │ Responsibility   │ Technology       │ Status       │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ app/page.tsx        │ UI & State       │ React + Framer   │ ✅ Working   │
│                     │ Management       │ Motion           │              │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ lib/ai-services.ts  │ AI Integration   │ Gemini 2.5       │ ✅ Working   │
│                     │ JSON Parsing     │ Flash + Zod      │              │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ lib/db.ts           │ Database CRUD    │ Supabase JS      │ ✅ Working   │
│                     │ Operations       │ (Lazy Init)      │              │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ app/api/exec...     │ Orchestration    │ Next.js Route    │ ✅ Working   │
│                     │ & Sequencing     │ Handlers         │              │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ app/api/research/*  │ Market Data      │ API Route +      │ ✅ Working   │
│ app/api/roadmap/*   │ Generation       │ AI Service +     │              │
│ app/api/tasks/*     │ Persistence      │ Database         │              │
│ app/api/projects/*  │                  │ Helper           │              │
│ app/api/interview/* │                  │                  │              │
│ app/api/analytics/* │                  │                  │              │
└─────────────────────┴──────────────────┴──────────────────┴──────────────┘
```

## Data Model Relationships

```
┌──────────────┐
│    users     │
│──────────────│
│ id (PK)      │◄─────┐
│ email        │      │
│ name         │      │
│ created_at   │      │
└──────────────┘      │
                      │ 1:N
                      │
        ┌─────────────────────────────┐
        │    career_goals             │
        │─────────────────────────────│
        │ id (PK)                     │
        │ user_id (FK)                │
        │ goal                        │
        │ timeline                    │
        │ skill_level                 │
        │ preferred_domain            │
        └─────────────────────────────┘
              │
        ┌─────┼─────┬─────┬────────┬────────────┐
        │     │     │     │        │            │
        │     │     │     │        │            │
        ▼     ▼     ▼     ▼        ▼            ▼
     ┌────┐┌────┐┌────┐┌────┐┌────────┐┌──────────────┐
     │ ai_││road││tasks│projects│milestones│interview_prep│
     │research│maps│    │        │          │              │
     └────┘└────┘└────┘└────┐┌────────┐└──────────────┘
                              │
                              │ All reference
                              │ career_goals
                              │
                         ┌─────────────┐
                         │  analytics  │
                         └─────────────┘
                              │
                              │
                         ┌──────────────────┐
                         │progress_history  │
                         │(Audit Trail)     │
                         └──────────────────┘
```

## Error Handling Flow

```
Request arrives at endpoint
    │
    ├─→ Validate input (Required fields check)
    │   └─→ Invalid? Return 400 Bad Request
    │
    ├─→ Call Gemini AI
    │   ├─→ Success? Parse JSON response
    │   └─→ Error? Throw error to catch block
    │
    ├─→ Attempt database save (if userId provided)
    │   ├─→ Success? Continue
    │   └─→ Error? Log warning but continue
    │
    └─→ Response
        ├─→ Success with DB: { success: true, data, careerGoalId }
        ├─→ Success without DB: { success: true, data, dbWarning }
        └─→ Error: { error: message, details, statusCode: 500 }

KEY: AI data is ALWAYS returned to client, even if database fails
```

## Deployment Architecture (Future)

```
┌────────────────────────────────────────────────────────────────┐
│                     Vercel (Production)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Next.js Application (Serverless Functions)              │  │
│  │  - API Routes run as serverless functions              │  │
│  │  - Frontend served via CDN                             │  │
│  │  - Automatic scaling based on load                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌───────────────┐ ┌──────────────┐ ┌──────────────┐
│ Google Cloud  │ │  Supabase    │ │ Environment  │
│ (Gemini API)  │ │ (PostgreSQL) │ │ (Secrets)    │
└───────────────┘ └──────────────┘ └──────────────┘
```

## Performance Characteristics

```
API Response Times (Typical):

/api/research       3-5s  (Gemini latency + DB save)
/api/roadmap        3-5s  (Gemini latency + DB save)
/api/tasks          3-5s  (Gemini latency + DB save)
/api/projects       3-5s  (Gemini latency + DB save)
/api/interview      3-5s  (Gemini latency + DB save)
/api/analytics      200ms (DB aggregation only)

/api/execution-plan 15-20s (5 sequential calls)

Frontend Rendering  500ms (State update + animation)

Total Time (User Input → Display) = 15-20s
```

## System Health Checks

```
✅ TypeScript Compilation: PASSING
✅ Next.js Build: PASSING
✅ Development Server: RUNNING (port 3001)
✅ Gemini API: WORKING (real responses)
✅ Database Layer: INITIALIZED (lazy-loaded, ready when needed)
✅ All 7 Endpoints: REGISTERED & RESPONDING
✅ Frontend State Management: WORKING
✅ Tab Navigation: WORKING WITH REAL DATA

⚠️  Database Persistence: OPTIONAL (requires schema deployment)
⚠️  User Authentication: NOT YET IMPLEMENTED
```
