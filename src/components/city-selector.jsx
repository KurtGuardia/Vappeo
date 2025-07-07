"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"

export function CitySelector() {
  const { selectedCity, setSelectedCity } = useStore()

  return (
    (<div className="space-y-6">
      <h2
        className="text-2xl font-brand text-center bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent">
        SELECCIONA TU CIUDAD
      </h2>
      <RadioGroup
        value={selectedCity}
        onValueChange={setSelectedCity}
        className="flex justify-center space-x-8">
        <div className="flex items-center space-x-3 glass-effect p-4 rounded-xl">
          <RadioGroupItem value="cochabamba" id="cochabamba" className="border-[#C1121F]" />
          <Label htmlFor="cochabamba" className="text-lg font-semibold cursor-pointer">
            Cochabamba
          </Label>
        </div>
        <div className="flex items-center space-x-3 glass-effect p-4 rounded-xl">
          <RadioGroupItem value="santa-cruz" id="santa-cruz" className="border-[#C1121F]" />
          <Label htmlFor="santa-cruz" className="text-lg font-semibold cursor-pointer">
            Santa Cruz
          </Label>
        </div>
      </RadioGroup>
    </div>)
  );
}
