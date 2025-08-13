import type React from "react"
import { DashboardNavigation } from "@/components/dashboard-navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <DashboardNavigation />
      <div className="pt-[5.5rem] w-full">{children}</div>
    </div>
  )
}
