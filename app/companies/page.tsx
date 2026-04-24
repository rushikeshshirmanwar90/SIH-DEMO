"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JEMS - Companies</span>
          </div>
          <Link href="/companies/login">
            <Button>Login / Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Top Talent, <span className="text-primary">Faster</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified, skilled students from top colleges. Post jobs, filter candidates, and hire efficiently.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/companies/login">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Companies Choose JEMS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified Candidates</CardTitle>
                <CardDescription>
                  All students are college-verified, ensuring authentic profiles and credentials
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered matching based on skills, projects, and experience - not just CGPA
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Efficient Hiring</CardTitle>
                <CardDescription>
                  Filter, shortlist, and schedule interviews all in one platform
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: "Register & Verify", desc: "Create your company profile and get verified" },
              { step: 2, title: "Post Opportunities", desc: "List internships or jobs with required skills" },
              { step: 3, title: "Smart Filtering", desc: "Filter candidates by skills, college, and experience" },
              { step: 4, title: "Shortlist & Interview", desc: "Review applications and schedule interviews" },
              { step: 5, title: "Hire Top Talent", desc: "Connect directly with candidates and make offers" }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Hire?</h2>
          <p className="text-muted-foreground mb-8">Join companies already hiring through JEMS</p>
          <Link href="/companies/login">
            <Button size="lg">
              Start Hiring <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 JEMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
