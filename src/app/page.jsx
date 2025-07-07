"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { CitySelector } from "@/components/city-selector"
import { ProductCatalog } from "@/components/product-catalog"
import { MapSection } from "@/components/map-section"
import { SocialMediaSection } from "@/components/social-media-section"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"

export default function HomePage() {
  const { selectedCity } = useStore()
  const [quote, setQuote] = useState("")

  useEffect(() => {
    // TODO: Replace with actual API call to /api/sheets/quotes
    const promoQuote =
      "Para el mes del nuevo sitio web estamos permitiendo a los clientes usar el código NEWSITE25 para obtener 25% de descuento en todos los productos - ¡Oferta limitada!"
    setQuote(promoQuote)
  }, [])

  return (
    (<div className="space-y-12">
      <HeroSection quote={quote} />
      <div className="px-4 space-y-12 max-w-sm mx-auto">
        <CitySelector />
        <ProductCatalog />
      </div>
      <MapSection />
      <SocialMediaSection />
      <Footer />
    </div>)
  );
}
