"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Camera } from "lucide-react"

type Item = { id: number; src: string; title: string; date: string }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetch("/data/gallery.json").then((r) => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Camera className="h-5 w-5 text-[#6e8b7c]" /> Gallery
          </CardTitle>
          <CardDescription>Recent grooming photos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
            <button className="h-9 rounded-md px-4 text-sm font-medium bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-95">Add Picture</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((it) => (
              <div key={it.id} className="rounded-xl border bg-white overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={it.src} alt={it.title} fill className="object-contain bg-white" />
                </div>
                <div className="p-2 text-center">
                  <div className="text-xs font-medium">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.date}</div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground text-sm">No items found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


