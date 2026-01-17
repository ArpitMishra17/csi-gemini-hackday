import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
