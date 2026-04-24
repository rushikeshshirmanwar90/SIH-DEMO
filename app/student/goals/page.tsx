"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Shield, Blocks, Brain, Database, Smartphone, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const careerPaths = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    icon: Code,
    description: "Build complete web applications from frontend to backend",
    skills: ["React", "Node.js", "Databases", "APIs"],
    avgPackage: "8-15 LPA",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Specialist",
    icon: Shield,
    description: "Protect systems and networks from digital attacks",
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Risk Management"],
    avgPackage: "10-18 LPA",
  },
  {
    id: "blockchain",
    title: "Blockchain Developer",
    icon: Blocks,
    description: "Create decentralized applications and smart contracts",
    skills: ["Solidity", "Web3", "Smart Contracts", "DeFi"],
    avgPackage: "12-25 LPA",
  },
  {
    id: "ai-ml",
    title: "AI/ML Engineer",
    icon: Brain,
    description: "Develop intelligent systems and machine learning models",
    skills: ["Python", "TensorFlow", "Deep Learning", "Data Science"],
    avgPackage: "12-30 LPA",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    icon: Database,
    description: "Design and maintain data infrastructure and pipelines",
    skills: ["SQL", "ETL", "Big Data", "Cloud Platforms"],
    avgPackage: "10-20 LPA",
  },
  {
    id: "mobile-dev",
    title: "Mobile Developer",
    icon: Smartphone,
    description: "Create native and cross-platform mobile applications",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    avgPackage: "8-16 LPA",
  },
]

export default function CareerGoalsPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [targetPackage, setTargetPackage] = useState("")
  const [targetCompany, setTargetCompany] = useState("")
  const [assessmentData, setAssessmentData] = useState<any>(null)

  useEffect(() => {
    // Load assessment data to show personalized recommendations
    const storedResults = localStorage.getItem('assessmentResults')
    if (storedResults) {
      setAssessmentData(JSON.parse(storedResults))
    }

    // Check if goals already set
    const existingGoals = localStorage.getItem('studentGoals')
    if (existingGoals) {
      const goals = JSON.parse(existingGoals)
      setSelectedPath(goals.careerPath)
      setTargetPackage(goals.targetPackage)
      setTargetCompany(goals.targetCompany || "")
    }
  }, [])

  const handleContinue = () => {
    if (selectedPath && targetPackage) {
      // Store goals in localStorage
      const goalsData = {
        careerPath: selectedPath,
        careerTitle: careerPaths.find(p => p.id === selectedPath)?.title,
        targetPackage,
        targetCompany: targetCompany || null,
        setAt: new Date().toISOString()
      }
      
      localStorage.setItem('studentGoals', JSON.stringify(goalsData))
      
      // Redirect to roadmap
      window.location.href = "/student/roadmap"
    }
  }

  const selectedPathData = careerPaths.find(p => p.id === selectedPath)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JEMS - Career Goals</span>
          </div>
          <Link href="/student/dashboard">
            <Button variant="ghost" size="sm">
              Skip to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Assessment Completed</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Choose Your Career Path</h1>
          <p className="text-lg text-muted-foreground">
            Based on your {assessmentData?.proficiency || 'Average'} proficiency level, select your desired career goal
          </p>
        </div>

        {/* Assessment Summary */}
        {assessmentData && !assessmentData.skipped && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Assessment Results</p>
                    <p className="text-lg font-semibold">
                      IQ Score: {assessmentData.iqScore} • {assessmentData.proficiency} Level
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {assessmentData.correctAnswers}/{assessmentData.totalQuestions} Correct
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {careerPaths.map((path) => {
            const Icon = path.icon
            const isSelected = selectedPath === path.id

            return (
              <Card
                key={path.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {isSelected && <Badge className="bg-primary">Selected</Badge>}
                  </div>
                  <CardTitle className="mt-4">{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">Avg. Package</p>
                      <p className="text-sm font-semibold text-primary">{path.avgPackage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedPath && (
          <Card className="max-w-2xl mx-auto border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                {selectedPathData && <selectedPathData.icon className="h-6 w-6 text-primary" />}
                <div>
                  <CardTitle>Set Your Goals for {selectedPathData?.title}</CardTitle>
                  <CardDescription>Help us personalize your learning roadmap</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="package">Target Package (LPA) *</Label>
                <Input
                  id="package"
                  type="number"
                  placeholder="e.g., 12"
                  value={targetPackage}
                  onChange={(e) => setTargetPackage(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Typical range for {selectedPathData?.title}: {selectedPathData?.avgPackage}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Dream Company (Optional)</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="e.g., Google, Microsoft, Amazon"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We'll tailor your roadmap to match your target company's requirements
                </p>
              </div>
              <Button onClick={handleContinue} className="w-full" size="lg" disabled={!targetPackage}>
                Generate My Personalized Roadmap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
