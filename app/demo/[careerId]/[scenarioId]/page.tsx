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

  const handleStream = useCallback(async (response: Response, isStart: boolean = false) => {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Failed to get response reader');

    const textDecoder = new TextDecoder();
    let metadataReceived = false;
    let fullContent = '';
    const currentNarratorMessageId = `narrator-${Date.now()}`;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = textDecoder.decode(value, { stream: true });
      
      if (!metadataReceived) {
        const parts = chunk.split('\n--METADATA_END--\n');
        if (parts.length > 1) {
          const metadata = JSON.parse(parts[0]);
          metadataReceived = true;
          
          if (isStart) {
            setScenarioTitle(metadata.scenario.title);
            setCareerIcon(metadata.career.icon);
            setCareerName(metadata.career.name);
            setStageNumber(metadata.stageNumber);
            setTotalStages(metadata.totalStages);
            setCurrentOptions(metadata.currentStage.options);
            
            // Track scenario start
            trackScenarioStart(scenarioId, careerId, metadata.scenario.title, metadata.career.name);
          } else {
            // Handle skills revealed
            if (metadata.previousChoice?.skillsRevealed?.length > 0) {
              setMessages((prev) => [
                ...prev,
                {
                  id: `skills-${Date.now()}`,
                  type: 'system',
                  content: `Skills demonstrated: ${metadata.previousChoice.skillsRevealed.join(', ')}`,
                  skillsRevealed: metadata.previousChoice.skillsRevealed,
                },
              ]);
            }
            setStageNumber(metadata.stageNumber);
            setCurrentOptions(metadata.currentStage.options);
          }

          // Prepare for narrator message
          setMessages((prev) => [
            ...prev,
            {
              id: currentNarratorMessageId,
              type: 'narrator',
              content: '',
            },
          ]);

          // Process remaining chunk as content
          const contentChunk = parts[1];
          if (contentChunk) {
            fullContent += contentChunk;
            setMessages((prev) => 
              prev.map(msg => 
                msg.id === currentNarratorMessageId 
                  ? { ...msg, content: fullContent } 
                  : msg
              )
            );
          }
        }
      } else {
        fullContent += chunk;
        setMessages((prev) => 
          prev.map(msg => 
            msg.id === currentNarratorMessageId 
              ? { ...msg, content: fullContent } 
              : msg
          )
        );
      }
    }
  }, [careerId, scenarioId]);

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

        await handleStream(response, true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (scenarioId) {
      startScenario();
    }
  }, [scenarioId, getUserId, handleStream]);

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

      // Check if it's a JSON response (completed) or a stream
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
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
          setIsLoading(false);
          return;
        }
      }

      await handleStream(response, false);
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
