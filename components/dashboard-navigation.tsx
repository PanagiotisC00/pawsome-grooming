"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  Calendar,
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
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Services", href: "/dashboard/services", icon: Scissors },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
  { name: "Gallery", href: "/dashboard/gallery", icon: Camera },
]

export function DashboardNavigation() {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b shadow-sm">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-start gap-4">
          {/* Compact, curved admin toolbar */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full ring-1 ring-border bg-white/80 backdrop-blur px-2 py-1 shadow-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors hover:bg-gray-100",
                  pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <span className="mx-2 h-5 w-px bg-gray-300" />
            <Input
              type="date"
              className="h-8 w-[11rem] rounded-full border-0 bg-transparent px-3 text-sm focus-visible:ring-0 focus-visible:border-0"
            />
          </nav>

          {/* Yellow pill: notifications + static admin avatar */}
          <div className="hidden lg:inline-flex items-center gap-1 rounded-full bg-[#fef9c3] ring-1 ring-border px-2 py-1 shadow-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-black/5">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
            <span className="mx-1 h-5 w-px bg-gray-300" />
            {/* Desktop profile dropdown (UI only; actions disabled) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-border bg-white/80">
                    <User className="h-4 w-4" />
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
          </div>

          {/* Mobile: condensed menu (no profile actions on desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full lg:hidden">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
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
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pt-2">
          <div className="flex items-center justify-between gap-2">
            <Input type="date" className="h-9" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100",
                        pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
