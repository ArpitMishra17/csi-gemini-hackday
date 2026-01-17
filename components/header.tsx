"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, LayoutDashboard, MessageCircle, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Header() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            })
            if (res.ok) {
                router.push("/login")
                router.refresh()
            }
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-14 items-center px-4">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">
                            Career Explorer
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <nav className="flex items-center gap-1">
                        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                            <Link href="/dashboard">
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                            <Link href="/demo">
                                <PlayCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">Explore</span>
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                            <Link href="/chat">
                                <MessageCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">Chat</span>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
