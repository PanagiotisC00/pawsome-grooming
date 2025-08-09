"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

type Series = { label: string; value: number }
type Revenue = { totals: { month: number; lastMonth: number }; series: Series[] }

export default function AdminRevenuePage() {
  const [data, setData] = useState<Revenue | null>(null)

  useEffect(() => {
    fetch("/data/revenue.json").then((r) => r.json()).then(setData).catch(() => setData(null))
  }, [])

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5 text-[#6e8b7c]" /> Revenue
          </CardTitle>
          <CardDescription>Monthly totals and weekly breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <input type="month" className="h-9 rounded-md border px-3 text-sm" />
            <select className="h-9 rounded-md border px-3 text-sm">
              <option>Per Month</option>
              <option>Per Year</option>
              <option>Custom Range</option>
            </select>
            <input type="date" className="h-9 rounded-md border px-3 text-sm" />
            <input type="date" className="h-9 rounded-md border px-3 text-sm" />
            <button className="h-9 rounded-md px-4 text-sm font-medium bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-95">Apply</button>
          </div>
          {data ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4 bg-white">
                  <div className="text-sm text-muted-foreground">This Month</div>
                  <div className="text-2xl font-bold">€{data.totals.month}</div>
                </div>
                <div className="rounded-xl border p-4 bg-white">
                  <div className="text-sm text-muted-foreground">Last Month</div>
                  <div className="text-2xl font-bold">€{data.totals.lastMonth}</div>
                </div>
                <div className="rounded-xl border p-4 bg-white">
                  <div className="text-sm text-muted-foreground">Change</div>
                  <div className="text-2xl font-bold">
                    {Math.round(((data.totals.month - data.totals.lastMonth) / data.totals.lastMonth) * 100)}%
                  </div>
                </div>
              </div>
              <div className="rounded-xl border p-4 bg-white">
                <div className="text-sm font-medium mb-2">Weekly</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.series.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                      <div className="text-lg font-semibold">€{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground text-sm">No revenue data.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


