"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // CTA button to booking
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"

// Rebuilt gallery list using images 1-10 from public/gallery
const galleryImages = [
  { id: 1, src: "/gallery/1.png", title: "Snow", description: "Full Grooming" },
  { id: 2, src: "/gallery/2.png", title: "Milo", description: "Bath & Brush" },
  { id: 3, src: "/gallery/3.png", title: "Max", description: "De‑shedding" },
  { id: 4, src: "/gallery/4.png", title: "Bella", description: "Style & Cut" },
  { id: 5, src: "/gallery/5.png", title: "Charlie", description: "Nail Care" },
  { id: 6, src: "/gallery/6.png", title: "Shadow", description: "Long Hair Care" },
  { id: 7, src: "/gallery/7.png", title: "Rocky", description: "Full Grooming" },
  { id: 8, src: "/gallery/8.png", title: "Luna", description: "Bath & Brush" },
  { id: 9, src: "/gallery/9.png", title: "Rex", description: "De‑shedding" },
  { id: 10, src: "/gallery/10.png", title: "Princess", description: "Style & Finish" },
]

export default function GalleryPage() {
  const { t } = useTranslation()
  // Map English descriptor to a translation key; minimal change without altering data shape
  const serviceKeyByEn: Record<string, string> = {
    "Full Grooming": "fullGrooming",
    "Bath & Brush": "bathBrush",
    "De‑shedding": "deshedding",
    "Style & Cut": "styleCut",
    "Nail Care": "nailCare",
    "Long Hair Care": "longHairCare",
    "Style & Finish": "styleFinish",
  }
  const translateService = (enLabel: string) => {
    const key = serviceKeyByEn[enLabel]
    if (!key) return enLabel
    const full = `gallery.serviceNames.${key}`
    const translated = t(full)
    return typeof translated === "string" && translated !== full ? translated : enLabel
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
      {/* Single bubble title like Home/Services */}
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="inline-block rounded-full bg-secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3">
          <h1 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-none text-[clamp(1.15rem,1.8vw,2rem)] text-foreground">
            {t("gallery.title")}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("gallery.description")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {galleryImages.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={800}
                  height={800}
                  className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-contain bg-white p-2 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{translateService(item.description)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wrap gallery CTA in a card for emphasis */}
      <Card className="mt-12 bg-secondary">
        <CardContent className="text-center space-y-4 p-6 md:p-8">
          <h2 className="text-2xl font-bold">{t("gallery.cta.title")}</h2>
          <p className="text-muted-foreground">{t("gallery.cta.description")}</p>
          <div>
            <Button asChild size="lg" className="mt-2"><Link href="/booking">{t("gallery.cta.bookNow")}</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
