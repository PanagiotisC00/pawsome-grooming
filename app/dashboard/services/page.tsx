"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Scissors } from "lucide-react"

type Band = { label: string; price: number }
type Service = { id: string; title: string; duration: string; bands: Band[] }

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("/data/services.json").then((r) => r.json()).then(setServices).catch(() => setServices([]))
  }, [])

  const list = useMemo(() => {
    return services.filter((s) =>
      [s.title, s.duration, s.bands.map((b) => `${b.label} €${b.price}`).join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [services, query])

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Scissors className="h-5 w-5 text-[#6e8b7c]" /> Services
            </CardTitle>
            <CardDescription>Manage available services and Euro pricing</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-72"
            />
            {/* Hoverable CTA for adding a service */}
            <button className="h-9 rounded-md px-4 text-sm font-medium bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-95">New Service</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((s) => (
              <div key={s.id} className="rounded-xl border p-4 bg-white">
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <div className="text-sm text-muted-foreground mb-2">{s.duration}</div>
                <ul className="space-y-1 text-sm">
                  {s.bands.map((b, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="text-muted-foreground">{b.label}</span>
                      <span className="font-medium">€{b.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {list.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground text-sm">No services found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


