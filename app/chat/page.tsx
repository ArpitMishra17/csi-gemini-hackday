'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChatWindow } from '@/components/chat';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages,
          userProfile: {
            // These would come from user's onboarding data in production
            grade: 'college',
            interests: ['technology', 'problem solving'],
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen flex flex-col bg-muted/10">
      {/* Header */}
      <header className="bg-background border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link href="/demo" title="Back to Demo">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Career Assistant</h1>
              <p className="text-xs text-muted-foreground">Ask me anything about careers</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear chat
              </Button>
            )}
            <Button asChild size="sm">
              <Link href="/demo">
                Try Career Demo
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Window */}
      <main className="flex-1 overflow-hidden max-w-3xl w-full mx-auto bg-background border-x">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
