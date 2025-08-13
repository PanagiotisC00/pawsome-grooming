"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Scissors,
  Camera,
  Plus,
  Phone,
  Mail,
  Edit,
  Eye,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n"

// Mock data for the dashboard
const upcomingAppointments = [
  {
    id: 1,
    time: "9:00 AM",
    petName: "Max",
    petType: "Golden Retriever",
    ownerName: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah@email.com",
    services: ["Full Grooming", "Nail Trim"],
    status: "confirmed",
    duration: "2 hours",
    notes: "First time client, very friendly dog",
  },
  {
    id: 2,
    time: "11:30 AM",
    petName: "Luna",
    petType: "Persian Cat",
    ownerName: "Mike Chen",
    phone: "(555) 987-6543",
    email: "mike@email.com",
    services: ["Bath & Brush", "De-shedding"],
    status: "pending",
    duration: "1.5 hours",
    notes: "Sensitive to loud noises",
  },
  {
    id: 3,
    time: "2:00 PM",
    petName: "Buddy",
    petType: "Poodle",
    ownerName: "Emily Davis",
    phone: "(555) 456-7890",
    email: "emily@email.com",
    services: ["Full Grooming", "Teeth Cleaning"],
    status: "confirmed",
    duration: "2.5 hours",
    notes: "Regular client, likes treats",
  },
]

const availableSlots = [
  { time: "8:00 AM", available: true },
  { time: "8:30 AM", available: true },
  { time: "9:00 AM", available: false },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: false },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
  { time: "5:00 PM", available: true },
]

const recentGroomingPhotos = [
  {
    id: 1,
    petName: "Max",
    ownerName: "Sarah Johnson",
    date: "2024-01-15",
    image: "/placeholder.svg?height=200&width=200&text=Max",
  },
  {
    id: 2,
    petName: "Bella",
    ownerName: "John Smith",
    date: "2024-01-14",
    image: "/placeholder.svg?height=200&width=200&text=Bella",
  },
  {
    id: 3,
    petName: "Charlie",
    ownerName: "Lisa Brown",
    date: "2024-01-14",
    image: "/placeholder.svg?height=200&width=200&text=Charlie",
  },
  {
    id: 4,
    petName: "Luna",
    ownerName: "Mike Chen",
    date: "2024-01-13",
    image: "/placeholder.svg?height=200&width=200&text=Luna",
  },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [revenueTimeframe, setRevenueTimeframe] = useState("week")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header removed; date/create actions moved to admin toolbar */}

      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Today's Appointments",
              value: "8",
              change: "+2 from yesterday",
              icon: Calendar,
              color: "blue",
              delay: "0ms",
            },
            {
              title: "Today's Revenue",
              value: "€485",
              change: "+12% from yesterday",
              icon: DollarSign,
              color: "green",
              delay: "100ms",
            },
            {
              title: "Available Slots",
              value: "12",
              change: "62% capacity",
              icon: Clock,
              color: "purple",
              delay: "200ms",
            },
            {
              title: "Active Clients",
              value: "156",
              change: "+8 this month",
              icon: Users,
              color: "pink",
              delay: "300ms",
            },
          ].map((metric, index) => (
            <Card
              key={index}
              className={`bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer animate-slide-up`}
              style={{ animationDelay: metric.delay }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{metric.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-xs sm:text-sm text-green-600">{metric.change}</p>
                  </div>
                  <div
                    className={`p-3 ${
                      metric.color === "blue"
                        ? "bg-blue-100"
                        : metric.color === "green"
                          ? "bg-green-100"
                          : metric.color === "purple"
                            ? "bg-purple-100"
                            : "bg-pink-100"
                    } rounded-full animate-scale-in [animation-delay:600ms]`}
                  >
                    <metric.icon
                      className={`h-6 w-6 ${
                        metric.color === "blue"
                          ? "text-blue-600"
                          : metric.color === "green"
                            ? "text-green-600"
                            : metric.color === "purple"
                              ? "text-purple-600"
                              : "text-pink-600"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <Card className="animate-slide-in-left">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Today's Appointments
                    </CardTitle>
                    <CardDescription className="mt-2">Manage your scheduled appointments for today</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent flex-shrink-0"
                    >
                      <Filter className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent flex-shrink-0"
                    >
                      <Search className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Search</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className={`border rounded-xl p-4 sm:p-6 hover:bg-gray-50 transition-all duration-300 animate-slide-up`}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      {/* Mobile-first layout with better information hierarchy */}
                      <div className="space-y-4">
                        {/* Header: Time, Name, and Duration on same line */}
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">{appointment.time}</span>
                            <span className="text-gray-400 flex-shrink-0">•</span>
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{appointment.petName}</h3>
                            <span className="text-gray-400 flex-shrink-0">•</span>
                            <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{appointment.duration}</span>
                          </div>
                        </div>
                        
                        {/* Badges row */}
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <Badge variant="outline" className="text-xs">
                            {appointment.petType}
                          </Badge>
                          <Badge className={`${getStatusColor(appointment.status)} text-xs border`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </Badge>
                        </div>

                        {/* Contact and Service Info */}
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span>{appointment.ownerName}</span>
                          </div>
                          
                          {/* Mobile: Stack contact info vertically, Desktop: horizontal */}
                          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              <span>{appointment.phone}</span>
                            </div>
                            {/* Hide email on very small screens, show on sm+ */}
                            <div className="hidden sm:flex items-center gap-2">
                              <Mail className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate max-w-32 lg:max-w-none">{appointment.email}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Scissors className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span className="flex-1">{appointment.services.join(", ")}</span>
                          </div>
                          
                          {appointment.notes && (
                            <div className="text-xs text-gray-500 mt-3 p-3 bg-gray-100 rounded-lg">
                              <strong>Notes:</strong> {appointment.notes}
                            </div>
                          )}
                        </div>

                        {/* Actions: Full width on mobile, right-aligned on desktop */}
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 sm:border-0 sm:pt-0">
                          {/* Mobile: Show only essential actions, Desktop: Show all */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 sm:mr-0 mr-2" />
                            <span className="sm:sr-only">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          >
                            <Edit className="h-4 w-4 sm:mr-0 mr-2" />
                            <span className="sm:sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Overview */}
            <Card className="animate-slide-in-left [animation-delay:600ms]">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Revenue Overview
                    </CardTitle>
                    <CardDescription className="mt-2">Track your business performance over time</CardDescription>
                  </div>
                  <Select value={revenueTimeframe} onValueChange={setRevenueTimeframe}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mobile: Stack stats vertically, Desktop: 3-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {[
                    { label: "Total Revenue", value: "€3,245", change: "+15% vs last period", color: "green" },
                    { label: "Appointments", value: "42", change: "+8% vs last period", color: "blue" },
                    { label: "Avg. per Service", value: "€77", change: "+5% vs last period", color: "purple" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none animate-scale-in`}
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      <div
                        className={`text-2xl sm:text-3xl font-bold mb-1 ${
                          stat.color === "green"
                            ? "text-green-600"
                            : stat.color === "blue"
                              ? "text-blue-600"
                              : "text-purple-600"
                        }`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                      <div
                        className={`text-xs ${
                          stat.color === "green"
                            ? "text-green-600"
                            : stat.color === "blue"
                              ? "text-blue-600"
                              : "text-purple-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Revenue Chart Placeholder */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center animate-fade-in [animation-delay:1000ms]">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-3 animate-bounce-gentle" />
                    <p className="font-medium">Revenue Chart</p>
                    <p className="text-sm">Interactive chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Available Time Slots */}
            <Card className="animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>Today's availability for new appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile: 1 column for better touch targets, Desktop: 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {availableSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={slot.available ? "outline" : "secondary"}
                      size="sm"
                      className={`justify-center transition-all duration-300 text-sm py-3 sm:py-2 ${
                        slot.available
                          ? "hover:bg-green-50 hover:border-green-300 hover:text-green-700 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          : "opacity-50 cursor-not-allowed"
                      } animate-scale-in`}
                      style={{ animationDelay: `${200 + index * 50}ms` }}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                <Button className="w-full transition-all duration-200 hover:scale-105 active:scale-95 animate-slide-up [animation-delay:800ms]">
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-slide-in-right [animation-delay:200ms]">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Plus, label: "Add Extra Service" },
                  { icon: Camera, label: "Upload Pet Photos" },
                  { icon: Users, label: "View All Clients" },
                  { icon: DollarSign, label: "Generate Report" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95 animate-slide-up`}
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <action.icon className="h-4 w-4 mr-3" />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Removed Recent Grooming Photos section per request */}
          </div>
        </div>
      </div>
    </div>
  )
}
