import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <Card
        className={cn(
          "max-w-[80%] border-none shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        )}
      >
        <CardContent className="p-3">
          {!isUser && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary">
                Career Assistant
              </span>
            </div>
          )}
          <div className={cn(
            "text-sm leading-relaxed max-w-none"
          )}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="whitespace-pre-wrap mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-md font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                code: ({ children }) => <code className="bg-background/20 rounded px-1 py-0.5 font-mono text-xs">{children}</code>,
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-medium underline underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
