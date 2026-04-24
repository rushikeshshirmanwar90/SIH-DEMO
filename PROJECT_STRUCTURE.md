# JMES Project Structure

## 📁 Directory Overview

```
jmes/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Landing page (/)
│   │
│   ├── student/                 # Student Portal
│   │   ├── page.tsx            # Student landing (/student)
│   │   ├── login/              
│   │   │   └── page.tsx        # Student auth (/student/login)
│   │   ├── dashboard/          
│   │   │   └── page.tsx        # Student dashboard (/student/dashboard)
│   │   ├── goals/              
│   │   │   └── page.tsx        # Learning goals
│   │   ├── roadmap/            
│   │   │   └── page.tsx        # Career roadmap
│   │   ├── learn/              
│   │   │   └── [moduleId]/     
│   │   │       └── page.tsx    # Learning modules
│   │   └── assessment/         
│   │       └── page.tsx        # Skill assessments
│   │
│   └── companies/               # Company Portal
│       ├── page.tsx            # Company landing (/companies)
│       ├── login/              
│       │   └── page.tsx        # Company auth (/companies/login)
│       └── dashboard/          
│           └── page.tsx        # Company dashboard (/companies/dashboard)
│
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components (50 files)
│   ├── header.tsx              # Main navigation
│   ├── footer.tsx              # Footer component
│   ├── hero-section.tsx        # Landing hero
│   ├── features-section.tsx    # Features showcase
│   ├── how-it-works-section.tsx
│   ├── stats-section.tsx
│   ├── models-section.tsx
│   ├── cta-section.tsx
│   └── theme-provider.tsx
│
├── lib/                        # Utilities
│   └── utils.ts               # Helper functions
│
├── hooks/                      # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── public/                     # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   └── ...
│
└── styles/                     # Global styles
    └── globals.css
```

## 🎯 Route Map

### Public Routes
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Landing page with JMES info | ✅ Complete |
| `/student` | Student portal landing | ✅ Complete |
| `/companies` | Company portal landing | ✅ Complete |

### Student Routes (Protected)
| Route | Description | Status |
|-------|-------------|--------|
| `/student/login` | Authentication | ✅ Complete |
| `/student/dashboard` | Main dashboard | ✅ Complete |
| `/student/goals` | Learning goals | ✅ Existing |
| `/student/roadmap` | Career roadmap | ✅ Existing |
| `/student/learn/[id]` | Learning modules | ✅ Existing |
| `/student/assessment` | Skill assessments | ✅ Existing |

### Company Routes (Protected)
| Route | Description | Status |
|-------|-------------|--------|
| `/companies/login` | Authentication | ✅ Complete |
| `/companies/dashboard` | Job management | ✅ Complete |

### Admin Routes (Planned)
| Route | Description | Status |
|-------|-------------|--------|
| `/admin/login` | Admin authentication | 🔜 Planned |
| `/admin/dashboard` | College admin panel | 🔜 Planned |
| `/admin/students` | Student verification | 🔜 Planned |
| `/admin/companies` | Company verification | 🔜 Planned |
| `/admin/analytics` | Placement analytics | 🔜 Planned |

## 🎨 Component Architecture

### Layout Components
- **Header**: Navigation with portal links
- **Footer**: Site-wide footer
- **Theme Provider**: Dark/light mode support

### Landing Page Sections
- **Hero Section**: Main CTA with portal buttons
- **Features Section**: 6 key features
- **How It Works**: Step-by-step process
- **Stats Section**: Platform statistics
- **Models Section**: Platform models
- **CTA Section**: Final call-to-action

### Portal Components
- **Student Dashboard**: Applications, opportunities, profile
- **Company Dashboard**: Job posts, applications, candidates

## 🔐 Authentication Flow

### Student Flow
```
/student → /student/login → /student/dashboard
```

### Company Flow
```
/companies → /companies/login → /companies/dashboard
```

## 📊 Data Flow (To Be Implemented)

```
Frontend (Next.js)
    ↓
API Routes (Next.js API)
    ↓
Backend (Node.js + Express)
    ↓
Database (MongoDB)
```

## 🎯 Key Features by Portal

### Student Portal Features
- ✅ Profile completion tracking
- ✅ Skill management
- ✅ Project showcase
- ✅ Resume upload
- ✅ Job recommendations with match %
- ✅ Application tracking
- ✅ Real-time notifications

### Company Portal Features
- ✅ Job posting management
- ✅ Application review
- ✅ Candidate filtering
- ✅ Skill-based search
- ✅ Shortlisting system
- ✅ Analytics dashboard

## 🚀 Next Development Phases

### Phase 1: Backend Setup (Current)
- [ ] Set up Express.js API
- [ ] MongoDB connection
- [ ] Authentication (JWT)
- [ ] User models

### Phase 2: Core Features
- [ ] Job posting CRUD
- [ ] Application system
- [ ] Matching algorithm
- [ ] Notification system

### Phase 3: Advanced Features
- [ ] Resume parsing AI
- [ ] Interview scheduling
- [ ] Chat system
- [ ] Analytics dashboard

### Phase 4: Admin Portal
- [ ] College admin interface
- [ ] Verification system
- [ ] Approval workflows
- [ ] Reporting tools

## 📝 Notes

- All UI components use shadcn/ui for consistency
- Tailwind CSS for styling
- TypeScript for type safety
- Responsive design for all screen sizes
- Dark mode support ready
