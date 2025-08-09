"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users } from "lucide-react"

type Pet = { name: string; species: string; breed: string; age: number }
type Client = { id: string; name: string; phone: string; email: string; pets: Pet[]; visits: number }

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("/data/clients.json")
      .then((r) => r.json())
      .then((data) => setClients(data))
      .catch(() => setClients([]))
  }, [])

  const list = useMemo(() => {
    return clients.filter((c) =>
      [c.name, c.email, c.phone, c.pets.map((p) => p.name).join(", ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [clients, query])

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-5 w-5 text-[#6e8b7c]" /> Clients
            </CardTitle>
            <CardDescription>All customers and their pets</CardDescription>
          </div>
          <Input
            placeholder="Search clients or pets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-72"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((c) => (
              <div key={c.id} className="rounded-xl border p-4 bg-white">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-foreground">{c.name}</h3>
                  <span className="text-xs text-muted-foreground">{c.visits} visits</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{c.email}</div>
                <div className="text-sm text-muted-foreground">{c.phone}</div>
                <div className="mt-3">
                  <div className="text-xs font-medium mb-1">Pets</div>
                  <ul className="space-y-1">
                    {c.pets.map((p, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {p.name} • {p.species} • {p.breed} • {p.age}y
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground text-sm">No clients found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


