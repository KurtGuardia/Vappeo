"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store"
import { useState, useRef, useEffect } from "react"

export function DeliveryOptions() {
  const { deliveryOption, setDeliveryOption } = useStore()
  const [selectedVenue, setSelectedVenue] = useState("")
  const [deliveryData, setDeliveryData] = useState({
    name: "",
    phone: "",
    address: "",
    observations: "",
    urgent: false,
    city: "",
  })
  const mapContainer = useRef(null)

  const venues = [
    { id: "centro", name: "VAPPEO Centro", address: "Av. Heroínas 123" },
    { id: "norte", name: "VAPPEO Norte", address: "Av. América 456" },
    { id: "sur", name: "VAPPEO Sur", address: "Av. Blanco Galindo 789" },
  ]

  useEffect(() => {
    if (deliveryOption === "delivery" && mapContainer.current) {
      // TODO: Initialize Mapbox map for delivery
      console.log("Initialize Mapbox for delivery address selection")
    }
  }, [deliveryOption])

  return (
    (<div className="space-y-6">
      <h3
        className="text-xl font-brand bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent">
        OPCIONES DE ENTREGA
      </h3>
      <RadioGroup
        value={deliveryOption}
        onValueChange={setDeliveryOption}
        className="space-y-4">
        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center space-x-3 mb-3">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="text-lg font-semibold">
              Recoger en tienda
            </Label>
          </div>

          {deliveryOption === "pickup" && (
            <div className="ml-6 space-y-3">
              <RadioGroup value={selectedVenue} onValueChange={setSelectedVenue}>
                {venues.map((venue) => (
                  <div
                    key={venue.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-800/50 rounded-lg">
                    <RadioGroupItem value={venue.id} id={venue.id} />
                    <Label htmlFor={venue.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{venue.name}</div>
                      <div className="text-sm text-gray-400">{venue.address}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center space-x-3 mb-3">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="text-lg font-semibold">
              Entrega a domicilio
            </Label>
          </div>

          {deliveryOption === "delivery" && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Nombre completo"
                  value={deliveryData.name}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, name: e.target.value }))} />
                <Input
                  placeholder="Teléfono"
                  value={deliveryData.phone}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, phone: e.target.value }))} />
              </div>

              <div
                ref={mapContainer}
                className="bg-gray-800 h-32 rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm">Mapa Mapbox para selección de dirección</p>
              </div>

              <Input
                placeholder="Dirección completa"
                value={deliveryData.address}
                onChange={(e) => setDeliveryData((prev) => ({ ...prev, address: e.target.value }))} />

              <Textarea
                placeholder="Observaciones (referencias, instrucciones especiales...)"
                value={deliveryData.observations}
                onChange={(e) => setDeliveryData((prev) => ({ ...prev, observations: e.target.value }))}
                className="resize-none"
                rows={3} />
            </div>
          )}
        </div>

        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center space-x-3 mb-3">
            <RadioGroupItem value="interior" id="interior" />
            <Label htmlFor="interior" className="text-lg font-semibold">
              Envío al interior
            </Label>
          </div>

          {deliveryOption === "interior" && (
            <div className="ml-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Nombre completo"
                  value={deliveryData.name}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, name: e.target.value }))} />
                <Input
                  placeholder="Teléfono"
                  value={deliveryData.phone}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, phone: e.target.value }))} />
              </div>

              <Input
                placeholder="Ciudad de destino"
                value={deliveryData.city}
                onChange={(e) => setDeliveryData((prev) => ({ ...prev, city: e.target.value }))} />

              <Input
                placeholder="Dirección completa"
                value={deliveryData.address}
                onChange={(e) => setDeliveryData((prev) => ({ ...prev, address: e.target.value }))} />

              <Textarea
                placeholder="Observaciones (referencias, instrucciones especiales...)"
                value={deliveryData.observations}
                onChange={(e) => setDeliveryData((prev) => ({ ...prev, observations: e.target.value }))}
                className="resize-none"
                rows={3} />

              <div
                className="flex items-center space-x-2 p-3 bg-amber-900/20 rounded-lg border border-amber-600/30">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={deliveryData.urgent}
                  onChange={(e) => setDeliveryData((prev) => ({ ...prev, urgent: e.target.checked }))}
                  className="rounded" />
                <Label htmlFor="urgent" className="text-amber-200">
                  Envío urgente (avión) +Bs. 50
                </Label>
              </div>
            </div>
          )}
        </div>
      </RadioGroup>
    </div>)
  );
}
