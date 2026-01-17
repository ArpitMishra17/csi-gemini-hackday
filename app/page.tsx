import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, PlayCircle, Stethoscope, Code, Scale, Newspaper, BookOpen } from "lucide-react";

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
              <Link href="/explore">
                <BookOpen className="w-4 h-4" />
                Watch & Read
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
        <div className="grid md:grid-cols-3 gap-6">
          {/* Career Demo Feature */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">
                Try Things Out
              </h2>
              <p className="text-muted-foreground text-sm">
                Step into real career scenarios. Make decisions and discover your strengths through interactive simulations.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  AI-powered roleplay
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Multiple scenarios
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Skill evaluation
                </li>
              </ul>
              <Button asChild className="w-full mt-2">
                <Link href="/demo">Start Demo</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Watch & Read Feature */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center dark:bg-cyan-900/20">
                <BookOpen className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold">
                Watch & Read
              </h2>
              <p className="text-muted-foreground text-sm">
                Explore careers through curated videos and articles. Learn what professionals do daily.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  Career insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  Day-in-life guides
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  Expert quotes
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/explore">Explore Careers</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Chatbot Feature */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center dark:bg-purple-900/20">
                <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">
                Ask Questions
              </h2>
              <p className="text-muted-foreground text-sm">
                Get personalized guidance from our AI assistant about education, skills, and career paths.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Personalized advice
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  India & global context
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Instant responses
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/chat">Chat with AI</Link>
              </Button>
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
