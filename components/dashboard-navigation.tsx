"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  LayoutDashboard,
  Calendar as CalendarIcon,
  CalendarDays,
  Users,
  Scissors,
  DollarSign,
  Camera,
  LogOut,
  Bell,
  Search,
  User,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import { Input } from "@/components/ui/input"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/dashboard/appointments", icon: CalendarIcon },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Services", href: "/dashboard/services", icon: Scissors },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
  { name: "Gallery", href: "/dashboard/gallery", icon: Camera },
]

export function DashboardNavigation() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Ensure consistent date formatting by only rendering on client
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Close calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false)
      }
    }

    if (calendarOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [calendarOpen])

  // Handle calendar button click
  const handleCalendarClick = () => {
    setCalendarOpen(!calendarOpen)
  }

  // Format date consistently (YYYY-MM-DD format)
  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  return (
    <header className="fixed top-16 left-0 right-0 z-[40] w-full bg-gradient-to-r from-gray-50 to-gray-100/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50/80 border-t border-gray-200/50 shadow-inner">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="flex items-center justify-between">
          {/* Admin breadcrumb-style navigation */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 bg-white/60 rounded-full px-3 py-1 ring-1 ring-gray-200/50">
              <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse-soft"></div>
              <span className="font-medium">Admin Panel</span>
            </div>
            <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 hover:bg-white/80 hover:shadow-sm",
                  pathname === item.href 
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50" 
                    : "text-gray-600 hover:text-gray-800",
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.name}
              </Link>
            ))}
            <span className="mx-1 h-3 w-px bg-gray-300/60" />
            {/* Calendar with simple dropdown approach */}
            <div className="relative" ref={calendarRef}>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-3 rounded-md bg-white/60 hover:bg-white ring-1 ring-gray-200/50 text-xs text-gray-700 hover:text-gray-900"
                onClick={handleCalendarClick}
              >
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                {isClient && date ? formatDate(date) : "Calendar"}
                
              </Button>
              
              {calendarOpen && (
                <div 
                  className="fixed left-1/2 -translate-x-1/2 top-20 lg:absolute lg:left-0 lg:translate-x-0 lg:top-8 z-[100] bg-white border border-gray-200 rounded-lg shadow-xl"
                  style={{ zIndex: 100 }}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setCalendarOpen(false)
                    }}
                    initialFocus
                  />
                </div>
              )}
            </div>
          </nav>
          </div>

          {/* Profile + Notifications in their own box */}
          <div className="hidden lg:inline-flex items-center gap-1 rounded-md bg-white/60 ring-1 ring-gray-200/50 px-2 py-1">
            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full hover:bg-gray-100/80 p-0">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-gray-200/50 bg-white/80">
                    <User className="h-2.5 w-2.5" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 text-sm font-medium">Profile</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>View Profile</DropdownMenuItem>
                <DropdownMenuItem disabled>Account Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <span className="h-3 w-px bg-gray-300/60" />
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-6 w-6 hover:bg-gray-100/80 rounded-full p-0">
                  <Bell className="h-3 w-3" />
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-3 py-2 text-sm font-medium">Notifications</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="whitespace-normal">Appointment A-1002 is pending confirmation.</DropdownMenuItem>
                <DropdownMenuItem className="whitespace-normal">New client Mike Chen created.</DropdownMenuItem>
                <DropdownMenuItem className="whitespace-normal">Revenue report is ready to view.</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pt-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/60 rounded-full px-3 py-1.5 ring-1 ring-gray-200/50">
              <div className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-pulse-soft"></div>
              <span className="font-medium">Admin</span>
            </div>
            {/* Mobile: Calendar with simple dropdown */}
            <div className="relative" ref={calendarRef}>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 rounded-md bg-white/60 hover:bg-white ring-1 ring-gray-200/50 text-xs text-gray-700"
                onClick={handleCalendarClick}
              >
                <CalendarDays className="h-3.5 w-3.5" />

              </Button>
              
              {calendarOpen && (
                <div 
                  className="fixed left-1/2 -translate-x-1/2 top-20 sm:absolute sm:left-auto sm:right-0 sm:translate-x-0 sm:top-8 z-[100] bg-white border border-gray-200 rounded-lg shadow-xl"
                  style={{ zIndex: 100 }}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setCalendarOpen(false)
                    }}
                    initialFocus
                  />
                </div>
              )}
            </div>
            
            {/* Mobile: Profile + Notifications in their own box */}
            <div className="flex items-center gap-1 bg-white/60 rounded-md px-2 py-1 ring-1 ring-gray-200/50">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full hover:bg-gray-100/80 p-0">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-gray-200/50 bg-white/80">
                      <User className="h-2.5 w-2.5" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Store Owner</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">owner@pawsomegrooming.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/">View Website</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span className="h-3 w-px bg-gray-300/60" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-6 w-6 hover:bg-gray-100/80 rounded-full p-0">
                    <Bell className="h-3 w-3" />
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="px-3 py-2 text-sm font-medium">Notifications</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="whitespace-normal">Appointment A-1002 is pending confirmation.</DropdownMenuItem>
                  <DropdownMenuItem className="whitespace-normal">New client Mike Chen created.</DropdownMenuItem>
                  <DropdownMenuItem className="whitespace-normal">Revenue report is ready to view.</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="[&_[data-radix-popper-content-wrapper]]:z-[80] [&_[data-slot='sheet-portal']]:z-[80] [&_[data-slot='sheet-overlay']]:z-[80]">
              <Sheet modal={true}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-80 z-[80] [&~div]:z-[80]"
                style={{ zIndex: 80 } as React.CSSProperties}
              >
                <SheetHeader className="pt-12 pb-4 pr-8">
                  <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation menu with main site and admin panel options
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-2">
                  {/* Main Navigation Section */}
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200/50">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="font-medium">Main Navigation</span>
                      </div>
                    </div>
                    {[
                      { name: "Home", href: "/" },
                      { name: "Services", href: "/services" },
                      { name: "Gallery", href: "/gallery" },
                      { name: "Booking", href: "/booking" },
                      { name: "Contact", href: "/contact" },
                    ].map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-50 text-gray-600"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {/* Admin Navigation Section */}
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-amber-50 rounded-lg border border-amber-200/50">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse-soft"></div>
                        <span className="font-medium">Admin Panel</span>
                      </div>
                    </div>
                    {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-gray-50",
                          pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  </div>

                  {/* Book Now Button */}
                  <div className="pt-2 pb-6">
                    <SheetClose asChild>
                      <Button asChild className="w-full transition-all duration-200 hover:scale-105 active:scale-95">
                        <Link href="/booking">Book Now</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
