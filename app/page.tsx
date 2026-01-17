import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, PlayCircle, Stethoscope, Code, Scale, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover Your{' '}
            <span className="text-primary">Future Career</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience real-world scenarios from different careers through interactive simulations.
            Get personalized guidance from our AI career assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/demo">
                Try Career Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/chat">
                <MessageCircle className="w-4 h-4" />
                Chat with AI
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Career Demo Feature */}
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">
                Interactive Career Scenarios
              </h2>
              <p className="text-muted-foreground">
                Step into the shoes of a doctor, software engineer, lawyer, or journalist.
                Make real decisions and see how your choices reveal your strengths.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  4 career paths to explore
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Multiple scenarios per career
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  AI-powered narrative experience
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Personalized skill evaluation
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Chatbot Feature */}
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center dark:bg-purple-900/20">
                <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">
                AI Career Assistant
              </h2>
              <p className="text-muted-foreground">
                Get personalized career guidance from our AI assistant. Ask about education paths,
                skills, job prospects, and more.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Personalized advice
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  India & international context
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Grade-appropriate guidance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Instant responses
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Careers Preview */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Careers to Explore
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Stethoscope className="w-8 h-8" />, name: 'Doctor', desc: 'Healthcare' },
            { icon: <Code className="w-8 h-8" />, name: 'Software Engineer', desc: 'Technology' },
            { icon: <Scale className="w-8 h-8" />, name: 'Lawyer', desc: 'Legal' },
            { icon: <Newspaper className="w-8 h-8" />, name: 'Journalist', desc: 'Media' },
          ].map((career) => (
            <Link
              key={career.name}
              href="/demo"
              className="block group"
            >
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {career.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{career.name}</h3>
                    <p className="text-sm text-muted-foreground">{career.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-16 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Career Education Platform - Built for students exploring their future</p>
        </div>
      </footer>
    </div>
  );
}
