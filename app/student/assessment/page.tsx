"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CheckCircle2, Brain, TrendingUp, Award, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Question bank with difficulty levels
const questionBank = [
  // EASY LEVEL (1-3)
  {
    id: 1,
    category: "Numerical Aptitude",
    difficulty: 1,
    question: "What is 10 + 15?",
    options: [
      { value: "20", label: "20" },
      { value: "25", label: "25" },
      { value: "30", label: "30" },
      { value: "35", label: "35" },
    ],
    correctAnswer: "25",
  },
  {
    id: 2,
    category: "Logical Reasoning",
    difficulty: 1,
    question: "Which comes next: 2, 4, 6, 8, ?",
    options: [
      { value: "9", label: "9" },
      { value: "10", label: "10" },
      { value: "11", label: "11" },
      { value: "12", label: "12" },
    ],
    correctAnswer: "10",
  },
  {
    id: 3,
    category: "Verbal Comprehension",
    difficulty: 1,
    question: "Choose the synonym for 'HAPPY':",
    options: [
      { value: "sad", label: "Sad" },
      { value: "joyful", label: "Joyful" },
      { value: "angry", label: "Angry" },
      { value: "tired", label: "Tired" },
    ],
    correctAnswer: "joyful",
  },
  
  // MEDIUM LEVEL (4-6)
  {
    id: 4,
    category: "Numerical Aptitude",
    difficulty: 2,
    question: "If 2 pens cost ₹30, how much do 5 pens cost?",
    options: [
      { value: "60", label: "₹60" },
      { value: "65", label: "₹65" },
      { value: "75", label: "₹75" },
      { value: "80", label: "₹80" },
    ],
    correctAnswer: "75",
  },
  {
    id: 5,
    category: "Logical Reasoning",
    difficulty: 2,
    question: "Find the missing number: 2, 6, 12, 20, 30, ?",
    options: [
      { value: "40", label: "40" },
      { value: "42", label: "42" },
      { value: "44", label: "44" },
      { value: "46", label: "46" },
    ],
    correctAnswer: "42",
  },
  {
    id: 6,
    category: "Analytical Thinking",
    difficulty: 2,
    question: "In a class of 40 students, 60% are girls. How many boys are there?",
    options: [
      { value: "12", label: "12" },
      { value: "14", label: "14" },
      { value: "16", label: "16" },
      { value: "18", label: "18" },
    ],
    correctAnswer: "16",
  },
  {
    id: 7,
    category: "Problem Solving",
    difficulty: 2,
    question: "A car travels 60 km in 1 hour. How far will it travel in 2.5 hours?",
    options: [
      { value: "120", label: "120 km" },
      { value: "130", label: "130 km" },
      { value: "140", label: "140 km" },
      { value: "150", label: "150 km" },
    ],
    correctAnswer: "150",
  },
  
  // HARD LEVEL (7-9)
  {
    id: 8,
    category: "Logical Reasoning",
    difficulty: 3,
    question: "All roses are flowers. Some flowers fade quickly. Therefore:",
    options: [
      { value: "all-roses", label: "All roses fade quickly" },
      { value: "some-roses", label: "Some roses may fade quickly" },
      { value: "no-roses", label: "No roses fade quickly" },
      { value: "cannot", label: "Cannot be determined" },
    ],
    correctAnswer: "some-roses",
  },
  {
    id: 9,
    category: "Analytical Thinking",
    difficulty: 3,
    question: "If demand increases and supply decreases, what happens to price?",
    options: [
      { value: "increases", label: "Price increases" },
      { value: "decreases", label: "Price decreases" },
      { value: "stays", label: "Price stays the same" },
      { value: "unpredictable", label: "Unpredictable" },
    ],
    correctAnswer: "increases",
  },
  {
    id: 10,
    category: "Abstract Reasoning",
    difficulty: 3,
    question: "Which shape completes the pattern: Circle, Square, Triangle, Circle, Square, ?",
    options: [
      { value: "circle", label: "Circle" },
      { value: "square", label: "Square" },
      { value: "triangle", label: "Triangle" },
      { value: "rectangle", label: "Rectangle" },
    ],
    correctAnswer: "triangle",
  },
  {
    id: 11,
    category: "Critical Thinking",
    difficulty: 3,
    question: "A team member consistently misses deadlines. As a leader, what's your best approach?",
    options: [
      { value: "ignore", label: "Ignore and hope it improves" },
      { value: "fire", label: "Immediately remove them" },
      { value: "discuss", label: "Have a private discussion to understand the issue" },
      { value: "complain", label: "Complain to management" },
    ],
    correctAnswer: "discuss",
  },
  
  // VERY HARD LEVEL (10)
  {
    id: 12,
    category: "Advanced Logic",
    difficulty: 4,
    question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: [
      { value: "5", label: "5 minutes" },
      { value: "20", label: "20 minutes" },
      { value: "100", label: "100 minutes" },
      { value: "500", label: "500 minutes" },
    ],
    correctAnswer: "5",
  },
  {
    id: 13,
    category: "Complex Problem Solving",
    difficulty: 4,
    question: "In a race, you overtake the person in 2nd place. What position are you in now?",
    options: [
      { value: "1st", label: "1st place" },
      { value: "2nd", label: "2nd place" },
      { value: "3rd", label: "3rd place" },
      { value: "depends", label: "Depends on total runners" },
    ],
    correctAnswer: "2nd",
  },
  {
    id: 14,
    category: "Pattern Recognition",
    difficulty: 4,
    question: "What comes next: 1, 1, 2, 3, 5, 8, 13, ?",
    options: [
      { value: "18", label: "18" },
      { value: "19", label: "19" },
      { value: "20", label: "20" },
      { value: "21", label: "21" },
    ],
    correctAnswer: "21",
  },
]

// Adaptive IQ calculation algorithm
const calculateIQScore = (correctAnswers: number, totalQuestions: number, avgDifficulty: number): number => {
  const accuracy = (correctAnswers / totalQuestions) * 100
  const difficultyMultiplier = avgDifficulty * 10
  const baseIQ = 85 + (accuracy * 0.3) + difficultyMultiplier
  return Math.min(Math.max(Math.round(baseIQ), 70), 145)
}

const getProficiencyLevel = (iqScore: number): string => {
  if (iqScore >= 130) return "Advanced"
  if (iqScore >= 115) return "Above Average"
  if (iqScore >= 100) return "Average"
  if (iqScore >= 85) return "Below Average"
  return "Beginner"
}

const getDifficultyBadge = (difficulty: number) => {
  const badges = {
    1: { label: "Easy", variant: "secondary" as const },
    2: { label: "Medium", variant: "default" as const },
    3: { label: "Hard", variant: "destructive" as const },
    4: { label: "Expert", variant: "outline" as const },
  }
  return badges[difficulty as keyof typeof badges] || badges[2]
}

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questionBank>([])
  const [answers, setAnswers] = useState<Record<number, { answer: string; isCorrect: boolean }>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [currentDifficulty, setCurrentDifficulty] = useState(1)
  const [iqScore, setIqScore] = useState(0)
  const [proficiencyLevel, setProficiencyLevel] = useState("")

  // Initialize with first question
  useEffect(() => {
    const firstQuestion = questionBank.find(q => q.difficulty === 1)
    if (firstQuestion) {
      setSelectedQuestions([firstQuestion])
    }
  }, [])

  const progress = ((currentQuestionIndex + 1) / 10) * 100 // Target 10 questions

  const selectNextQuestion = (wasCorrect: boolean, currentDiff: number) => {
    let nextDifficulty = currentDiff
    
    // Adaptive difficulty adjustment
    if (wasCorrect) {
      nextDifficulty = Math.min(currentDiff + 1, 4)
    } else {
      nextDifficulty = Math.max(currentDiff - 1, 1)
    }

    // Get available questions at the target difficulty
    const availableQuestions = questionBank.filter(
      q => q.difficulty === nextDifficulty && !selectedQuestions.find(sq => sq.id === q.id)
    )

    // If no questions at target difficulty, try adjacent levels
    if (availableQuestions.length === 0) {
      const fallbackQuestions = questionBank.filter(
        q => !selectedQuestions.find(sq => sq.id === q.id)
      )
      if (fallbackQuestions.length > 0) {
        return { question: fallbackQuestions[0], difficulty: fallbackQuestions[0].difficulty }
      }
    }

    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      return { question: availableQuestions[randomIndex], difficulty: nextDifficulty }
    }

    return null
  }

  const handleAnswer = (value: string) => {
    const currentQ = selectedQuestions[currentQuestionIndex]
    const isCorrect = value === currentQ.correctAnswer
    
    setAnswers({
      ...answers,
      [currentQ.id]: { answer: value, isCorrect }
    })
  }

  const handleNext = () => {
    const currentQ = selectedQuestions[currentQuestionIndex]
    const currentAnswer = answers[currentQ.id]

    if (selectedQuestions.length >= 10) {
      // Complete assessment
      completeAssessment()
      return
    }

    // Select next question based on performance
    const nextQuestionData = selectNextQuestion(currentAnswer.isCorrect, currentDifficulty)
    
    if (nextQuestionData) {
      setSelectedQuestions([...selectedQuestions, nextQuestionData.question])
      setCurrentDifficulty(nextQuestionData.difficulty)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      completeAssessment()
    }
  }

  const completeAssessment = () => {
    const correctCount = Object.values(answers).filter(a => a.isCorrect).length
    const totalQuestions = Object.keys(answers).length
    const avgDifficulty = selectedQuestions.reduce((sum, q) => sum + q.difficulty, 0) / selectedQuestions.length
    
    const calculatedIQ = calculateIQScore(correctCount, totalQuestions, avgDifficulty)
    const proficiency = getProficiencyLevel(calculatedIQ)
    
    setIqScore(calculatedIQ)
    setProficiencyLevel(proficiency)
    setIsComplete(true)

    // Store results in localStorage for roadmap personalization
    localStorage.setItem('studentIQ', calculatedIQ.toString())
    localStorage.setItem('studentProficiency', proficiency)
    localStorage.setItem('assessmentResults', JSON.stringify({
      iqScore: calculatedIQ,
      proficiency,
      correctAnswers: correctCount,
      totalQuestions,
      avgDifficulty: avgDifficulty.toFixed(1)
    }))
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleGenerateRoadmap = () => {
    window.location.href = "/student/goals"
  }

  const handleSkipAssessment = () => {
    // Set default values for students who skip
    localStorage.setItem('studentIQ', '100')
    localStorage.setItem('studentProficiency', 'Average')
    localStorage.setItem('assessmentResults', JSON.stringify({
      iqScore: 100,
      proficiency: 'Average',
      skipped: true
    }))
    window.location.href = "/student/goals"
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JEMS Assessment</span>
            </div>
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Welcome to Your IQ Assessment</CardTitle>
              <CardDescription className="text-base mt-2">
                This adaptive assessment will help us understand your current skill level and create a personalized learning path for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-3">What to expect:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    10 adaptive questions that adjust to your level
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Questions get harder or easier based on your answers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Takes approximately 5-10 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Your IQ score will personalize your learning roadmap
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSkipAssessment} variant="outline" className="flex-1">
                  Skip for Now
                </Button>
                <Button onClick={() => setSelectedQuestions([questionBank.find(q => q.difficulty === 1)!])} className="flex-1">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                You can retake this assessment anytime from your dashboard
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isComplete) {
    const correctCount = Object.values(answers).filter(a => a.isCorrect).length
    const totalQuestions = Object.keys(answers).length
    const accuracy = ((correctCount / totalQuestions) * 100).toFixed(1)

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl">Assessment Complete!</CardTitle>
            <CardDescription className="text-base mt-2">
              Your adaptive IQ assessment has been analyzed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* IQ Score Display */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center border-2 border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">Your IQ Score</p>
                </div>
                <p className="text-5xl font-bold text-primary mb-2">{iqScore}</p>
                <Badge variant="secondary" className="text-sm">
                  {proficiencyLevel} Level
                </Badge>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <Award className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{correctCount}/{totalQuestions}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <Brain className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{currentDifficulty}/4</p>
                  <p className="text-xs text-muted-foreground">Peak Level</p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-3">Assessment Summary:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Adaptive difficulty: Questions adjusted to your level
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Categories tested: Logic, Numerical, Analytical, Verbal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Proficiency level: {proficiencyLevel}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Roadmap will be personalized based on your IQ score
                  </li>
                </ul>
              </div>

              <Button onClick={handleGenerateRoadmap} className="w-full" size="lg">
                Continue to Goal Selection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Next: Choose your career path and set your goals
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = selectedQuestions[currentQuestionIndex]
  const currentAnswer = answers[currentQ.id]?.answer
  const difficultyBadge = getDifficultyBadge(currentQ.difficulty)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JEMS Assessment</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkipAssessment}>
            Skip Assessment
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Adaptive IQ Assessment
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-muted-foreground">Category: {currentQ.category}</p>
                <Badge variant={difficultyBadge.variant}>{difficultyBadge.label}</Badge>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of 10
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Questions adapt based on your performance
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            <CardDescription>Select the option that best answers the question</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-3">
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-muted/50 ${
                    currentAnswer === option.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex-1 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!currentAnswer} className="flex-1">
                {selectedQuestions.length >= 10 ? "Complete" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Indicator */}
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Current Difficulty:</span>
                <Badge variant={difficultyBadge.variant} className="text-xs">
                  Level {currentDifficulty}
                </Badge>
              </div>
              <div className="text-muted-foreground">
                Answered: {Object.keys(answers).length} / {selectedQuestions.length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
