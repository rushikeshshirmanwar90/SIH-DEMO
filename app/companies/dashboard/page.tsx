"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Briefcase, Calendar, Plus, Search, Filter, X } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type SkillWithSubSkills = {
  mainSkill: string
  subSkills: string[]
}

export default function CompanyDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<SkillWithSubSkills[]>([])
  const [currentMainSkill, setCurrentMainSkill] = useState("")
  const [currentSubSkill, setCurrentSubSkill] = useState("")
  const [currentSubSkills, setCurrentSubSkills] = useState<string[]>([])

  const handleAddSubSkill = () => {
    if (currentSubSkill.trim() && !currentSubSkills.includes(currentSubSkill.trim())) {
      setCurrentSubSkills([...currentSubSkills, currentSubSkill.trim()])
      setCurrentSubSkill("")
    }
  }

  const handleRemoveCurrentSubSkill = (subSkill: string) => {
    setCurrentSubSkills(currentSubSkills.filter(s => s !== subSkill))
  }

  const handleAddSkill = () => {
    if (currentMainSkill.trim() && currentSubSkills.length > 0) {
      const existingSkillIndex = selectedSkills.findIndex(s => s.mainSkill === currentMainSkill.trim())
      
      if (existingSkillIndex >= 0) {
        // Update existing skill with new sub-skills
        const updated = [...selectedSkills]
        const uniqueSubSkills = Array.from(new Set([...updated[existingSkillIndex].subSkills, ...currentSubSkills]))
        updated[existingSkillIndex].subSkills = uniqueSubSkills
        setSelectedSkills(updated)
      } else {
        // Add new skill
        setSelectedSkills([...selectedSkills, {
          mainSkill: currentMainSkill.trim(),
          subSkills: currentSubSkills
        }])
      }
      
      setCurrentMainSkill("")
      setCurrentSubSkills([])
    }
  }

  const handleRemoveSkill = (mainSkill: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill.mainSkill !== mainSkill))
  }

  const handleRemoveSubSkill = (mainSkill: string, subSkill: string) => {
    const updated = selectedSkills.map(skill => {
      if (skill.mainSkill === mainSkill) {
        const newSubSkills = skill.subSkills.filter(s => s !== subSkill)
        return { ...skill, subSkills: newSubSkills }
      }
      return skill
    }).filter(skill => skill.subSkills.length > 0)
    
    setSelectedSkills(updated)
  }

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Job posted with skills:", selectedSkills)
    setIsDialogOpen(false)
    setSelectedSkills([])
    setCurrentMainSkill("")
    setCurrentSubSkills([])
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JEMS Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Acme Corp</span>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Jobs</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Applications</CardDescription>
              <CardTitle className="text-3xl">248</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Shortlisted</CardDescription>
              <CardTitle className="text-3xl">45</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Hired</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="jobs">Job Posts</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
            </TabsList>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Post a New Job</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new job posting
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmitJob} className="space-y-6">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title *</Label>
                    <Input 
                      id="job-title" 
                      placeholder="e.g., Frontend Developer Intern" 
                      required 
                    />
                  </div>

                  {/* Salary Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary-min">Min Salary (₹/month)</Label>
                      <Input 
                        id="salary-min" 
                        type="number" 
                        placeholder="e.g., 15000" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary-max">Max Salary (₹/month)</Label>
                      <Input 
                        id="salary-max" 
                        type="number" 
                        placeholder="e.g., 30000" 
                      />
                    </div>
                  </div>

                  {/* Number of Openings */}
                  <div className="space-y-2">
                    <Label htmlFor="openings">Number of Openings *</Label>
                    <Input 
                      id="openings" 
                      type="number" 
                      placeholder="e.g., 5" 
                      min="1"
                      required 
                    />
                  </div>

                  {/* Required Skills with Sub-Skills */}
                  <div className="space-y-3">
                    <Label>Required Skills & Sub-Skills *</Label>
                    
                    {/* Main Skill Input */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Main Skill Category</Label>
                      <Input 
                        placeholder="e.g., Frontend Development, Backend Development, Data Science" 
                        value={currentMainSkill}
                        onChange={(e) => setCurrentMainSkill(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Examples: Frontend Development, Backend Development, Mobile Development, Database, Data Science & AI, DevOps & Cloud, UI/UX Design
                      </p>
                    </div>

                    {/* Sub-Skills Input */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Add Sub-Skills</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="e.g., React.js, TypeScript, Node.js" 
                          value={currentSubSkill}
                          onChange={(e) => setCurrentSubSkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddSubSkill()
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleAddSubSkill}
                        >
                          Add
                        </Button>
                      </div>
                      
                      {/* Current Sub-Skills */}
                      {currentSubSkills.length > 0 && (
                        <div className="flex gap-2 flex-wrap p-3 border rounded-lg bg-muted/20">
                          {currentSubSkills.map((subSkill) => (
                            <Badge key={subSkill} variant="secondary" className="gap-1">
                              {subSkill}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => handleRemoveCurrentSubSkill(subSkill)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Add Skill Button */}
                    {currentMainSkill.trim() && currentSubSkills.length > 0 && (
                      <Button 
                        type="button" 
                        variant="secondary"
                        onClick={handleAddSkill}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add "{currentMainSkill}" with {currentSubSkills.length} sub-skill(s)
                      </Button>
                    )}

                    {/* Display Selected Skills */}
                    {selectedSkills.length > 0 && (
                      <div className="space-y-3 mt-4 p-4 border rounded-lg bg-muted/20">
                        <Label className="text-sm font-semibold">Selected Skills:</Label>
                        {selectedSkills.map((skill) => (
                          <div key={skill.mainSkill} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge variant="default" className="text-sm">
                                {skill.mainSkill}
                              </Badge>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSkill(skill.mainSkill)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex gap-2 flex-wrap ml-4">
                              {skill.subSkills.map((subSkill) => (
                                <Badge 
                                  key={subSkill} 
                                  variant="secondary" 
                                  className="gap-1 text-xs"
                                >
                                  {subSkill}
                                  <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => handleRemoveSubSkill(skill.mainSkill, subSkill)}
                                  />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the role, responsibilities, and requirements for freshers..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Application Deadline */}
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input 
                      id="deadline" 
                      type="date" 
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 justify-end pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false)
                        setSelectedSkills([])
                        setCurrentMainSkill("")
                        setCurrentSubSkills([])
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={selectedSkills.length === 0}
                    >
                      Post Job
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Job Posts</CardTitle>
                <CardDescription>Manage your active and past job postings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Frontend Developer Intern", applicants: 45, status: "Active", skills: ["React", "TypeScript"] },
                  { title: "Backend Developer", applicants: 32, status: "Active", skills: ["Node.js", "MongoDB"] },
                  { title: "Full Stack Developer", applicants: 28, status: "Active", skills: ["React", "Node.js", "AWS"] }
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{job.title}</h3>
                      <div className="flex gap-2">
                        {job.skills.map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{job.applicants} applications</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{job.status}</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Review and manage candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", position: "Frontend Developer Intern", college: "MIT", skills: ["React", "TypeScript"], status: "New" },
                    { name: "Jane Smith", position: "Backend Developer", college: "Stanford", skills: ["Node.js", "Python"], status: "Shortlisted" },
                    { name: "Mike Johnson", position: "Full Stack Developer", college: "Berkeley", skills: ["React", "Node.js"], status: "Interview" }
                  ].map((app, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{app.name}</h3>
                        <p className="text-sm text-muted-foreground">{app.position} • {app.college}</p>
                        <div className="flex gap-2">
                          {app.skills.map(skill => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={app.status === "New" ? "default" : "secondary"}>{app.status}</Badge>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Candidates</CardTitle>
                <CardDescription>Find candidates by skills, college, or experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Search by skills (e.g., React, Python)" />
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Use filters to find candidates matching your requirements
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
