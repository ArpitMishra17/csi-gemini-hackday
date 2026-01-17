import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"

export default function OnboardingPage() {
    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center">
            <div className="w-full max-w-4xl px-4 py-8">
                <OnboardingWizard />
            </div>
        </div>
    )
}
