"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StudentWelcome() {
  useEffect(() => {
    // Check if user has assessment data
    const hasAssessment = localStorage.getItem('studentIQ')
    
    // If they have assessment, redirect to dashboard
    if (hasAssessment) {
      window.location.href = "/student/dashboard"
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <Brain className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl mb-2">Welcome to JEMS!</CardTitle>
          <CardDescription className="text-base">
            Let's start your personalized learning journey with a quick IQ assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Adaptive Assessment</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Questions adjust to your skill level in real-time
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">IQ Score</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get your personalized IQ score and proficiency level
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Custom Roadmap</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Learning path tailored to your assessment results
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Track Progress</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor your growth and skill development
              </p>
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium mb-2">What happens next:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Complete a 10-question adaptive IQ assessment (5-10 minutes)</li>
              <li>Receive your IQ score and proficiency level</li>
              <li>Get a personalized learning roadmap based on your results</li>
              <li>Start learning with content matched to your skill level</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Link href="/student/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                Skip to Dashboard
              </Button>
            </Link>
            <Link href="/student/assessment" className="flex-1">
              <Button className="w-full">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            You can retake the assessment anytime from your dashboard
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
