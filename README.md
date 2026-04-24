# JEMS - Job Matching & Employment System

A comprehensive platform connecting **Students**, **Colleges**, and **Companies** through smart skill-based matching.

## 🎯 Overview

JEMS solves the employment gap by acting as a central bridge between:
- 🎓 **Students** - Find opportunities based on skills, not just grades
- 🏫 **Colleges** - Manage placements and verify student profiles
- 🏢 **Companies** - Hire verified talent efficiently

## 🔑 Core Features

### 👨‍🎓 Student Module
- Profile creation (skills, projects, resume)
- Skill tagging (e.g., React, Java, ML)
- Resume upload & auto parsing
- Internship & job applications
- Application tracking (Applied → Shortlisted → Selected)
- Real-time notifications

### 🏢 Company Module
- Company registration & verification
- Job/internship posting
- Candidate filtering (skills, college, experience)
- Shortlisting & interview scheduling
- Direct communication with candidates

### 🏫 College/Admin Module (Coming Soon)
- Student verification
- Placement management dashboard
- Job posting approval system
- Analytics (placement rate, performance)
- Department & batch management

### 🤖 Smart Matching System
Matches students with jobs based on:
- Skills & projects
- Experience
- Academic performance (optional)
- Reduces irrelevant applications
- Improves hiring efficiency

## 🚀 Routes Structure

### Root Route (`/`)
Landing page showcasing JEMS features and information

### Student Portal (`/student`)
- `/student` - Student landing page
- `/student/login` - Student authentication
- `/student/dashboard` - Main student dashboard
- `/student/goals` - Learning goals (existing)
- `/student/roadmap` - Career roadmap (existing)
- `/student/learn/[moduleId]` - Learning modules (existing)
- `/student/assessment` - Skill assessments (existing)

### Company Portal (`/companies`)
- `/companies` - Company landing page
- `/companies/login` - Company authentication
- `/companies/dashboard` - Company dashboard with job management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: (To be implemented - Node.js + Express recommended)
- **Database**: (To be implemented - MongoDB recommended)

## 📦 Installation

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

## 🌟 Key Differentiators

✅ College-verified ecosystem (trust factor)  
✅ Skill-based matching (not just CGPA)  
✅ Real-time placement tracking  
✅ Centralized platform for all stakeholders  
✅ Automation reduces manual work  

## 📊 Data Models (Planned)

### Student
```typescript
{
  name: string
  email: string
  skills: string[]
  projects: Project[]
  resume: string
  collegeId: string
}
```

### Company
```typescript
{
  name: string
  email: string
  verified: boolean
  jobPosts: Job[]
}
```

### Job
```typescript
{
  title: string
  requiredSkills: string[]
  salary: number
  companyId: string
}
```

### Application
```typescript
{
  studentId: string
  jobId: string
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected'
}
```

## 🎨 UI Components

Built with shadcn/ui including:
- Cards, Buttons, Inputs
- Tabs, Badges, Progress bars
- Dialogs, Dropdowns, Forms
- And 40+ more components

## 📝 Next Steps

1. **Backend Development**
   - Set up Node.js + Express API
   - MongoDB database integration
   - Authentication & authorization

2. **Features to Implement**
   - Real job posting functionality
   - Application submission system
   - Notification system
   - Analytics dashboard
   - College admin portal

3. **Enhancements**
   - Resume parsing with AI
   - Smart matching algorithm
   - Interview scheduling
   - Chat/messaging system

## 📄 License

Private - SIH 2025 Innovation Project

---

Built with ❤️ for Smart India Hackathon 2025
