"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter, Search } from "lucide-react"

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
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5 text-[#6e8b7c]" /> Appointments
              </CardTitle>
              <CardDescription>Browse, search and filter all upcoming bookings</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Input
                placeholder="Search name, pet, email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-56"
              />
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="all">All Days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40">
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
        <CardContent>
          <div className="mb-4 flex justify-end">
            <Button className="h-9">
              + New Appointment
            </Button>
          </div>
          <div className="divide-y rounded-lg border">
            {list.map((a) => (
              <div key={a.id} className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 p-4">
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium text-foreground">{a.date}</div>
                  <div>{a.time}</div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium">{a.client}</span>
                    <span className="text-muted-foreground">• {a.pet}</span>
                    <span className="text-muted-foreground">• {a.services.join(", ")}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ring-1 ring-inset ${
                        a.status === "confirmed"
                          ? "bg-green-50 text-green-700 ring-green-200"
                          : a.status === "pending"
                          ? "bg-yellow-50 text-yellow-700 ring-yellow-200"
                          : a.status === "completed"
                          ? "bg-blue-50 text-blue-700 ring-blue-200"
                          : "bg-red-50 text-red-700 ring-red-200"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {a.email} • {a.phone}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{euro(a.total)}</div>
                  <Button variant="outline" size="sm" className="mt-2">Manage</Button>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <div className="p-6 text-center text-muted-foreground text-sm">No appointments found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


