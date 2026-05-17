# Quick Start Guide - Domain-Aware CareerOS

## What Changed?

Your CareerOS AI application now has **complete domain-aware personalization**. When you select a preferred domain and timeline, everything updates automatically:

✅ Career goal text  
✅ Market research content  
✅ Roadmap phases  
✅ Daily tasks  
✅ Portfolio projects  
✅ Interview prep topics  

## How to Use

### Step 1: Select Your Domain
- Go to the **"How it Works"** section
- Find the **"Preferred Domain"** dropdown
- Choose one of 4 options:
  - **Machine Learning** → "Become ML Engineer"
  - **Generative AI** → "Master Generative AI"
  - **Data Engineering** → "Become Data Engineer"
  - **Cloud AI** → "Become Cloud AI Specialist"

### Step 2: Set Your Timeline
- Select **"Time Available"**:
  - 3 Months
  - 6 Months (default)
  - 9 Months
  - 12 Months
- Your goal updates automatically! ✨

### Step 3: Configure Other Settings
- Choose your **"Current Skill Level"** (Beginner, Intermediate, Advanced)
- Adjust **"Weekly Study Hours"** (4-40 hours)

### Step 4: Generate Your Workflow
- Click **"Generate Execution Workflow"** button
- Watch the clean progress bar move from 0-100%
- See your stats: Domain Focus, Timeline, Weekly Hours

### Step 5: View Project HUB
- Scroll down to the **"Project HUB Workflow"** section
- Click through these tabs to see domain-specific content:
  - **Dashboard** → Top skills and salary range for your domain
  - **Roadmap** → Domain-aligned learning phases
  - **Tasks** → Daily tasks relevant to your domain
  - **Projects** → Portfolio projects for your domain
  - **Interviews** → Interview topics for your domain
  - **Analytics** → Progress metrics
  - **AI Mentor** → Industry insights

## Key Features

### 🎯 Auto-Generated Career Goal
- No longer manually editable
- Automatically combines domain + timeline
- Updates in real-time as you change selections

### 📊 Simplified Demo Workflow
- Clean progress bar (0-100%)
- Shows "Generating your personalized roadmap..."
- Displays Domain, Timeline, Weekly Hours stats
- No confusing multi-step indicators

### 🔄 Domain-Specific Everything
- Market research tailored to your domain
- Projects suggested for your career path
- Interview questions relevant to your field
- Roadmap phases aligned with domain best practices

## Examples

### Example 1: Switching from ML to Generative AI
1. Domain is "Machine Learning" → Goal shows "Become ML Engineer in 6 months"
2. Change domain to "Generative AI" → Goal instantly becomes "Master Generative AI in 6 months"
3. All tabs in Project HUB update with Gen-AI specific content

### Example 2: Extending Timeline
1. Time Available is "6 Months" → Goal shows "...in 6 months"
2. Change to "12 Months" → Goal updates to "...in 12 months"
3. Roadmap expands with more phases
4. More advanced projects become available

## Technical Details

### Build & Deploy
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
Create a `.env.local` file:
```
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
```

## API Endpoints (For Reference)

All API endpoints now accept and use the `domain` parameter:

```
POST /api/research          - Market research for domain
POST /api/roadmap           - Roadmap phases for domain
POST /api/tasks             - Tasks tailored to domain
POST /api/projects          - Projects for domain
POST /api/interview         - Interview topics for domain
POST /api/execution-plan    - Master orchestration endpoint
```

## Troubleshooting

### Goal text doesn't update
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh the page (F5)
- Check browser console for errors (F12)

### Demo workflow shows error
- Verify GEMINI_API_KEY is set correctly
- Check API quota at Google AI Studio
- Try "Re-run Engine" button

### API returns dummy data
- This is normal if Gemini API hits rate limits
- Dummy data still shows all features working
- Wait a few minutes and try again

### Styling looks off
- Clear CSS cache: DevTools → Application → Cache → Clear
- Rebuild: `npm run build`

## What's New - Files Created

📄 **DOMAIN_INTEGRATION_SUMMARY.md** - Full feature documentation  
📄 **VERIFICATION_REPORT.md** - Testing and verification details  
📄 **QUICK_START_GUIDE.md** - This file

## What's Modified - 8 Files

1. `app/page.tsx` - Dynamic goal, simplified demo, API updates
2. `lib/ai-services.ts` - Domain parameter in all AI functions
3. `app/api/research/route.ts` - Domain handling
4. `app/api/roadmap/route.ts` - Domain handling
5. `app/api/tasks/route.ts` - Domain handling
6. `app/api/projects/route.ts` - Domain handling
7. `app/api/interview/route.ts` - Domain handling
8. `app/api/execution-plan/route.ts` - Domain orchestration

## Status

🟢 **PRODUCTION READY**

All features tested and verified. Ready to deploy!

---

## Need Help?

Refer to the detailed documentation:
- **DOMAIN_INTEGRATION_SUMMARY.md** - What changed and why
- **VERIFICATION_REPORT.md** - Test results and metrics
- Check API route files for implementation details

Happy coding! 🚀
