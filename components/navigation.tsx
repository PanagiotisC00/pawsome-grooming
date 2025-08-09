"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navigation() {
  const { t } = useTranslation()
  const pathname = usePathname()

  // Guard against missing translation keys during prerender
  const safe = (key: string, fallback: string) => {
    const value = t(key)
    return typeof value === "string" && value !== key ? value : fallback
  }
  const navigation = [
    { name: safe("navigation.home", "Home"), href: "/" },
    { name: safe("navigation.services", "Services"), href: "/services" },
    { name: safe("navigation.gallery", "Gallery"), href: "/gallery" },
    { name: safe("navigation.booking", "Booking"), href: "/booking" },
    { name: safe("navigation.contact", "Contact"), href: "/contact" },
    { name: "Admin Dashboard", href: "/dashboard", accent: true }, // renamed and marked for unique color
  ]
  // Accent items use a light blue palette to stand out subtly

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 animate-slide-up">
      <div className="mx-auto w-full max-w-[120rem] flex h-16 items-center justify-between px-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105 group">
          <img src="/logos/original_paw_website_logo.png" alt="Logo" className="h-6 w-6 rounded-sm object-contain" />
          <span className="font-bold text-xl text-gray-900">{safe("brandName", "Pawsome Grooming")}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigation.map((item, index) => (
            <>
              {item.accent && (
                <span
                  key={`${item.name}-divider`}
                  className="mx-2 h-8 w-px bg-gray-300"
                  aria-hidden="true"
                />
              )}
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-gray-100",
                  item.accent
                    ? (pathname === item.href
                        ? "text-[#2b6cb0] bg-[#fde68a]"
                        : "text-[#2b6cb0] bg-[#fef9c3] hover:bg-[#fde68a] active:bg-[#fcd34d]")
                    : pathname === item.href
                      ? "text-[#6e8b7c] bg-[#e8f0ec]"
                      : "text-gray-600 hover:text-gray-900",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </Link>
            </>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <LanguageSwitcher />
          <Button asChild className="transition-all duration-200 hover:scale-105 active:scale-95">
            <Link href="/booking">{safe("navigation.bookNow", "Book Now")}</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-3 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="transition-transform duration-300 hover:scale-105">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{safe("navigation.toggleMenu", "Toggle menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="space-y-3">
                  {navigation.map((item, index) => (
                    <>
                      {item.accent && (
                        <div key={`${item.name}-divider-mobile`} className="my-2 border-t border-gray-200" />
                      )}
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300",
                          item.accent
                            ? (pathname === item.href
                                ? "text-[#2b6cb0] bg-[#fde68a]"
                                : "text-[#2b6cb0] bg-[#fef9c3] hover:bg-[#fde68a] active:bg-[#fcd34d]")
                            : pathname === item.href
                              ? "text-[#6e8b7c] bg-[#e8f0ec]"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item.name}
                      </Link>
                    </>
                  ))}
                </div>
                <div className="pt-6 border-t">
                  <Button asChild className="w-full transition-all duration-200 hover:scale-105 active:scale-95">
                    <Link href="/booking">{safe("navigation.bookNow", "Book Now")}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
