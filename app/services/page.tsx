
"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Scissors, Heart, Star, Sparkles, Shield, Zap, Droplets } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

// i18n: we keep English defaults in the model and read localized strings via translations (minimal change)
type WeightBand = { label: string; uptoKg: number; price: number }
type Service = {
  icon: React.ComponentType<{ className?: string }>
  i18nKey: string
  title: string
  description: string
  duration: string
  popular?: boolean
  bands: WeightBand[]
  features: string[]
}

const euro = (n: number) => `€${n}`

const SERVICES: Service[] = [
  {
    icon: Scissors,
    i18nKey: "fullGrooming",
    title: "Full Grooming",
    description:
      "Complete grooming package including bath, cut, nail trim, ear cleaning, and teeth brushing.",
    duration: "2–3 hours",
    popular: true,
    bands: [
      { label: "Up to 10 kg", uptoKg: 10, price: 45 },
      { label: "11–25 kg", uptoKg: 25, price: 55 },
      { label: "26–40 kg", uptoKg: 40, price: 70 },
    ],
    features: [
      "Professional haircut & styling",
      "Premium shampoo & conditioning",
      "Nail trimming & filing",
      "Ear cleaning & inspection",
    ],
  },
  {
    icon: Heart,
    i18nKey: "bathBrush",
    title: "Bath & Brush",
    description: "Relaxing bath with premium shampoo and thorough brushing.",
    duration: "1–1.5 hours",
    bands: [
      { label: "Up to 10 kg", uptoKg: 10, price: 25 },
      { label: "11–25 kg", uptoKg: 25, price: 35 },
      { label: "26–40 kg", uptoKg: 40, price: 45 },
    ],
    features: ["Premium shampoo selection", "Deep conditioning", "Thorough brushing", "Professional blow dry"],
  },
  {
    icon: Star,
    i18nKey: "nailCare",
    title: "Nail Care",
    description: "Professional nail trimming and paw care.",
    duration: "30 minutes",
    bands: [{ label: "All sizes", uptoKg: 999, price: 15 }],
    features: ["Nail trimming & filing", "Paw pad moisturizing", "Quick nail inspection"],
  },
  {
    icon: Sparkles,
    i18nKey: "deluxeSpa",
    title: "Deluxe Spa",
    description: "Premium spa experience with specialized treatments and luxury products.",
    duration: "3–4 hours",
    bands: [
      { label: "Up to 25 kg", uptoKg: 25, price: 75 },
      { label: "26–40 kg", uptoKg: 40, price: 95 },
    ],
    features: [
      "Aromatherapy bath",
      "Deep conditioning mask",
      "Paw & nose balm treatment",
      "Luxury cologne",
    ],
  },
  {
    icon: Shield,
    i18nKey: "fleaTick",
    title: "Flea & Tick Treatment",
    description: "Treatment to eliminate and prevent flea and tick infestations.",
    duration: "~1 hour",
    bands: [
      { label: "Up to 25 kg", uptoKg: 25, price: 30 },
      { label: "26–40 kg", uptoKg: 40, price: 40 },
    ],
    features: ["Medicated shampoo", "Thorough comb-out", "Preventive spray"],
  },
  {
    icon: Zap,
    i18nKey: "expressGrooming",
    title: "Express Grooming",
    description: "Quick bath & dry, basic trim, nail trim and ear cleaning.",
    duration: "~1 hour",
    bands: [
      { label: "Up to 10 kg", uptoKg: 10, price: 35 },
      { label: "11–25 kg", uptoKg: 25, price: 45 },
    ],
    features: ["Quick bath & dry", "Basic trim", "Nail trim", "Ear cleaning"],
  },
  {
    icon: Sparkles,
    i18nKey: "teethCleaning",
    title: "Teeth Cleaning",
    description: "Gentle teeth brushing and mouth freshening.",
    duration: "~30 minutes",
    bands: [{ label: "All sizes", uptoKg: 999, price: 20 }],
    features: ["Plaque brushing", "Breath freshening", "Quick dental inspection"],
  },
  {
    icon: Droplets,
    i18nKey: "deshedding",
    title: "De‑shedding Treatment",
    description: "Undercoat removal and coat conditioning to reduce shedding.",
    duration: "45–60 minutes",
    bands: [
      { label: "Up to 10 kg", uptoKg: 10, price: 20 },
      { label: "11–25 kg", uptoKg: 25, price: 30 },
      { label: "26–40 kg", uptoKg: 40, price: 40 },
    ],
    features: ["Undercoat removal", "Blow out", "Coat conditioning"],
  },
]

const WEIGHT_OPTIONS = [
  { label: "Up to 10 kg", value: 10 },
  { label: "11–25 kg", value: 25 },
  { label: "26–40 kg", value: 40 },
]

function priceForWeight(bands: WeightBand[], weight: number): WeightBand {
  for (const band of bands) {
    if (weight <= band.uptoKg) return band
  }
  return bands[bands.length - 1]
}

export default function ServicesPage() {
  const { t } = useTranslation()
  const [weightKg, setWeightKg] = useState<number>(WEIGHT_OPTIONS[0].value)
  const translate = (key: string, fallback: string) => {
    const value = t(key)
    return typeof value === "string" && value !== key ? value : fallback
  }
  const translateWeightLabel = (label: string) => translate(`services.weightLabels.${label}`, label)

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
      <div className="flex flex-col items-center gap-4 mb-10 text-center">
        <div className="inline-block rounded-full bg-secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3 animate-slide-up">
          <h1 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-none text-[clamp(1.15rem,1.8vw,2rem)] text-foreground">
            {t("services.title")}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">{t("services.description")}</p>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{translate("services.weight", "Pet weight")}</span>
          <Select value={String(weightKg)} onValueChange={(v) => setWeightKg(parseInt(v))}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WEIGHT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={String(opt.value)}>
                  {translateWeightLabel(opt.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid items-stretch grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 md:gap-8 mb-12">
        {SERVICES.map((service) => {
          const baseKey = `services.cards.${service.i18nKey}`
          const title = translate(`${baseKey}.title`, service.title)
          const description = translate(`${baseKey}.description`, service.description)
          const duration = translate(`${baseKey}.duration`, service.duration)
          const translatedFeatures = service.features.map((defaultFeature, idx) =>
            translate(`${baseKey}.features.${idx}`, defaultFeature),
          )
          const band = priceForWeight(service.bands, weightKg)
          // Fallback to Scissors icon if a provided icon is missing/undefined
          const IconComp = (service.icon || Scissors) as React.ComponentType<{ className?: string }>
          return (
            <Card
              key={service.i18nKey}
              className={`relative overflow-hidden hover:shadow-lg transition-shadow ${service.popular ? "ring-2 ring-[#6e8b7c]" : ""} flex h-full flex-col`}
            >
            {/* Inline badge prevents overlapping title */}
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#e8f0ec] rounded-lg">
                    <IconComp className="h-6 w-6 text-[#6e8b7c]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{title}</CardTitle>
                      {service.popular && (
                        <Badge className="bg-[#6e8b7c] text-white whitespace-nowrap">{t("services.mostPopular")}</Badge>
                      )}
                    </div>
                    {/* Show only approximate time under title per request */}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{duration}</span>
                    </div>
                  </div>
                </div>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="space-y-2 mb-4">
                  {service.bands.map((b) => (
                    <div key={b.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{translateWeightLabel(b.label)}</span>
                      <span className="font-semibold text-[#6e8b7c]">{euro(b.price)}</span>
                    </div>
                  ))}
                </div>
                {translatedFeatures.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {translatedFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 bg-[#6e8b7c] rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button className="w-full mt-auto" asChild>
                  <Link href="/booking">{t("services.bookThisService")}</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Match Gallery CTA styling: soft card with centered content */}
      <Card className="mt-12 bg-secondary">
        <CardContent className="text-center space-y-4 p-6 md:p-8">
          <h2 className="text-3xl font-bold">{t("services.cta.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("services.cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/booking">{t("services.cta.bookAppointment")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">{t("services.cta.askQuestions")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
