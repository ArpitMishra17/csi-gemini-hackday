// Client-side utility to log user activities

export type ActivityType =
    | 'scenario_start'
    | 'scenario_complete'
    | 'chat_message'
    | 'career_explore'
    | 'onboarding_complete'
    | 'login'
    | 'page_visit';

export interface ActivityMetadata {
    careerId?: string;
    scenarioId?: string;
    pagePath?: string;
    details?: string;
    careerName?: string;
    scenarioTitle?: string;
}

/**
 * Log a user activity to the server
 * Call this function whenever you want to track user actions
 */
export async function logActivity(
    activityType: ActivityType,
    metadata?: ActivityMetadata
): Promise<boolean> {
    try {
        const response = await fetch('/api/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activityType,
                metadata: metadata || {},
            }),
        });

        if (!response.ok) {
            console.warn('Failed to log activity:', activityType);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error logging activity:', error);
        return false;
    }
}

/**
 * Track a page visit
 */
export function trackPageVisit(pagePath: string): Promise<boolean> {
    return logActivity('page_visit', { pagePath });
}

/**
 * Track when a user starts exploring a career
 */
export function trackCareerExplore(careerId: string, careerName: string): Promise<boolean> {
    return logActivity('career_explore', { careerId, careerName });
}

/**
 * Track when a user starts a scenario
 */
export function trackScenarioStart(
    scenarioId: string,
    careerId: string,
    scenarioTitle: string,
    careerName: string
): Promise<boolean> {
    return logActivity('scenario_start', {
        scenarioId,
        careerId,
        scenarioTitle,
        careerName,
    });
}

/**
 * Track when a user completes a scenario
 */
export function trackScenarioComplete(
    scenarioId: string,
    careerId: string,
    scenarioTitle: string,
    careerName: string
): Promise<boolean> {
    return logActivity('scenario_complete', {
        scenarioId,
        careerId,
        scenarioTitle,
        careerName,
    });
}

/**
 * Track when a user sends a chat message
 */
export function trackChatMessage(): Promise<boolean> {
    return logActivity('chat_message');
}

/**
 * Track when a user completes onboarding
 */
export function trackOnboardingComplete(): Promise<boolean> {
    return logActivity('onboarding_complete');
}

/**
 * Track a login event
 */
export function trackLogin(): Promise<boolean> {
    return logActivity('login');
}
