"use client"

import type React from "react"

import { useState } from "react"
// Removed separate badge; using single bubble title style
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function ContactPage() {
  const { t } = useTranslation()
  const safe = (key: string, fallback: string) => {
    const value = t(key)
    return typeof value === "string" && value !== key ? value : fallback
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    alert(t("contact.success"))
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
      {/* Single bubble title to match other pages */}
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="inline-block rounded-full bg-secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3">
          <h1 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-none text-[clamp(1.15rem,1.8vw,2rem)] text-foreground">
            {safe("contact.title", "Get in Touch")}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{safe("contact.description", "Have questions about our services or want to schedule an appointment? We'd love to hear from you!")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>{safe("contact.form.title", "Send us a Message")}</CardTitle>
            <CardDescription>{safe("contact.form.description", "Fill out the form below and we'll get back to you as soon as possible.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{safe("contact.form.name", "Name")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{safe("contact.form.email", "Email")} *</Label>
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
                <Label htmlFor="phone">{safe("contact.form.phone", "Phone Number")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{safe("contact.form.subject", "Subject")} *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{safe("contact.form.message", "Message")} *</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {safe("contact.form.sendMessage", "Send Message")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{safe("contact.info.title", "Contact Information")}</CardTitle>
              <CardDescription>{safe("contact.info.description", "Reach out to us through any of these channels.")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg ring-1 ring-border">
                  <MapPin className="h-5 w-5 text-[#6e8b7c]" />
                </div>
                <div>
                  <h3 className="font-semibold">{safe("contact.info.address", "Address")}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">Address 1
Town 2, Cyprus</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg ring-1 ring-border">
                  <Phone className="h-5 w-5 text-[#6e8b7c]" />
                </div>
                <div>
                  <h3 className="font-semibold">{safe("contact.info.phone", "Phone")}</h3>
                  <p className="text-muted-foreground">+357 22 123456</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg ring-1 ring-border">
                  <Mail className="h-5 w-5 text-[#6e8b7c]" />
                </div>
                <div>
                  <h3 className="font-semibold">{safe("contact.info.email", "Email")}</h3>
                  <p className="text-muted-foreground">info@pawsomegrooming.cy</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg ring-1 ring-border">
                  <Clock className="h-5 w-5 text-[#6e8b7c]" />
                </div>
                <div>
                  <h3 className="font-semibold">{safe("contact.info.businessHours", "Business Hours")}</h3>
                  <div className="text-muted-foreground whitespace-pre-line">Mon–Fri: 8:00–18:00
Sat: 9:00–17:00
Sun: 10:00–16:00</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/** Emergency contact card removed per request */}
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <Card className="bg-secondary overflow-hidden"> {/* Beautified map card */}
          <CardHeader className="text-center">
            <CardTitle>{safe("contact.map.title", "Find Us")}</CardTitle>
            <CardDescription>{safe("contact.map.description", "We're conveniently located in the heart of the city.")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mx-auto w-full max-w-2xl">
              <div className="relative rounded-xl ring-1 ring-border bg-gradient-to-br from-[#e8f0ec] to-[#f3eee6] shadow-sm overflow-hidden">
                <div className="aspect-[4/3] flex items-center justify-center p-6">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-[#6e8b7c] mx-auto" />
                    <p className="text-muted-foreground">{safe("contact.map.placeholder", "Interactive map would be embedded here")}</p>
                    <p className="text-sm text-muted-foreground">Address 1, Town 2, Cyprus</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(600px_200px_at_20%_20%,rgba(255,255,255,0.6),transparent),radial-gradient(400px_160px_at_80%_80%,rgba(255,255,255,0.4),transparent)]" />
              </div>
              <div className="text-center mt-4">
                {/* Localize the "Get Directions" CTA */}
                <Button asChild size="lg">
                  <a href="https://www.google.com/maps/search/?api=1&query=Address%201%2C%20Town%202%2C%20Cyprus" target="_blank" rel="noopener noreferrer">{safe("contact.map.getDirections", "Get Directions")}</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
