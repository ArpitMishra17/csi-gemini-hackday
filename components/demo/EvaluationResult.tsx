'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Zap, Check } from 'lucide-react';

interface EvaluationResultProps {
  evaluation: {
    strengths: string[];
    areasToImprove: string[];
  };
  scenarioTitle: string;
  careerName: string;
  choicesSummary: { situation: string; choice: string }[];
  careerId: string;
}

export default function EvaluationResult({
  evaluation,
  scenarioTitle,
  careerName,
  choicesSummary,
  careerId,
}: EvaluationResultProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Scenario Complete!</h1>
        <p className="text-muted-foreground mt-2">
          You&apos;ve completed <span className="font-semibold">{scenarioTitle}</span> in the {careerName} career path.
        </p>
      </div>

      {/* Your Choices */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {choicesSummary.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.situation}</p>
                  <p className="font-medium mt-1">{item.choice}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <CardTitle>Strengths Demonstrated</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {evaluation.strengths.map((strength) => (
              <Badge key={strength} variant="secondary" className="text-sm py-1.5 px-3">
                {strength}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Areas to Improve */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <CardTitle>Areas to Develop</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {evaluation.areasToImprove.map((area) => (
              <Badge key={area} variant="outline" className="text-sm py-1.5 px-3">
                {area}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href={`/demo/${careerId}`}>Try Another Scenario</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/demo">Explore Other Careers</Link>
        </Button>
      </div>
    </div>
  );
}
