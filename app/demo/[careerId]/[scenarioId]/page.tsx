'use client';

import { useEffect, useState, useCallback, use, useRef } from 'react';
import Link from 'next/link';
import { ChatInterface, EvaluationResult } from '@/components/demo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { trackScenarioStart, trackScenarioComplete } from '@/lib/activity';

interface Message {
  id: string;
  type: 'narrator' | 'user' | 'system';
  content: string;
  skillsRevealed?: string[];
}

interface StageData {
  stageId: string;
  narration: string;
  options: { id: string; text: string }[];
}

interface EvaluationData {
  strengths: string[];
  areasToImprove: string[];
}

export default function ScenarioPlayerPage({ params }: { params: Promise<{ careerId: string; scenarioId: string }> }) {
  const { careerId, scenarioId } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<{ id: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stageNumber, setStageNumber] = useState(1);
  const [totalStages, setTotalStages] = useState(1);
  const [scenarioTitle, setScenarioTitle] = useState('');
  const [careerIcon, setCareerIcon] = useState('');
  const [careerName, setCareerName] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [choicesSummary, setChoicesSummary] = useState<{ situation: string; choice: string }[]>([]);

  // Prevent double-firing in Strict Mode
  const hasStarted = useRef(false);

  // Generate a simple user ID for demo purposes
  const getUserId = useCallback(() => {
    if (typeof window === 'undefined') return 'demo-user';
    let userId = localStorage.getItem('demo-user-id');
    if (!userId) {
      userId = 'user-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('demo-user-id', userId);
    }
    return userId;
  }, []);

  // Start the scenario
  useEffect(() => {
    async function startScenario() {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        setIsLoading(true);
        const userId = getUserId();

        const response = await fetch(`/api/scenarios/${scenarioId}/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error('Failed to start scenario');

        const data = await response.json();

        setScenarioTitle(data.scenario.title);
        setCareerIcon(data.career.icon);
        setCareerName(data.career.name);
        setStageNumber(data.stageNumber);
        setTotalStages(data.totalStages);
        setCurrentOptions(data.currentStage.options);

        // Track scenario start
        trackScenarioStart(scenarioId, careerId, data.scenario.title, data.career.name);

        setMessages([
          {
            id: 'intro',
            type: 'narrator',
            content: data.currentStage.narration,
          },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (scenarioId) {
      startScenario();
    }
  }, [scenarioId, getUserId]);

  // Handle option selection
  const handleSelectOption = async (optionId: string) => {
    try {
      setIsLoading(true);
      const selectedOption = currentOptions.find((o) => o.id === optionId);

      // Add user's choice to messages
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          type: 'user',
          content: selectedOption?.text || 'Selected option',
        },
      ]);

      const userId = getUserId();

      const response = await fetch(`/api/scenarios/${scenarioId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, optionId }),
      });

      if (!response.ok) throw new Error('Failed to submit response');

      const data = await response.json();

      if (data.completed) {
        setIsCompleted(true);
        setCurrentOptions([]);

        // Track scenario completion
        trackScenarioComplete(scenarioId, careerId, scenarioTitle, careerName);

        // Fetch evaluation
        const evalResponse = await fetch(`/api/scenarios/${scenarioId}/evaluate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (evalResponse.ok) {
          const evalData = await evalResponse.json();
          setEvaluation(evalData.evaluation);
          setChoicesSummary(evalData.choicesSummary);
        }
      } else {
        // Add skills revealed message if any
        if (data.previousChoice?.skillsRevealed?.length > 0) {
          setMessages((prev) => [
            ...prev,
            {
              id: `skills-${Date.now()}`,
              type: 'system',
              content: `Skills demonstrated: ${data.previousChoice.skillsRevealed.join(', ')}`,
              skillsRevealed: data.previousChoice.skillsRevealed,
            },
          ]);
        }

        // Add narrator message
        setMessages((prev) => [
          ...prev,
          {
            id: `narrator-${Date.now()}`,
            type: 'narrator',
            content: data.currentStage.narration,
          },
        ]);

        setStageNumber(data.stageNumber);
        setCurrentOptions(data.currentStage.options);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-muted/10 flex items-center justify-center p-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center max-w-md w-full">
          <p className="text-destructive font-medium mb-4">{error}</p>
          <Button asChild variant="destructive">
            <Link href={`/demo/${careerId}`}>Back to Scenarios</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isCompleted && evaluation) {
    return (
      <div className="min-h-screen bg-muted/10 py-8 px-4">
        <EvaluationResult
          evaluation={evaluation}
          scenarioTitle={scenarioTitle}
          careerName={careerName}
          choicesSummary={choicesSummary}
          careerId={careerId}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-muted/10">
      {/* Top navigation */}
      <div className="bg-background border-b px-4 py-2">
        <Button asChild variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
          <Link href={`/demo/${careerId}`} className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            Exit Scenario
          </Link>
        </Button>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface
          messages={messages}
          currentOptions={currentOptions}
          onSelectOption={handleSelectOption}
          isLoading={isLoading}
          stageNumber={stageNumber}
          totalStages={totalStages}
          scenarioTitle={scenarioTitle}
          careerIcon={careerIcon}
        />
      </div>
    </div>
  );
}
