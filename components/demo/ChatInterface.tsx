'use client';

import { useState, useRef, useEffect } from 'react';
import MCQOptions from './MCQOptions';
import ScenarioProgress from './ScenarioProgress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'narrator' | 'user' | 'system';
  content: string;
  options?: { id: string; text: string }[];
  skillsRevealed?: string[];
}

interface ChatInterfaceProps {
  messages: Message[];
  currentOptions?: { id: string; text: string }[];
  onSelectOption: (optionId: string) => void;
  isLoading: boolean;
  stageNumber: number;
  totalStages: number;
  scenarioTitle: string;
  careerIcon: string;
}

export default function ChatInterface({
  messages,
  currentOptions,
  onSelectOption,
  isLoading,
  stageNumber,
  totalStages,
  scenarioTitle,
  careerIcon,
}: ChatInterfaceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setSelectedOption(null);
  }, [stageNumber]);

  const handleSelectOption = (optionId: string) => {
    if (isLoading || selectedOption) return;
    setSelectedOption(optionId);
    onSelectOption(optionId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{careerIcon}</span>
          <h2 className="text-lg font-semibold">{scenarioTitle}</h2>
        </div>
        <ScenarioProgress currentStage={stageNumber} totalStages={totalStages} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn('flex', message.type === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl p-4',
                message.type === 'narrator'
                  ? 'bg-card shadow-sm border border-border'
                  : message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground text-sm'
              )}
            >
              {message.type === 'narrator' && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Narrator
                  </span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.skillsRevealed && message.skillsRevealed.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {message.skillsRevealed.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-muted-foreground">Generating scenario...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Options */}
      {currentOptions && currentOptions.length > 0 && !isLoading && (
        <div className="bg-card border-t border-border p-4">
          <p className="text-sm text-muted-foreground mb-3">Choose your response:</p>
          <MCQOptions
            options={currentOptions}
            onSelect={handleSelectOption}
            disabled={isLoading || selectedOption !== null}
            selectedId={selectedOption ?? undefined}
          />
        </div>
      )}
    </div>
  );
}
