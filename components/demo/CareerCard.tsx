'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { trackCareerExplore } from '@/lib/activity';

interface CareerCardProps {
  career: {
    _id: string;
    name: string;
    description: string;
    icon: string;
    skills: string[];
  };
  relevanceScore?: number;
}

export default function CareerCard({ career, relevanceScore }: CareerCardProps) {
  const handleClick = () => {
    // Track career exploration
    trackCareerExplore(career._id, career.name);
  };

  return (
    <Link href={`/demo/${career._id}`} onClick={handleClick}>
      <Card className="hover:ring-primary/50 hover:ring-2 transition-all cursor-pointer group">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{career.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {career.name}
                </h3>
                {relevanceScore !== undefined && relevanceScore > 0 && (
                  <Badge variant="secondary">Good match</Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                {career.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {career.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {career.skills.length > 4 && (
                  <span className="text-muted-foreground text-xs py-1">
                    +{career.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Explore scenarios
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
