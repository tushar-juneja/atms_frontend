"use client";

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Menu, Moon, Sun, Ticket } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { useTheme } from "@/components/theme-provider"

// import { useAuth } from '@/app/contexts/authContext';
// import { Span } from "next/dist/trace"

// export function SiteHeader() {
//   const pathname = usePathname()
//   const { setTheme, theme } = useTheme()
//   const [isScrolled, setIsScrolled] = useState(false)
//   const { user } = useAuth();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-200 ${
//         isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
//       }`}
//     >
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-6">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
//               <Ticket className="h-4 w-4" />
//               <div className="absolute -inset-0.5 animate-pulse-slow rounded-full bg-primary/50 blur-sm"></div>
//             </div>
//             <span className="hidden font-bold sm:inline-block">
//               <span className="gradient-text">Audi</span>Book
//             </span>
//           </Link>
//           <nav className="hidden md:flex gap-6">
//             <Link
//               href="/"
//               className={`text-sm font-medium transition-colors hover:text-primary ${
//                 pathname === "/" ? "text-primary" : "text-muted-foreground"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               href="#events"
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//             >
//               Events
//             </Link>
//             <Link
//               href="#about"
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//             >
//               About
//             </Link>
//             <Link
//               href="#contact"
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//             >
//               Contact
//             </Link>
//           </nav>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             aria-label="Toggle theme"
//             className="mr-2"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           >
//             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>

//           {user ? (
//             <Link href="/profile">
//               <Button variant="outline" size="sm" className="hidden sm:flex">
//                 {user.name}
//               </Button>
//             </Link>
//           ) : (
//             <>
//             <Link href="/login">
//               <Button variant="outline" size="sm" className="hidden sm:flex">
//                 Log in
//               </Button>
//             </Link>
//             <Link href="/register">
//               <Button size="sm" className="hidden sm:flex">
//                 Sign up
//               </Button>
//             </Link>
//             </>
//           )}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <nav className="flex flex-col gap-4 mt-8">
//                 <Link
//                   href="/"
//                   className={`text-lg font-medium transition-colors hover:text-primary ${
//                     pathname === "/" ? "text-primary" : "text-foreground"
//                   }`}
//                 >
//                   Home
//                 </Link>
//                 <Link href="#events" className="text-lg font-medium transition-colors hover:text-primary">
//                   Events
//                 </Link>
//                 <Link href="#about" className="text-lg font-medium transition-colors hover:text-primary">
//                   About
//                 </Link>
//                 <Link href="#contact" className="text-lg font-medium transition-colors hover:text-primary">
//                   Contact
//                 </Link>
//                 <div className="flex flex-col gap-2 mt-4">
//                   <Link href="/login">
//                     <Button variant="outline" className="w-full">
//                       Log in
//                     </Button>
//                   </Link>
//                   <Link href="/signup">
//                     <Button className="w-full">Sign up</Button>
//                   </Link>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }

import React, { useState, useEffect } from "react";
import {
  Menu,
  Moon,
  Sun,
  Ticket,
  User,
  ChevronDown,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//import { useAuth } from '@/app/contexts/authContext'; // Removed next.js specific
import { cn } from "@/lib/utils";
import { logout } from "@/app/services/authApi"
import { useAuth } from "@/app/contexts/authContext";

// Mock next/link and next/navigation for environments outside of Next.js
const Link = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <a href={href} {...props}>
    {children}
  </a>
);

const usePathname = () => "/"; // Mocked for non-Next.js environments

// Mock useAuth for environments outside of Next.js

export function SiteHeader() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Ticket className="h-4 w-4" />
              <div className="absolute -inset-0.5 animate-pulse-slow rounded-full bg-primary/50 blur-sm"></div>
            </div>
            <span className="hidden font-bold sm:inline-block">
              <span className="gradient-text">Audi</span>
              Book
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              href="#events"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Events
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user.name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </span>
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild onClick={logout} >
                  {/* <Link href="/logout"> */}
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Logout
                    </span>
                  {/* </Link> */}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      My Bookings
                    </span>
                  </Link>
                </DropdownMenuItem>
                {/* Add more profile-related actions here */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="hidden sm:flex">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/" ? "text-primary" : "text-foreground"
                  )}
                >
                  Home
                </Link>
                <Link
                  href="#events"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Events
                </Link>
                <Link
                  href="#about"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
