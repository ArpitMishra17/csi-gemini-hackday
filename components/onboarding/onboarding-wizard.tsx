"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type FormData = {
  age: string
  gender: string
  grade: string
  skills: string
  interests: string
  aims: string
  personalityAnswers: Record<string, string>
  situationPreference: string
  explorationPreference: string[]
}

const INITIAL_DATA: FormData = {
  age: "",
  gender: "",
  grade: "",
  skills: "",
  interests: "",
  aims: "",
  personalityAnswers: {},
  situationPreference: "",
  explorationPreference: [],
}

const PERSONALITY_QUESTIONS = [
  {
    id: "environment",
    question: "What kind of work environment do you prefer?",
    options: ["Quiet and solitary", "Collaborative and busy", "Flexible and remote", "Structured and corporate"],
  },
  {
    id: "problem_solving",
    question: "How do you approach a complex problem?",
    options: ["Break it down logically", "Look for creative solutions", "Ask others for input", "Research similar problems"],
  },
  {
    id: "motivation",
    question: "What motivates you the most?",
    options: ["Achieving goals", "Helping others", "Learning new things", "Financial rewards"],
  },
]

export function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState<FormData>(INITIAL_DATA)
  const [direction, setDirection] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const nextStep = () => {
    setDirection(1)
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setDirection(-1)
    setStep((prev) => prev - 1)
  }

  const isStepValid = () => {
    switch (step) {
      case 1: // Basic Info
        return formData.age && formData.gender && formData.grade
      case 2: // Skills & Interests
        return formData.skills && formData.interests && formData.aims
      case 3: // Personality
        return Object.keys(formData.personalityAnswers).length === PERSONALITY_QUESTIONS.length
      case 4: // Situation
        return !!formData.situationPreference
      case 5: // Exploration
        return formData.explorationPreference.length > 0
      default:
        return true
    }
  }

  const handlePersonalityAnswer = (questionId: string, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      personalityAnswers: { ...prev.personalityAnswers, [questionId]: answer },
    }))
  }

  const toggleExploration = (option: string) => {
    setFormData((prev) => {
      const current = prev.explorationPreference
      if (current.includes(option)) {
        return { ...prev, explorationPreference: current.filter((o) => o !== option) }
      } else {
        return { ...prev, explorationPreference: [...current, option] }
      }
    })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-lg border-2 border-primary/10 bg-card/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300 ease-out" style={{ width: `${(step / 5) * 100}%` }} />

        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            {step === 1 && "Let's get to know you"}
            {step === 2 && "Your Aspirations"}
            {step === 3 && "Personality Check"}
            {step === 4 && "Future Horizons"}
            {step === 5 && "Learning Style"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us a bit about yourself to get started."}
            {step === 2 && "What are you good at? What do you love?"}
            {step === 3 && "There are no wrong answers here."}
            {step === 4 && "Where do you see yourself in the future?"}
            {step === 5 && "How do you prefer to discover new paths?"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 min-h-[300px]">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="16"
                      value={formData.age}
                      onChange={(e) => updateFields({ age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(val) => updateFields({ gender: val })}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade / College Year</Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(val) => updateFields({ grade: val })}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select your current eduction level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                      <SelectItem value="college-1">College Year 1</SelectItem>
                      <SelectItem value="college-2">College Year 2</SelectItem>
                      <SelectItem value="college-3">College Year 3</SelectItem>
                      <SelectItem value="college-4">College Year 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="skills">Current Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g. Coding, Writing, Art, Math..."
                    value={formData.skills}
                    onChange={(e) => updateFields({ skills: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input
                    id="interests"
                    placeholder="e.g. Space, Music, History, Gaming..."
                    value={formData.interests}
                    onChange={(e) => updateFields({ interests: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aims">Aims / Goals</Label>
                  <Textarea
                    id="aims"
                    placeholder="What do you want to achieve?"
                    className="min-h-[100px]"
                    value={formData.aims}
                    onChange={(e) => updateFields({ aims: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                {PERSONALITY_QUESTIONS.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <Label className="text-base">{q.question}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((option) => (
                        <Button
                          key={option}
                          variant={formData.personalityAnswers[q.id] === option ? "default" : "outline"}
                          className="justify-start text-sm h-auto py-3 px-4 whitespace-normal text-left"
                          onClick={() => handlePersonalityAnswer(q.id, option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <Label className="text-lg font-medium">Which situations would you like to learn about?</Label>
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {["Studying and working in India", "Studying or working abroad", "Both", "Not thinking about this yet"].map((option) => (
                    <Button
                      key={option}
                      variant={formData.situationPreference === option ? "default" : "outline"}
                      className="h-14 text-lg justify-start px-6"
                      onClick={() => updateFields({ situationPreference: option })}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <Label className="text-lg font-medium">How would you like to explore careers right now?</Label>
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {["By trying things out", "By reading and watching", "By talking and asking questions", "I don’t know yet"].map((option) => {
                    const isSelected = formData.explorationPreference.includes(option)
                    return (
                      <Button
                        key={option}
                        variant={isSelected ? "default" : "outline"}
                        className="h-14 text-lg justify-between px-6"
                        onClick={() => toggleExploration(option)}
                      >
                        {option}
                        {isSelected && <Check className="w-5 h-5 ml-2" />}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1}
            className="w-32"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 5 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="w-32 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="w-32 bg-green-600 hover:bg-green-700 text-white"
              disabled={!isStepValid() || isLoading}
              onClick={async () => {
                try {
                  setIsLoading(true)
                  const res = await fetch("/api/onboarding", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  })

                  if (res.ok) {
                    router.push("/")
                  } else {
                    console.error("Failed to save onboarding data")
                    // Optionally handle error here
                  }
                } catch (error) {
                  console.error("Error saving onboarding data:", error)
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              {isLoading ? "Saving..." : (
                <>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
