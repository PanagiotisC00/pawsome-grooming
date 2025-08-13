"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Filter, 
  Search, 
  Clock,
  User,
  Phone,
  Mail,
  PawPrint,
  Euro,
  CheckCircle,
  AlertCircle,
  XCircle,
  Scissors
} from "lucide-react"

type Appointment = {
  id: string
  date: string
  time: string
  client: string
  phone: string
  email: string
  pet: string
  species: string
  breed: string
  services: string[]
  status: "pending" | "confirmed" | "completed" | "cancelled"
  total: number
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<string>("all")
  const [day, setDay] = useState<string>("all") // Default to show all so dummy data is visible on first load

  useEffect(() => {
    // Load dummy data from public (static) JSON
    fetch("/data/appointments.json")
      .then((r) => r.json())
      .then((data) => setAppointments(data))
      .catch(() => setAppointments([]))
  }, [])

  const list = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return appointments
      .filter((a) => (day === "today" ? a.date === today : true))
      .filter((a) => (status === "all" ? true : a.status === status))
      .filter((a) =>
        [a.client, a.pet, a.email, a.phone, a.services.join(", ")]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
  }, [appointments, day, status, query])

  const euro = (n: number) => `€${n}`

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full w-full overflow-hidden">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5 text-[#6e8b7c]" /> Appointments
              </CardTitle>
              <CardDescription>Browse, search and filter all upcoming bookings</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
              <Input
                placeholder="Search name, pet, email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-56"
              />
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="all">All Days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-w-full overflow-hidden">
          <div className="mb-4 flex justify-end">
            <Button className="h-9">
              + New Appointment
            </Button>
          </div>
          {/* Modern appointment cards grid with proper overflow handling */}
          <div className="grid gap-4 sm:gap-6 w-full max-w-full">
            {list.map((a) => (
              <Card key={a.id} className="hover:shadow-md transition-all duration-300 border border-gray-200 bg-white w-full max-w-full overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 w-full">
                    
                    {/* Left section: Date, Time, and Client Info */}
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Date, Time, and Status - Stack on mobile, inline on larger screens */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg w-fit">
                          <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <div className="text-sm font-semibold text-blue-900 whitespace-nowrap">{a.date}</div>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg w-fit">
                          <Clock className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <div className="text-sm font-semibold text-purple-900 whitespace-nowrap">{a.time}</div>
                        </div>
                        
                        {/* Status badge */}
                        <Badge 
                          className={`flex items-center gap-1 w-fit ${
                            a.status === "confirmed"
                              ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
                              : a.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100"
                              : a.status === "completed"
                              ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100"
                              : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
                          }`}
                        >
                          {a.status === "confirmed" ? (
                            <CheckCircle className="h-3 w-3 flex-shrink-0" />
                          ) : a.status === "pending" ? (
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          ) : a.status === "completed" ? (
                            <CheckCircle className="h-3 w-3 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-3 w-3 flex-shrink-0" />
                          )}
                          <span className="capitalize font-medium whitespace-nowrap">{a.status}</span>
                        </Badge>
                      </div>

                      {/* Client and Pet Info */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="font-semibold text-gray-900 truncate">{a.client}</span>
                          <span className="text-gray-400">•</span>
                          <PawPrint className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{a.pet}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 whitespace-nowrap">
                            {a.breed}
                          </span>
                        </div>
                        
                        {/* Contact Info - Stack on mobile for better readability */}
                        <div className="flex flex-col gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2 min-w-0">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{a.email}</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{a.phone}</span>
                          </div>
                        </div>
                        
                        {/* Services */}
                        <div className="flex items-start gap-2">
                          <Scissors className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="flex flex-wrap gap-1 min-w-0">
                            {a.services.map((service, idx) => (
                              <span key={idx} className="bg-[#6e8b7c]/10 text-[#6e8b7c] px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right section: Price and Actions */}
                    <div className="flex flex-col lg:items-end gap-3 lg:flex-shrink-0 lg:min-w-fit">
                      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg w-fit lg:ml-auto">
                        <Euro className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-2xl font-bold text-green-900 whitespace-nowrap">{euro(a.total)}</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-[#6e8b7c] hover:bg-[#5a7a6b] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md whitespace-nowrap w-fit lg:ml-auto"
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {list.length === 0 && (
              <Card className="border-2 border-dashed border-gray-200">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No appointments found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


