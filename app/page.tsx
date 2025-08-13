"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Scissors, Heart, Star, Shield, Clock, Award, Phone } from "lucide-react" // Using icon instead of emoji per project rule
import { useTranslation } from "@/lib/i18n"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#fff8f0] to-[#e8f0ec] overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
          <div className="flex flex-col gap-8 md:gap-10 items-center text-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="inline-block mx-auto animate-slide-up rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3 max-w-full">
                <h1 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-tight text-[clamp(1.15rem,1.8vw,2rem)] text-foreground text-center break-words">
                  {t("homepage.hero.title")} {" "}
                  {/* Highlight the "Best Care" part in brand sage */}
                  <span className="text-[#6e8b7c]">{t("homepage.hero.titleHighlight")}</span>
                </h1>
              </div>
              <p className="text-muted-foreground max-w-4xl mx-auto text-center leading-relaxed animate-slide-up [animation-delay:200ms] text-[clamp(1rem,2.2vw,1.25rem)] px-4">
                {t("homepage.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:400ms] justify-center items-center max-w-5xl mx-auto px-4">
                <Button size="lg" asChild className="transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto whitespace-nowrap">
                  <Link href="/booking">{t("homepage.hero.bookAppointment")}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto whitespace-nowrap"
                >
                  <Link href="/services">{t("homepage.hero.viewServices")}</Link>
                </Button>
                {/* Hero: click-to-call button for quick contact */}
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="relative overflow-hidden ring-2 ring-[#6e8b7c] shadow-[0_10px_20px_rgba(110,139,124,0.35)] animate-pulse-soft hover:animate-none w-full sm:w-auto whitespace-nowrap"
                >
                  <a href="tel:+35722123456" className="inline-flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {t("homepage.hero.callUs")}
                  </a>
                </Button>
              </div>
              <div className="flex flex-col items-center sm:flex-row sm:items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground animate-slide-up [animation-delay:600ms] mx-auto max-w-4xl px-4"> {/* Center on mobile */}
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t("homepage.hero.licensedInsured")}</span>
                </div>
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <Award className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t("homepage.hero.experience")}</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right w-full flex justify-center mx-auto">
              <div className="relative z-10 animate-float w-full max-w-[720px]">
                <Image
                  src="/gallery/12.png"
                  alt="Groomed pet showcase"
                  width={720}
                  height={720}
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#e8f0ec] rounded-full opacity-60 animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#f3eee6] rounded-full opacity-60 animate-bounce-gentle [animation-delay:1s]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
          <div className="text-center space-y-6 mb-16 animate-fade-in">
            {/* Use grey bubble on white section for better contrast */}
            <div className="inline-block rounded-full bg-secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3 animate-slide-up max-w-full">
              <h2 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-tight text-[clamp(1.15rem,1.8vw,2rem)] text-foreground text-center break-words">
                {t("homepage.services.title")}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up [animation-delay:200ms] px-4">
              {t("homepage.services.description")}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 md:gap-8">
            {/* Guarded array access to avoid rendering raw translation keys before i18n loads */}
            {(() => {
              const getList = (key: string): string[] => {
                const anyT = t as unknown as (k: string) => any
                const v = anyT(key)
                return Array.isArray(v) ? v : []
              }
              const cards = [
                {
                  icon: Scissors,
                  title: t("homepage.services.fullGrooming.title"),
                  description: t("homepage.services.fullGrooming.description"),
                  price: t("homepage.services.fullGrooming.price"),
                  features: getList("homepage.services.fullGrooming.features"),
                  delay: "0ms",
                },
                {
                  icon: Heart,
                  title: t("homepage.services.bathBrush.title"),
                  description: t("homepage.services.bathBrush.description"),
                  price: t("homepage.services.bathBrush.price"),
                  features: getList("homepage.services.bathBrush.features"),
                  delay: "200ms",
                },
                {
                  icon: Star,
                  title: t("homepage.services.nailCare.title"),
                  description: t("homepage.services.nailCare.description"),
                  price: t("homepage.services.nailCare.price"),
                  features: getList("homepage.services.nailCare.features"),
                  delay: "400ms",
                },
              ]
              return cards.map((service, index) => (
                <Card
                  key={index}
                  className={`bg-secondary rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer animate-slide-up`}
                  style={{ animationDelay: service.delay }}
                >
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-4 bg-white rounded-2xl ring-1 ring-border shadow-sm animate-scale-in [animation-delay:600ms]">
                        <service.icon className="h-8 w-8 text-[#6e8b7c]" />
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <div className="text-2xl font-bold text-[#6e8b7c] mb-3">{service.price}</div>
                    <CardDescription className="text-center leading-relaxed text-muted-foreground">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {service.features.length > 0 && (
                      <ul className="space-y-3">
                        {service.features.slice(0, 4).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-sm">
                            <div className="h-2 w-2 bg-[#6e8b7c] rounded-full flex-shrink-0 animate-pulse-soft" />
                            <span className="flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))
            })()}
          </div>

          <div className="text-center mt-16 animate-fade-in [animation-delay:800ms]">
            <Button size="lg" asChild className="transition-all duration-200 hover:scale-105 active:scale-95">
              <Link href="/services">{t("homepage.services.viewAllServices")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#fbf5ed] to-[#e8f0ec]">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
          <div className="text-center space-y-6 mb-16 animate-fade-in">
            <div className="inline-block rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3 animate-slide-up max-w-full">
              <h2 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-tight text-[clamp(1.15rem,1.8vw,2rem)] text-foreground text-center break-words">
                {t("homepage.whyChooseUs.title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 md:gap-8 lg:gap-12">
            {[
              {
                icon: Heart,
                title: t("homepage.whyChooseUs.lovingCare.title"),
                description: t("homepage.whyChooseUs.lovingCare.description"),
                color: "pink",
                delay: "0ms",
              },
              {
                icon: Shield,
                title: t("homepage.whyChooseUs.safeClean.title"),
                description: t("homepage.whyChooseUs.safeClean.description"),
                color: "blue",
                delay: "200ms",
              },
              {
                icon: Clock,
                title: t("homepage.whyChooseUs.flexibleScheduling.title"),
                description: t("homepage.whyChooseUs.flexibleScheduling.description"),
                color: "green",
                delay: "400ms",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center space-y-6 animate-slide-up transition-all duration-300 hover:-translate-y-1`}
                style={{ animationDelay: item.delay }}
              >
                <div className="flex items-center justify-center">
                  <div
                    className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-border animate-scale-in [animation-delay:600ms]`}
                  >
                    <item.icon
                      className={`h-10 w-10 text-[#6e8b7c]`}
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold break-words">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto px-4">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem]">
          <div className="text-center space-y-6 mb-16 animate-fade-in">
            {/* Use grey bubble on white section for better contrast */}
            <div className="inline-block rounded-full bg-secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06)] px-5 md:px-6 py-3 animate-slide-up max-w-full">
              <h2 className="font-[var(--font-display,_inherit)] font-extrabold tracking-tight leading-tight text-[clamp(1.15rem,1.8vw,2rem)] text-foreground text-center break-words">
                {t("homepage.testimonials.title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 md:gap-8">
            {[0, 1, 2].map((index) => (
              <Card
                key={index}
                className={`bg-secondary rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-scale-in"
                        style={{ animationDelay: `${600 + i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{t(`homepage.testimonials.reviews.${index}.name`)}</CardTitle>
                  <CardDescription>{t(`homepage.testimonials.reviews.${index}.pet`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{t(`homepage.testimonials.reviews.${index}.comment`)}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#6e8b7c] via-[#9fb7ab] to-[#b8c7bf] text-white animate-gradient">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-[120rem] text-center space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold animate-slide-up break-words leading-tight">{t("homepage.cta.title")}</h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed animate-slide-up [animation-delay:200ms] px-4">
            {t("homepage.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up [animation-delay:400ms] max-w-2xl mx-auto px-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto whitespace-nowrap"
            >
              <Link href="/booking">{t("homepage.cta.bookNow")}</Link>
            </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#6e8b7c] transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto whitespace-nowrap" asChild>
              <Link href="/contact">{t("homepage.cta.contactUs")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
