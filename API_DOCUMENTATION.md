# AI Career Execution Engine - Backend API Documentation

## Overview

This is a **production-ready AI-powered Career Execution Operating System** that orchestrates complete career planning workflows with real Gemini AI integration and Supabase persistence.

## Architecture

### System Flow

```
User Goal Input → Market Research (Gemini AI)
                → Career Roadmap Generation
                → Task Planning
                → Portfolio Project Recommendations
                → Interview Preparation
                → Analytics Calculation
                → Database Persistence (Supabase)
```

## API Endpoints

### 1. **POST /api/execution-plan** (Master Orchestration)
**Complete career execution plan in one call**
```typescript
POST /api/execution-plan
{
  "goal": "Become a Machine Learning Engineer",
  "timeline": "6 months",
  "skillLevel": "Beginner",
  "domain": "Technology",
  "userId": "user123"
}

Response:
{
  "success": true,
  "careerGoalId": "uuid",
  "executionPlan": {
    "research": {...},
    "roadmap": {...},
    "milestones": [...],
    "tasks": [...],
    "projects": [...],
    "interview": {...},
    "analytics": {...}
  }
}
```

### 2. **POST /api/research** (Market Intelligence)
**Generates trending skills, salary insights, hiring trends, market analysis**
```typescript
POST /api/research
{
  "goal": "ML Engineer",
  "timeline": "6 months",
  "skillLevel": "Beginner",
  "domain": "Technology",
  "userId": "user123" // optional - saves to DB if provided
}

Returns:
{
  "trending_skills": [...],
  "salary_insights": {...},
  "hiring_trends": {...},
  "top_tools": [...],
  "industry_growth": {...}
}
```

### 3. **POST /api/roadmap** (Career Path Planning)
**Generates structured learning phases and milestones**
```typescript
POST /api/roadmap
{
  "goal": "ML Engineer",
  "timeline": "6 months",
  "skillLevel": "Beginner",
  "careerGoalId": "uuid",
  "userId": "user123"
}

Returns:
{
  "roadmap": {
    "phases": [
      {
        "name": "Foundation",
        "duration": "2 months",
        "topics": [...],
        "milestones": [...]
      }
    ]
  },
  "milestones": [...]
}
```

### 4. **POST /api/tasks** (Task Generation)
**Creates actionable daily/weekly tasks**
```typescript
POST /api/tasks
{
  "goal": "ML Engineer",
  "phase": "Foundation",
  "careerGoalId": "uuid",
  "userId": "user123"
}

GET /api/tasks?userId=user123&status=To%20Learn
PATCH /api/tasks
{
  "taskId": "uuid",
  "status": "In Progress",
  "userId": "user123"
}

Status values: "To Learn" | "In Progress" | "Completed"
```

### 5. **POST /api/projects** (Portfolio Projects)
**Recommends portfolio projects by difficulty level**
```typescript
POST /api/projects
{
  "goal": "ML Engineer",
  "skillLevel": "Beginner",
  "careerGoalId": "uuid",
  "userId": "user123"
}

GET /api/projects?userId=user123&difficulty=Beginner
PATCH /api/projects
{
  "projectId": "uuid",
  "status": "In Progress",
  "userId": "user123"
}

Difficulty: "Beginner" | "Intermediate" | "Advanced"
Status: "Suggested" | "In Progress" | "Completed"
```

### 6. **POST /api/interview** (Interview Preparation)
**Generates interview questions by category**
```typescript
POST /api/interview
{
  "goal": "ML Engineer",
  "careerGoalId": "uuid",
  "userId": "user123"
}

GET /api/interview?userId=user123&category=coding
PATCH /api/interview
{
  "questionId": "uuid",
  "practiced": true,
  "userId": "user123"
}

Categories: "Coding" | "System Design" | "HR" | "Behavioral"
```

### 7. **GET/POST /api/analytics** (Progress Tracking)
**Calculates completion percentage, streak count, productivity score**
```typescript
GET /api/analytics?userId=user123&careerGoalId=uuid
POST /api/analytics
{
  "userId": "user123",
  "careerGoalId": "uuid"
}

Returns:
{
  "completion_percentage": 45,
  "streak_count": 7,
  "productivity_score": 78,
  "roadmap_progress": 50
}
```

## Database Schema

**9 Tables with RLS (Row Level Security)**:
1. **users** - User authentication & profiles
2. **career_goals** - User career goals with timeline & skill level
3. **ai_research** - Market research data (JSONB)
4. **roadmaps** - Learning phases with topics
5. **tasks** - Daily/weekly tasks with status tracking
6. **milestones** - Career milestones with target dates
7. **projects** - Portfolio projects with tech stacks
8. **interview_prep** - Interview questions grouped by category
9. **analytics** - Progress metrics and KPIs
10. **progress_history** - Activity log for streak calculation

## Setup Instructions

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Configure Environment Variables**
Create `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. **Deploy Database Schema**
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Run the SQL to create all tables, indexes, and RLS policies

### 4. **Run Development Server**
```bash
npm run dev
```
Server runs on `http://localhost:3001`

## Testing the API

### Test Full Execution Plan
```bash
curl -X POST http://localhost:3001/api/execution-plan \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Become a Frontend Developer",
    "timeline": "3 months",
    "skillLevel": "Beginner",
    "domain": "Technology"
  }'
```

### Test Individual Endpoint
```bash
curl -X POST http://localhost:3001/api/research \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Data Scientist",
    "timeline": "6 months",
    "skillLevel": "Intermediate"
  }'
```

## Error Handling

All endpoints include:
- **Input validation** - Required fields checked
- **Database error fallback** - Returns AI data even if DB fails
- **Detailed error messages** - Helps with debugging
- **500 status codes** - For server errors
- **400 status codes** - For bad requests

## Production Considerations

- ✅ TypeScript with strict type checking
- ✅ Lazy Supabase initialization (no errors if credentials missing)
- ✅ Comprehensive error handling
- ✅ Database transactions where needed
- ✅ RLS policies for data isolation
- ✅ Indexed queries for performance
- ❌ Missing: Authentication middleware (needs Supabase Auth implementation)
- ❌ Missing: Rate limiting (needs middleware)
- ❌ Missing: Input validation schemas (should add Zod/Joi)

## Next Steps

1. **Deploy Supabase Schema** - Run schema.sql in Supabase SQL Editor
2. **Add Authentication** - Implement Supabase Auth signup/login
3. **Add Realtime Updates** - Subscribe to task/analytics changes
4. **Implement Validation** - Add Zod schemas to all endpoints
5. **Add Rate Limiting** - Prevent API abuse
6. **Set Up Monitoring** - Add error logging & analytics

## Frontend Integration

The frontend automatically calls these endpoints when users:
1. Enter a career goal → `/api/execution-plan` (orchestrates all 5 steps)
2. Switch tabs → Individual endpoints fetch fresh data
3. Update task status → `/api/tasks` PATCH endpoint
4. View analytics → `/api/analytics` GET endpoint

All data flows from Gemini AI → Supabase database → Frontend state management → React components.
