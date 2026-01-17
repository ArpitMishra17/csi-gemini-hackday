'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Mail, User } from 'lucide-react';

interface UserProfileCardProps {
    name: string;
    email: string;
    avatar: string | null;
    memberSince: string;
}

export function UserProfileCard({ name, email, avatar, memberSince }: UserProfileCardProps) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const formattedDate = new Date(memberSince).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary" />
            <CardContent className="relative pt-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                        <AvatarImage src={avatar || undefined} alt={name} />
                        <AvatarFallback className="text-2xl bg-secondary">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left pb-2">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <User className="h-5 w-5 text-muted-foreground" />
                            {name}
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-muted-foreground text-sm mt-1">
                            <span className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {email}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Member since {formattedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
