import { Card, CardContent } from "@/components/ui/card";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <Card className="bg-muted border-none shadow-sm rounded-bl-none">
        <CardContent className="p-3 flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-muted-foreground">Thinking...</span>
        </CardContent>
      </Card>
    </div>
  );
}
