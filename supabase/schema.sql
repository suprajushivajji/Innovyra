-- CareerOS AI Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  name text,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

-- Career Goals
create table if not exists career_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  goal text not null,
  timeline text,
  skill_level text,
  preferred_domain text,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

-- AI Research
create table if not exists ai_research (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  trending_skills jsonb,
  salary_insights jsonb,
  hiring_trends jsonb,
  market_analysis text,
  top_tools jsonb,
  industry_growth text,
  created_at timestamp default now() not null
);

-- Roadmaps
create table if not exists roadmaps (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  phase text not null,
  duration text,
  topics jsonb,
  order_index integer,
  created_at timestamp default now() not null
);

-- Tasks
create table if not exists tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  title text not null,
  description text,
  status text default 'To Learn' check (status in ('To Learn', 'In Progress', 'Completed', 'Revision', 'Interview Prep')),
  priority text default 'Medium' check (priority in ('High', 'Medium', 'Low')),
  category text default 'Learning' check (category in ('Learning', 'Project', 'Interview', 'Review')),
  due_date timestamp,
  estimated_hours integer,
  completed_at timestamp,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

-- Milestones
create table if not exists milestones (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  title text not null,
  description text,
  completed boolean default false,
  target_date timestamp,
  completed_at timestamp,
  created_at timestamp default now() not null
);

-- Projects
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  title text not null,
  description text,
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  tech_stack jsonb,
  estimated_days integer,
  learning_outcomes jsonb,
  status text default 'Suggested' check (status in ('Suggested', 'In Progress', 'Completed')),
  started_at timestamp,
  completed_at timestamp,
  created_at timestamp default now() not null
);

-- Interview Prep
create table if not exists interview_prep (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  question text not null,
  category text check (category in ('Coding', 'System Design', 'HR', 'Aptitude')),
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  notes text,
  practiced boolean default false,
  created_at timestamp default now() not null
);

-- Analytics
create table if not exists analytics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  career_goal_id uuid references career_goals(id) on delete cascade,
  completion_percentage integer default 0,
  streak_count integer default 0,
  last_activity_date timestamp,
  total_tasks_completed integer default 0,
  total_projects_completed integer default 0,
  weekly_productivity_score integer default 0,
  roadmap_progress integer default 0,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

-- Progress History (for tracking changes over time)
create table if not exists progress_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  task_id uuid references tasks(id) on delete cascade,
  event_type text check (event_type in ('task_created', 'task_started', 'task_completed', 'task_failed')),
  details jsonb,
  created_at timestamp default now() not null
);

-- Realtime Subscriptions
alter table tasks enable row level security;
alter table roadmaps enable row level security;
alter table milestones enable row level security;
alter table analytics enable row level security;

-- RLS Policies for tasks
create policy "Users can see their own tasks"
  on tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on tasks for delete
  using (auth.uid() = user_id);

-- RLS Policies for analytics
create policy "Users can see their own analytics"
  on analytics for select
  using (auth.uid() = user_id);

create policy "Users can update their own analytics"
  on analytics for update
  using (auth.uid() = user_id);

-- Indexes for performance
create index idx_tasks_user_id on tasks(user_id);
create index idx_tasks_status on tasks(status);
create index idx_roadmaps_user_id on roadmaps(user_id);
create index idx_milestones_user_id on milestones(user_id);
create index idx_projects_user_id on projects(user_id);
create index idx_career_goals_user_id on career_goals(user_id);
create index idx_analytics_user_id on analytics(user_id);

-- Triggers to update timestamps
create or replace function update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_tasks_timestamp before update on tasks
  for each row execute function update_timestamp();

create trigger update_career_goals_timestamp before update on career_goals
  for each row execute function update_timestamp();

create trigger update_analytics_timestamp before update on analytics
  for each row execute function update_timestamp();
