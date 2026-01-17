'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MCQOption {
  id: string;
  text: string;
}

interface MCQOptionsProps {
  options: MCQOption[];
  onSelect: (optionId: string) => void;
  disabled?: boolean;
  selectedId?: string;
}

export default function MCQOptions({ options, onSelect, disabled, selectedId }: MCQOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <Button
          key={option.id}
          variant="outline"
          onClick={() => onSelect(option.id)}
          disabled={disabled}
          className={cn(
            'w-full h-auto text-left justify-start p-4 whitespace-normal',
            selectedId === option.id && 'ring-2 ring-primary bg-primary/5'
          )}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0',
                selectedId === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-foreground">{option.text}</span>
          </div>
        </Button>
      ))}
    </div>
  );
}
