"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"

export function ConditionalHeader() {
    const pathname = usePathname()

    // Hide header on auth and onboarding pages
    const hideHeaderRoutes = ['/login', '/signup', '/onboarding']
    const shouldHideHeader = hideHeaderRoutes.includes(pathname)

    if (shouldHideHeader) {
        return null
    }

    return <Header />
}
