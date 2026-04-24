"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Briefcase, Target, Bell, User, FileText, TrendingUp, Brain, Award, RefreshCw, ArrowRight, Plus, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const [assessmentData, setAssessmentData] = useState<any>(null)
  const [goalsData, setGoalsData] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Git"])
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false)
  const [skillTestStep, setSkillTestStep] = useState<'details' | 'test' | 'results'>('details')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({})
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: "",
    experience: "",
    category: ""
  })

  // Skill test questions (will be generated based on skill name)
  const [skillTestQuestions, setSkillTestQuestions] = useState<any[]>([])

  useEffect(() => {
    // Load assessment data from localStorage
    const storedResults = localStorage.getItem('assessmentResults')
    if (storedResults) {
      setAssessmentData(JSON.parse(storedResults))
    }

    // Load goals data from localStorage
    const storedGoals = localStorage.getItem('studentGoals')
    if (storedGoals) {
      setGoalsData(JSON.parse(storedGoals))
    }

    // Load skills from localStorage
    const storedSkills = localStorage.getItem('studentSkills')
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills))
    }
  }, [])

  const handleRetakeAssessment = () => {
    // Clear previous assessment data
    localStorage.removeItem('studentIQ')
    localStorage.removeItem('studentProficiency')
    localStorage.removeItem('assessmentResults')
    window.location.href = "/student/assessment"
  }

  const handleUpdateGoals = () => {
    window.location.href = "/student/goals"
  }

  const generateSkillTest = (skillName: string, category: string) => {
    // Generate skill-specific technical questions
    // This is a comprehensive test with actual technical questions
    
    const skillLower = skillName.toLowerCase()
    
    // Skill-specific question banks
    const skillQuestions: Record<string, any[]> = {
      // React Questions
      'react': [
        {
          id: 1,
          question: "What is the purpose of the useEffect hook in React?",
          options: [
            { value: "a", label: "To create state variables" },
            { value: "b", label: "To perform side effects in function components" },
            { value: "c", label: "To handle form submissions" },
            { value: "d", label: "To create context providers" },
          ],
          correctAnswer: "b",
        },
        {
          id: 2,
          question: "What is the Virtual DOM in React?",
          options: [
            { value: "a", label: "A copy of the actual DOM kept in memory" },
            { value: "b", label: "A database for storing component data" },
            { value: "c", label: "A testing framework" },
            { value: "d", label: "A CSS preprocessor" },
          ],
          correctAnswer: "a",
        },
        {
          id: 3,
          question: "How do you pass data from parent to child component in React?",
          options: [
            { value: "a", label: "Using state" },
            { value: "b", label: "Using props" },
            { value: "c", label: "Using refs" },
            { value: "d", label: "Using context only" },
          ],
          correctAnswer: "b",
        },
        {
          id: 4,
          question: "What does useState return?",
          options: [
            { value: "a", label: "A single value" },
            { value: "b", label: "An array with state value and setter function" },
            { value: "c", label: "An object with state properties" },
            { value: "d", label: "A promise" },
          ],
          correctAnswer: "b",
        },
        {
          id: 5,
          question: "What is JSX in React?",
          options: [
            { value: "a", label: "A JavaScript library" },
            { value: "b", label: "A syntax extension for JavaScript" },
            { value: "c", label: "A CSS framework" },
            { value: "d", label: "A testing tool" },
          ],
          correctAnswer: "b",
        },
      ],
      
      // Python Questions
      'python': [
        {
          id: 1,
          question: "What is the output of: print(type([]))?",
          options: [
            { value: "a", label: "<class 'list'>" },
            { value: "b", label: "<class 'array'>" },
            { value: "c", label: "<class 'tuple'>" },
            { value: "d", label: "<class 'dict'>" },
          ],
          correctAnswer: "a",
        },
        {
          id: 2,
          question: "Which keyword is used to define a function in Python?",
          options: [
            { value: "a", label: "function" },
            { value: "b", label: "def" },
            { value: "c", label: "func" },
            { value: "d", label: "define" },
          ],
          correctAnswer: "b",
        },
        {
          id: 3,
          question: "What is a list comprehension in Python?",
          options: [
            { value: "a", label: "A way to import lists" },
            { value: "b", label: "A concise way to create lists" },
            { value: "c", label: "A method to sort lists" },
            { value: "d", label: "A type of loop" },
          ],
          correctAnswer: "b",
        },
        {
          id: 4,
          question: "What does the 'self' parameter represent in Python classes?",
          options: [
            { value: "a", label: "The class itself" },
            { value: "b", label: "The instance of the class" },
            { value: "c", label: "The parent class" },
            { value: "d", label: "A global variable" },
          ],
          correctAnswer: "b",
        },
        {
          id: 5,
          question: "Which of these is NOT a valid Python data type?",
          options: [
            { value: "a", label: "list" },
            { value: "b", label: "tuple" },
            { value: "c", label: "array" },
            { value: "d", label: "dict" },
          ],
          correctAnswer: "c",
        },
      ],
      
      // JavaScript Questions
      'javascript': [
        {
          id: 1,
          question: "What is the difference between '==' and '===' in JavaScript?",
          options: [
            { value: "a", label: "No difference" },
            { value: "b", label: "=== checks type and value, == only checks value" },
            { value: "c", label: "== is faster than ===" },
            { value: "d", label: "=== is deprecated" },
          ],
          correctAnswer: "b",
        },
        {
          id: 2,
          question: "What is a closure in JavaScript?",
          options: [
            { value: "a", label: "A way to close the browser" },
            { value: "b", label: "A function that has access to outer function's variables" },
            { value: "c", label: "A method to end loops" },
            { value: "d", label: "A type of object" },
          ],
          correctAnswer: "b",
        },
        {
          id: 3,
          question: "What does 'async/await' do in JavaScript?",
          options: [
            { value: "a", label: "Makes code run faster" },
            { value: "b", label: "Handles asynchronous operations more cleanly" },
            { value: "c", label: "Creates multiple threads" },
            { value: "d", label: "Compiles code" },
          ],
          correctAnswer: "b",
        },
        {
          id: 4,
          question: "What is the purpose of 'this' keyword in JavaScript?",
          options: [
            { value: "a", label: "To create variables" },
            { value: "b", label: "To refer to the current object" },
            { value: "c", label: "To import modules" },
            { value: "d", label: "To define functions" },
          ],
          correctAnswer: "b",
        },
        {
          id: 5,
          question: "What is the difference between 'let' and 'var'?",
          options: [
            { value: "a", label: "No difference" },
            { value: "b", label: "let is block-scoped, var is function-scoped" },
            { value: "c", label: "var is newer than let" },
            { value: "d", label: "let is faster" },
          ],
          correctAnswer: "b",
        },
      ],
      
      // Node.js Questions
      'node.js': [
        {
          id: 1,
          question: "What is Node.js?",
          options: [
            { value: "a", label: "A JavaScript framework" },
            { value: "b", label: "A JavaScript runtime built on Chrome's V8 engine" },
            { value: "c", label: "A database" },
            { value: "d", label: "A CSS preprocessor" },
          ],
          correctAnswer: "b",
        },
        {
          id: 2,
          question: "What is npm?",
          options: [
            { value: "a", label: "Node Package Manager" },
            { value: "b", label: "New Programming Method" },
            { value: "c", label: "Node Programming Module" },
            { value: "d", label: "Network Protocol Manager" },
          ],
          correctAnswer: "a",
        },
        {
          id: 3,
          question: "What is the purpose of package.json?",
          options: [
            { value: "a", label: "To store user data" },
            { value: "b", label: "To manage project dependencies and metadata" },
            { value: "c", label: "To compile code" },
            { value: "d", label: "To create databases" },
          ],
          correctAnswer: "b",
        },
        {
          id: 4,
          question: "What is Express.js?",
          options: [
            { value: "a", label: "A database" },
            { value: "b", label: "A web application framework for Node.js" },
            { value: "c", label: "A testing library" },
            { value: "d", label: "A CSS framework" },
          ],
          correctAnswer: "b",
        },
        {
          id: 5,
          question: "What is middleware in Express?",
          options: [
            { value: "a", label: "A database layer" },
            { value: "b", label: "Functions that execute during request-response cycle" },
            { value: "c", label: "A type of server" },
            { value: "d", label: "A routing method" },
          ],
          correctAnswer: "b",
        },
      ],
      
      // MongoDB Questions
      'mongodb': [
        {
          id: 1,
          question: "What type of database is MongoDB?",
          options: [
            { value: "a", label: "Relational database" },
            { value: "b", label: "NoSQL document database" },
            { value: "c", label: "Graph database" },
            { value: "d", label: "Key-value store" },
          ],
          correctAnswer: "b",
        },
        {
          id: 2,
          question: "What is a collection in MongoDB?",
          options: [
            { value: "a", label: "A group of databases" },
            { value: "b", label: "A group of documents" },
            { value: "c", label: "A type of query" },
            { value: "d", label: "A user permission" },
          ],
          correctAnswer: "b",
        },
        {
          id: 3,
          question: "What format does MongoDB use to store data?",
          options: [
            { value: "a", label: "XML" },
            { value: "b", label: "BSON (Binary JSON)" },
            { value: "c", label: "CSV" },
            { value: "d", label: "Plain text" },
          ],
          correctAnswer: "b",
        },
        {
          id: 4,
          question: "What is the _id field in MongoDB?",
          options: [
            { value: "a", label: "A user-defined field" },
            { value: "b", label: "A unique identifier for each document" },
            { value: "c", label: "An optional field" },
            { value: "d", label: "A timestamp" },
          ],
          correctAnswer: "b",
        },
        {
          id: 5,
          question: "Which method is used to find documents in MongoDB?",
          options: [
            { value: "a", label: "search()" },
            { value: "b", label: "find()" },
            { value: "c", label: "get()" },
            { value: "d", label: "query()" },
          ],
          correctAnswer: "b",
        },
      ],
    }
    
    // Check if we have specific questions for this skill
    if (skillQuestions[skillLower]) {
      return skillQuestions[skillLower]
    }
    
    // Generic technical questions for unknown skills
    return [
      {
        id: 1,
        question: `What is the primary purpose of ${skillName}?`,
        options: [
          { value: "a", label: "Web development" },
          { value: "b", label: "Data analysis" },
          { value: "c", label: "System administration" },
          { value: "d", label: "Depends on the use case" },
        ],
        correctAnswer: "d",
      },
      {
        id: 2,
        question: `How would you describe your practical experience with ${skillName}?`,
        options: [
          { value: "a", label: "Only theoretical knowledge from tutorials" },
          { value: "b", label: "Built 1-2 small projects" },
          { value: "c", label: "Built multiple production-ready projects" },
          { value: "d", label: "Professional experience with best practices" },
        ],
        correctAnswer: "c",
      },
      {
        id: 3,
        question: `Can you debug and troubleshoot issues in ${skillName} independently?`,
        options: [
          { value: "a", label: "No, I need significant help" },
          { value: "b", label: "Sometimes, with documentation" },
          { value: "c", label: "Yes, most of the time" },
          { value: "d", label: "Yes, and I can help others" },
        ],
        correctAnswer: "c",
      },
      {
        id: 4,
        question: `What is your understanding of ${skillName} best practices?`,
        options: [
          { value: "a", label: "Not familiar with best practices" },
          { value: "b", label: "Know some basic practices" },
          { value: "c", label: "Follow industry best practices" },
          { value: "d", label: "Contribute to defining best practices" },
        ],
        correctAnswer: "c",
      },
      {
        id: 5,
        question: `Have you worked with ${skillName} in a team environment?`,
        options: [
          { value: "a", label: "No, only personal projects" },
          { value: "b", label: "Yes, in academic projects" },
          { value: "c", label: "Yes, in professional settings" },
          { value: "d", label: "Yes, and led team projects" },
        ],
        correctAnswer: "c",
      },
    ]
  }

  const handleStartTest = () => {
    if (newSkill.name && newSkill.category) {
      const questions = generateSkillTest(newSkill.name, newSkill.category)
      setSkillTestQuestions(questions)
      setSkillTestStep('test')
      setCurrentQuestion(0)
      setTestAnswers({})
    }
  }

  const handleTestAnswer = (value: string) => {
    setTestAnswers({ ...testAnswers, [currentQuestion]: value })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < skillTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate results and show
      setSkillTestStep('results')
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateTestScore = () => {
    let correctCount = 0
    const totalQuestions = skillTestQuestions.length
    
    // Check each answer against correct answer
    skillTestQuestions.forEach((question, index) => {
      if (testAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })
    
    return Math.round((correctCount / totalQuestions) * 100)
  }

  const getVerifiedProficiency = () => {
    const score = calculateTestScore()
    if (score >= 80) return "Advanced"
    if (score >= 60) return "Intermediate"
    if (score >= 40) return "Beginner"
    return "Needs Improvement"
  }

  const getCorrectAnswersCount = () => {
    let correctCount = 0
    skillTestQuestions.forEach((question, index) => {
      if (testAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })
    return correctCount
  }

  const handleAddSkillAfterTest = () => {
    const verifiedProficiency = getVerifiedProficiency()
    const updatedSkills = [...skills, newSkill.name]
    setSkills(updatedSkills)
    
    // Store in localStorage
    localStorage.setItem('studentSkills', JSON.stringify(updatedSkills))
    
    // Store detailed skill info with test results
    const skillDetails = JSON.parse(localStorage.getItem('skillDetails') || '[]')
    skillDetails.push({
      ...newSkill,
      verifiedProficiency,
      testScore: calculateTestScore(),
      testCompleted: true,
      addedAt: new Date().toISOString()
    })
    localStorage.setItem('skillDetails', JSON.stringify(skillDetails))
    
    // Reset form and close modal
    setNewSkill({ name: "", proficiency: "", experience: "", category: "" })
    setSkillTestStep('details')
    setCurrentQuestion(0)
    setTestAnswers({})
    setIsAddSkillOpen(false)
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove)
    setSkills(updatedSkills)
    localStorage.setItem('studentSkills', JSON.stringify(updatedSkills))
  }

  const handleCancelSkillAdd = () => {
    setNewSkill({ name: "", proficiency: "", experience: "", category: "" })
    setSkillTestStep('details')
    setCurrentQuestion(0)
    setTestAnswers({})
    setIsAddSkillOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JEMS Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">John Doe</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* IQ Assessment Status Card */}
        {assessmentData && (
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Your IQ Assessment</CardTitle>
                    <CardDescription>
                      {assessmentData.skipped 
                        ? "You skipped the assessment - Take it to get personalized recommendations" 
                        : "Your learning path is personalized based on your assessment"}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleRetakeAssessment}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {assessmentData.skipped ? "Take Assessment" : "Retake"}
                </Button>
              </div>
            </CardHeader>
            {!assessmentData.skipped && (
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Award className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-2xl font-bold text-primary">{assessmentData.iqScore}</p>
                    <p className="text-xs text-muted-foreground">IQ Score</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-2xl font-bold">{assessmentData.proficiency}</p>
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Target className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-2xl font-bold">{assessmentData.correctAnswers}/{assessmentData.totalQuestions}</p>
                    <p className="text-xs text-muted-foreground">Correct</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Brain className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-2xl font-bold">{assessmentData.avgDifficulty}/4</p>
                    <p className="text-xs text-muted-foreground">Avg Difficulty</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Show alert if no assessment taken */}
        {!assessmentData && (
          <Card className="mb-8 border-yellow-500/20 bg-yellow-500/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-full">
                    <Brain className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle>Complete Your IQ Assessment</CardTitle>
                    <CardDescription>
                      Take a quick 10-question adaptive assessment to personalize your learning journey
                    </CardDescription>
                  </div>
                </div>
                <Link href="/student/assessment">
                  <Button>
                    <Brain className="h-4 w-4 mr-2" />
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Show alert if no goals set */}
        {assessmentData && !goalsData && (
          <Card className="mb-8 border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Set Your Career Goals</CardTitle>
                    <CardDescription>
                      Choose your career path and target package to get a personalized roadmap
                    </CardDescription>
                  </div>
                </div>
                <Link href="/student/goals">
                  <Button>
                    <Target className="h-4 w-4 mr-2" />
                    Set Goals
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Career Goals Card */}
        {goalsData && (
          <Card className="mb-8 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Your Career Goals</CardTitle>
                    <CardDescription>Your personalized learning path</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleUpdateGoals}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Goals
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-background rounded-lg">
                  <Briefcase className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold">{goalsData.careerTitle}</p>
                  <p className="text-xs text-muted-foreground">Target Role</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold">{goalsData.targetPackage} LPA</p>
                  <p className="text-xs text-muted-foreground">Target Package</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <Target className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold">{goalsData.targetCompany || "Any"}</p>
                  <p className="text-xs text-muted-foreground">Dream Company</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/student/roadmap">
                  <Button className="w-full">
                    View Your Personalized Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Completion */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to get better matches</CardDescription>
              </div>
              <span className="text-2xl font-bold text-primary">75%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="mb-4" />
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">✓ Basic Info</Badge>
              <Badge variant="secondary">✓ Skills Added</Badge>
              <Badge variant="outline">Add Projects</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Applications</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Shortlisted</CardDescription>
              <CardTitle className="text-3xl">5</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Interviews</CardDescription>
              <CardTitle className="text-3xl">2</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Profile Views</CardDescription>
              <CardTitle className="text-3xl">48</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="opportunities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Jobs matching your skills and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    title: "Frontend Developer Intern", 
                    company: "Tech Corp", 
                    location: "Remote", 
                    match: 95,
                    skills: ["React", "TypeScript", "Tailwind"],
                    type: "Internship"
                  },
                  { 
                    title: "Full Stack Developer", 
                    company: "StartupXYZ", 
                    location: "Bangalore", 
                    match: 88,
                    skills: ["React", "Node.js", "MongoDB"],
                    type: "Full-time"
                  },
                  { 
                    title: "UI/UX Developer", 
                    company: "Design Studio", 
                    location: "Mumbai", 
                    match: 82,
                    skills: ["React", "Figma", "CSS"],
                    type: "Internship"
                  }
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      <div className="flex gap-2">
                        {job.skills.map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Match</div>
                        <div className="text-lg font-bold text-primary">{job.match}%</div>
                      </div>
                      <Button>Apply</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Track your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Frontend Developer Intern", company: "Tech Corp", status: "Interview Scheduled", date: "Applied 2 days ago" },
                    { title: "Backend Developer", company: "StartupXYZ", status: "Shortlisted", date: "Applied 5 days ago" },
                    { title: "Full Stack Developer", company: "MegaCorp", status: "Under Review", date: "Applied 1 week ago" }
                  ].map((app, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{app.title}</h3>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                        <p className="text-xs text-muted-foreground">{app.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{app.status}</Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex gap-2 flex-wrap">
                    {skills.map(skill => (
                      <Badge key={skill} className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => handleRemoveSkill(skill)}
                        />
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setIsAddSkillOpen(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Skill
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Projects</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">E-commerce Platform</h4>
                      <p className="text-sm text-muted-foreground">Built with React, Node.js, and MongoDB</p>
                    </div>
                    <Button variant="outline" size="sm">+ Add Project</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Skill Modal */}
        <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {/* Step 1: Skill Details */}
            {skillTestStep === 'details' && (
              <>
                <DialogHeader>
                  <DialogTitle>Add New Skill - Step 1 of 3</DialogTitle>
                  <DialogDescription>
                    Tell us about the skill you want to add
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Skill Name */}
                  <div className="space-y-2">
                    <Label htmlFor="skillName">Skill Name *</Label>
                    <Input
                      id="skillName"
                      placeholder="e.g., Python, React, Machine Learning"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                  </div>

                  {/* Skill Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming Language</SelectItem>
                        <SelectItem value="framework">Framework/Library</SelectItem>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="devops">DevOps/Cloud</SelectItem>
                        <SelectItem value="design">Design/UI/UX</SelectItem>
                        <SelectItem value="soft-skills">Soft Skills</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Self-Assessed Proficiency Level */}
                  <div className="space-y-2">
                    <Label>Self-Assessed Proficiency Level *</Label>
                    <RadioGroup value={newSkill.proficiency} onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner" className="font-normal cursor-pointer">
                          Beginner - Just started learning
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="font-normal cursor-pointer">
                          Intermediate - Can work independently
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced" className="font-normal cursor-pointer">
                          Advanced - Can mentor others
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert" className="font-normal cursor-pointer">
                          Expert - Industry recognized expertise
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Experience Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Duration *</Label>
                    <Select value={newSkill.experience} onValueChange={(value) => setNewSkill({ ...newSkill, experience: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long have you been using this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-6">Less than 6 months</SelectItem>
                        <SelectItem value="6-12">6 months - 1 year</SelectItem>
                        <SelectItem value="1-2">1 - 2 years</SelectItem>
                        <SelectItem value="2-3">2 - 3 years</SelectItem>
                        <SelectItem value="3-5">3 - 5 years</SelectItem>
                        <SelectItem value="5-plus">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Next:</strong> You'll take a quick 5-question assessment to verify your skill level
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={handleCancelSkillAdd}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleStartTest}
                    disabled={!newSkill.name || !newSkill.proficiency || !newSkill.experience || !newSkill.category}
                  >
                    Continue to Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </>
            )}

            {/* Step 2: Skill Assessment Test */}
            {skillTestStep === 'test' && skillTestQuestions.length > 0 && (
              <>
                <DialogHeader>
                  <DialogTitle>Skill Assessment - {newSkill.name}</DialogTitle>
                  <DialogDescription>
                    Question {currentQuestion + 1} of {skillTestQuestions.length}
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <Progress value={((currentQuestion + 1) / skillTestQuestions.length) * 100} className="mb-6" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {skillTestQuestions[currentQuestion].question}
                    </h3>

                    <RadioGroup 
                      value={testAnswers[currentQuestion]} 
                      onValueChange={handleTestAnswer}
                      className="space-y-3"
                    >
                      {skillTestQuestions[currentQuestion].options.map((option: any) => (
                        <div
                          key={option.value}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-muted/50 ${
                            testAnswers[currentQuestion] === option.value ? "border-primary bg-primary/5" : "border-border"
                          }`}
                          onClick={() => handleTestAnswer(option.value)}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex-1 cursor-pointer font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!testAnswers[currentQuestion]}
                  >
                    {currentQuestion === skillTestQuestions.length - 1 ? "Complete Assessment" : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </>
            )}

            {/* Step 3: Test Results */}
            {skillTestStep === 'results' && (
              <>
                <DialogHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                  <DialogTitle className="text-center text-2xl">Assessment Complete!</DialogTitle>
                  <DialogDescription className="text-center">
                    You've completed the {newSkill.name} skill verification test
                  </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                  {/* Score Display */}
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Your Score</p>
                    <p className="text-5xl font-bold text-primary mb-2">{calculateTestScore()}%</p>
                    <Badge variant="secondary" className="text-sm">
                      Verified Level: {getVerifiedProficiency()}
                    </Badge>
                  </div>

                  {/* Results Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Correct</p>
                      <p className="text-2xl font-bold text-green-600">{getCorrectAnswersCount()}/{skillTestQuestions.length}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-2xl font-bold">{calculateTestScore()}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Self-Rated</p>
                      <p className="text-lg font-bold capitalize">{newSkill.proficiency}</p>
                    </div>
                  </div>

                  {/* Pass/Fail Message */}
                  {calculateTestScore() >= 60 ? (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">
                        ✅ Congratulations! You've passed the {newSkill.name} verification test.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your verified proficiency level is <strong>{getVerifiedProficiency()}</strong> based on your test performance.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                        ⚠️ You scored below the passing threshold (60%).
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        We recommend reviewing {newSkill.name} fundamentals before adding this skill. You can retake the test anytime.
                      </p>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={handleCancelSkillAdd}>
                    {calculateTestScore() >= 60 ? "Cancel" : "Review & Retake"}
                  </Button>
                  <Button 
                    onClick={handleAddSkillAfterTest}
                    disabled={calculateTestScore() < 60}
                  >
                    {calculateTestScore() >= 60 ? "Add Skill to Profile" : "Score Too Low"}
                    <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
