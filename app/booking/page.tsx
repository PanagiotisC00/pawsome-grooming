"use client"

import type React from "react"

import { useState } from "react"
// Using single bubble title style; cleaned up unused imports
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link" // Compact help CTA link

export default function BookingPage() {
  const { t } = useTranslation()
  const safe = (key: string, fallback: string) => {
    const value = t(key)
    return typeof value === "string" && value !== key ? value : fallback
  }
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    date: "",
    time: "",
    notes: "",
  })

  // Shared service model to match /services (minimal duplication for booking)
  type WeightBand = { label: string; uptoKg: number; price: number }
  type BookingService = { id: string; title: string; bands: WeightBand[] }

  // Weight options and helper to compute price for selected weight
  const WEIGHT_OPTIONS = [
    { label: "Up to 10 kg", value: 10 },
    { label: "11–25 kg", value: 25 },
    { label: "26–40 kg", value: 40 },
  ]
  const [weightKg, setWeightKg] = useState<number>(WEIGHT_OPTIONS[0].value)
  const priceForWeight = (bands: WeightBand[], weight: number): WeightBand => {
    for (const band of bands) if (weight <= band.uptoKg) return band
    return bands[bands.length - 1]
  }

  // Booking services aligned with /services page
  const BOOKING_SERVICES: BookingService[] = [
    {
      id: "full_grooming",
      title: "Full Grooming",
      bands: [
        { label: "Up to 10 kg", uptoKg: 10, price: 45 },
        { label: "11–25 kg", uptoKg: 25, price: 55 },
        { label: "26–40 kg", uptoKg: 40, price: 70 },
      ],
    },
    {
      id: "bath_brush",
      title: "Bath & Brush",
      bands: [
        { label: "Up to 10 kg", uptoKg: 10, price: 25 },
        { label: "11–25 kg", uptoKg: 25, price: 35 },
        { label: "26–40 kg", uptoKg: 40, price: 45 },
      ],
    },
    {
      id: "nail_care",
      title: "Nail Care",
      bands: [{ label: "All sizes", uptoKg: 999, price: 15 }],
    },
    {
      id: "deluxe_spa",
      title: "Deluxe Spa",
      bands: [
        { label: "Up to 25 kg", uptoKg: 25, price: 75 },
        { label: "26–40 kg", uptoKg: 40, price: 95 },
      ],
    },
    {
      id: "flea_tick",
      title: "Flea & Tick Treatment",
      bands: [
        { label: "Up to 25 kg", uptoKg: 25, price: 30 },
        { label: "26–40 kg", uptoKg: 40, price: 40 },
      ],
    },
    {
      id: "express_grooming",
      title: "Express Grooming",
      bands: [
        { label: "Up to 10 kg", uptoKg: 10, price: 35 },
        { label: "11–25 kg", uptoKg: 25, price: 45 },
      ],
    },
    {
      id: "teeth_cleaning",
      title: "Teeth Cleaning",
      bands: [{ label: "All sizes", uptoKg: 999, price: 20 }],
    },
    {
      id: "deshedding",
      title: "De‑shedding Treatment",
      bands: [
        { label: "Up to 10 kg", uptoKg: 10, price: 20 },
        { label: "11–25 kg", uptoKg: 25, price: 30 },
        { label: "26–40 kg", uptoKg: 40, price: 40 },
      ],
    },
  ]

  // Get time slots from translations with fallback to defaults (SSR-safe)
  const getAny = (key: string): any => (t as unknown as (k: string) => any)(key) // minimal runtime helper
  // Added default hourly slots when translations do not provide any
  const generateDefaultTimeSlots = () => {
    const slots: string[] = []
    for (let hour = 9; hour <= 18; hour++) {
      const h = String(hour).padStart(2, "0")
      slots.push(`${h}:00`)
    }
    return slots
  }
  const rawTimeSlots = getAny("booking.timeSlots")
  const timeSlots = Array.isArray(rawTimeSlots) && rawTimeSlots.length > 0 ? rawTimeSlots : generateDefaultTimeSlots()

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId))
    }
  }

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const svc = BOOKING_SERVICES.find((s) => s.id === serviceId)
      if (!svc) return total
      const band = priceForWeight(svc.bands, weightKg)
      return total + band.price
    }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", { formData, selectedServices })
    alert(t("booking.success"))
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
      {/* Single bubble title to match Home/Services styling */}
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="inline-block rounded-full bg-secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3">
          <h1 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-none text-[clamp(1.15rem,1.8vw,2rem)] text-foreground">
            {safe("booking.title", "Schedule Your Pet's Grooming")}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{safe("booking.description", "Fill out the form below to book an appointment for your furry friend. We'll contact you to confirm the details.")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 md:gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{safe("booking.form.title", "Booking Information")}</CardTitle>
              <CardDescription>{safe("booking.form.description", "Please provide your details and select the services you'd like for your pet.")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Owner Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">{safe("booking.form.ownerInfo", "Owner Information")}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">{safe("booking.form.yourName", "Your Name")} *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{safe("booking.form.email", "Email")} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{safe("booking.form.phone", "Phone Number")} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Pet Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">{safe("booking.form.petInfo", "Pet Information")}</h3>
                   <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="petName">{safe("booking.form.petName", "Pet Name")} *</Label>
                      <Input
                        id="petName"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="petType">{safe("booking.form.petType", "Pet Type")} *</Label>
                      <Select
                        value={formData.petType}
                        onValueChange={(value) => setFormData({ ...formData, petType: value })}
                      >
                        <SelectTrigger>
                           <SelectValue placeholder={safe("booking.form.selectPetType", "Select pet type")} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="dog">{safe("booking.form.dog", "Dog")}</SelectItem>
                           <SelectItem value="cat">{safe("booking.form.cat", "Cat")}</SelectItem>
                           <SelectItem value="other">{safe("booking.form.other", "Other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="petBreed">{safe("booking.form.breed", "Breed")}</Label>
                      <Input
                        id="petBreed"
                        value={formData.petBreed}
                        onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="petAge">{safe("booking.form.age", "Age")}</Label>
                      <Input
                        id="petAge"
                        value={formData.petAge}
                        onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Services - mirrored from /services with weight-based pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">{safe("booking.form.selectServices", "Select Services")}</h3>

                  {/* Weight selector to compute prices consistently with /services */}
                  {/* Simplified, toned-down weight selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Pet weight</span>
                    <Select value={String(weightKg)} onValueChange={(v) => setWeightKg(parseInt(v))}>
                      <SelectTrigger className="w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {WEIGHT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    {BOOKING_SERVICES.map((service) => {
                      const band = priceForWeight(service.bands, weightKg)
                      const selected = selectedServices.includes(service.id)
                      return (
                        <div key={service.id} className="flex items-center gap-3">
                          <Checkbox
                            id={service.id}
                            checked={selected}
                            onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                          />
                          <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <span>{service.title}</span>
                              <span className="text-[#6e8b7c] font-medium">€{band.price}</span>
                            </div>
                          </Label>
                        </div>
                      )
                    })}
                  </div>

                  {/* Total */}
                  <div className="pt-2 border-t mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">{t("booking.summary.total")}: €{calculateTotal()}</span>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">{safe("booking.form.dateTime", "Preferred Date & Time")}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="date">{safe("booking.form.preferredDate", "Preferred Date")} *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="time">{safe("booking.form.preferredTime", "Preferred Time")} *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => setFormData({ ...formData, time: value })}
                      >
                        <SelectTrigger>
                           <SelectValue placeholder={safe("booking.form.selectTime", "Select time")} />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time: string) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">{safe("booking.form.additionalNotes", "Additional Notes")}</Label>
                   <Textarea
                    id="notes"
                     placeholder={safe("booking.form.notesPlaceholder", "Any special requests or information about your pet...")}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {safe("booking.form.submitBooking", "Submit Booking Request")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Compact help panel with centered CTA */}
          <Card className="bg-secondary">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-base">{safe("booking.help.title", "Have a question?")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 flex justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">{safe("booking.help.contactUs", "Contact Us")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
