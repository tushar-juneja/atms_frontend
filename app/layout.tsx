import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import { AuthProvider } from "./contexts/authContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
title: "AudiBook - College Auditorium Booking System",
description: "Book seats for college events easily with AudiBook",
generator: 'v0.dev'
}

export default function RootLayout({
children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
    <AuthProvider>
        <html lang="en" suppressHydrationWarning>

        <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <main className="flex-1">{children}</main>
                    <SiteFooter />
                </div>
            </ThemeProvider>
        </body>

        </html>
    </AuthProvider>
    )
    }



    import './globals.css'
