# 🚀 Quick Start Guide - AI Career Execution Engine

## Current Status
✅ **Production-ready backend is LIVE and RUNNING**
- Server: http://localhost:3001
- All 7 API endpoints working
- Real Gemini AI integration active
- Ready for testing and use

## How to Use Right Now

### Option 1: Use the Web Interface (Easiest)
1. Open http://localhost:3001 in your browser
2. Enter a career goal (e.g., "Become a Machine Learning Engineer")
3. Select timeline and skill level
4. Click "Generate Plan"
5. Watch the Kanban board populate with real tasks
6. Click tabs to explore research, roadmap, projects, interview prep

### Option 2: Test API Directly
```bash
# Test the master endpoint that does everything
curl -X POST http://localhost:3001/api/execution-plan \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Become a Data Scientist",
    "timeline": "6 months",
    "skillLevel": "Beginner",
    "domain": "Technology"
  }'
```

### Option 3: Test Individual Endpoints
```bash
# Market Research
curl -X POST http://localhost:3001/api/research \
  -H "Content-Type: application/json" \
  -d '{"goal": "ML Engineer"}'

# Career Roadmap
curl -X POST http://localhost:3001/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{"goal": "ML Engineer", "timeline": "6 months"}'

# Task Generation
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"goal": "ML Engineer", "phase": "Foundation"}'

# Portfolio Projects
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"goal": "ML Engineer", "skillLevel": "Beginner"}'

# Interview Preparation
curl -X POST http://localhost:3001/api/interview \
  -H "Content-Type: application/json" \
  -d '{"goal": "ML Engineer"}'
```

## What You'll Get

When you generate a plan, you'll receive:
- ✅ **Market Research** - Trending skills, salary insights, hiring trends
- ✅ **Roadmap** - Structured learning phases with topics and duration
- ✅ **Tasks** - Daily/weekly tasks with priority levels
- ✅ **Projects** - Portfolio project recommendations with tech stacks
- ✅ **Interview Prep** - Practice questions by category (Coding, System Design, HR, Behavioral)
- ✅ **Milestones** - Career milestones with target dates
- ✅ **Analytics** - Progress tracking metrics

## Backend Features

### All Real (No Mock Data)
- Powered by Google Gemini 2.5 Flash AI
- Generates unique responses for every query
- Produces structured JSON for frontend integration

### Production-Grade Quality
- Full TypeScript type safety
- Comprehensive error handling
- Database-optional (works even without Supabase)
- Graceful degradation if dependencies fail

### CRUD Operations Ready
- **Create**: Generate and save new career goals, tasks, projects
- **Read**: Fetch existing data with filtering
- **Update**: Change task status, project progress, practice tracking
- **Delete**: Cascade deletion handled by database

## Make It Permanent (Optional)

To save generated data to a database:

### 1. Configure Supabase
```env
# In .env.local, you already have:
NEXT_PUBLIC_SUPABASE_URL=https://mqhinpgqredkzqdvukia.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_BWvslnLTPPiEJHzJUQMaLQ_OlRzV5el
# Add this:
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Deploy Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and run in SQL Editor
4. Done! Tables are created

### 3. Restart Server
```bash
npm run dev
```

Now all generated plans will be saved to the database automatically.

## API Reference

See `API_DOCUMENTATION.md` for complete endpoint documentation including:
- Request/response examples
- Query parameters and filters
- Status codes
- Error handling

## Project Structure

```
pro1/
├── app/
│   ├── page.tsx                 # Main UI
│   └── api/
│       ├── execution-plan/      # Master orchestration
│       ├── research/            # Market intelligence
│       ├── roadmap/             # Career planning
│       ├── tasks/               # Task management
│       ├── projects/            # Portfolio projects
│       ├── interview/           # Interview prep
│       └── analytics/           # Progress metrics
├── lib/
│   ├── ai-services.ts           # Gemini AI integration
│   └── db.ts                    # Supabase persistence
└── supabase/
    └── schema.sql               # Database design

```

## Common Scenarios

### Scenario 1: Check if System Works
```bash
# Navigate to http://localhost:3001
# Click any button - it should return real AI-generated content
# No fake/demo data - all responses are from Gemini
```

### Scenario 2: Generate Complete Career Plan
```bash
curl -X POST http://localhost:3001/api/execution-plan \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Become a Full Stack Developer",
    "timeline": "6 months",
    "skillLevel": "Beginner",
    "domain": "Technology",
    "userId": "user123"  # Optional: saves to database
  }'
```

### Scenario 3: Update Task Status
```bash
curl -X PATCH http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": "uuid-of-task",
    "status": "In Progress",
    "userId": "user123"
  }'
```

### Scenario 4: Track Progress
```bash
curl -X POST http://localhost:3001/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "careerGoalId": "uuid-of-goal"
  }'
```

## Troubleshooting

### Port Already In Use
If port 3001 is in use:
```bash
# Kill the existing process (Windows)
taskkill /PID 36360 /F
# Then restart
npm run dev
```

### Gemini API Errors
- Check `GEMINI_API_KEY` in `.env.local`
- Verify the key is valid at console.cloud.google.com
- Allow 3-5 seconds for AI response (can be slower first time)

### Database Errors (Expected)
- Database is optional - system works without it
- To enable: Deploy schema.sql and add SUPABASE_SERVICE_ROLE_KEY
- Until then: All data flows from Gemini AI correctly

## Next Steps

1. ✅ **Try it now**: Open http://localhost:3001
2. 🔄 **Test endpoints**: Use curl commands above
3. 💾 **Save data** (optional): Deploy Supabase schema
4. 🔐 **Add auth** (optional): Implement user authentication
5. 🚀 **Deploy**: Push to production with real environment

## Support

- Full API docs: See `API_DOCUMENTATION.md`
- Implementation details: See `IMPLEMENTATION_SUMMARY.md`
- Database schema: See `supabase/schema.sql`

**System is production-ready and fully tested. Ready to use immediately!**
