// src/components/map-home.jsx (previously map-section.jsx)
'use client'

import { useState } from 'react'
import { Marker } from 'react-leaflet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'
import L from 'leaflet'
import { useStore } from '@/lib/store'
import { BaseMap } from './base-map'

// This function creates a custom HTML marker with a label
function createVenueIcon(name) {
  return L.divIcon({
    className: 'venue-marker-container', // A container class for positioning
    html: `
      <img src="/imgs/e_red.png" style="width: 35px; height: 35px;" />
      <div class="venue-marker-label">${name}</div>
    `,
    iconSize: [120, 45], // Adjust size to fit the label
    iconAnchor: [60, 45], // Anchor at the bottom-center of the whole element
  })
}

const CITY_CENTERS = {
  cochabamba: [-17.38, -66.18],
  'santa cruz': [-17.78, -63.18],
}

export function MapHome({ puntosRecojo }) {
  const [selectedVenue, setSelectedVenue] = useState(null)
  const { selectedCity } = useStore()

  const mapCenter = [
    ...(CITY_CENTERS[selectedCity] ||
      CITY_CENTERS.cochabamba),
  ]

  const visiblePuntos = puntosRecojo.filter(
    (p) => p?.ciudad?.toLowerCase() === selectedCity,
  )

  return (
    <div className='m-4 md:m-32'>
      <div className='max-w-sm md:max-w-lg lg:max-w-xl mx-auto space-y-6'>
        <h2 className='relative text-2xl font-brand text-center'>
          <span className='absolute text-red-600 text-2xl -top-4 -left-2'>
            PRÓXIMAMENTE
          </span>{' '}
          NUESTRAS UBICACIONES
        </h2>
        <div className='glass-effect rounded-2xl overflow-hidden shadow-2xl h-80'>
          <BaseMap center={mapCenter} zoom={12}>
            {visiblePuntos.map((venue) => (
              <Marker
                key={venue.id}
                position={[
                  parseFloat(venue.lat),
                  parseFloat(venue.lng),
                ]}
                icon={createVenueIcon(venue.nombre)}
                eventHandlers={{
                  click: () => {
                    setSelectedVenue(venue)
                  },
                }}
              />
            ))}
          </BaseMap>
        </div>
      </div>

      <Dialog
        open={!!selectedVenue}
        onOpenChange={() => setSelectedVenue(null)}
      >
        <DialogContent className='bg-black border-gray-700'>
          <DialogHeader>
            <DialogTitle className='font-brand text-xl text-[#C1121F]'>
              {selectedVenue?.nombre}
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-3 text-white'>
            <p>
              <strong>Dirección:</strong>{' '}
              {selectedVenue?.direccion} -- ejemplo
            </p>
            <p>
              <strong>Horario:</strong>{' '}
              {selectedVenue?.horario ||
                'Consultar en redes'}
            </p>
            <Link
              href={`https://www.google.com/maps?q=${selectedVenue?.lat},${selectedVenue?.lng}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-blue-300 font-semibold'
            >
              Abrir en Google Maps ↗
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
