'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface InterestsSectionProps {
    interests: string[];
    skills?: string;
    aims?: string;
}

export function InterestsSection({ interests, skills, aims }: InterestsSectionProps) {
    const skillsList = skills ? skills.split(',').map((s) => s.trim()).filter(Boolean) : [];

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Your Interests & Skills
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Interests */}
                {interests.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skillsList.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {skillsList.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="border-chart-2 text-chart-2"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Aims */}
                {aims && (
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Career Goals</h4>
                        <p className="text-sm text-foreground/80">{aims}</p>
                    </div>
                )}

                {/* Empty state */}
                {interests.length === 0 && skillsList.length === 0 && !aims && (
                    <p className="text-muted-foreground text-sm">
                        Complete your onboarding to add your interests and skills!
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
