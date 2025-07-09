'use client'

import { useEffect, useRef } from 'react'

export function MapSection({ puntosRecojo }) {
  const mapContainer = useRef(null)

  useEffect(() => {
    // Initialize Mapbox map
    // This is a placeholder for Mapbox integration
    if (mapContainer.current) {
      // Mapbox GL JS initialization will go here
      console.log('Mapbox map will be initialized here')
    }
  }, [])

  return (
    <div className='px-4'>
      <div className='max-w-sm mx-auto space-y-6'>
        <h2 className='text-2xl font-brand text-center bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent'>
          NUESTRAS UBICACIONES
        </h2>

        <div className='glass-effect rounded-2xl overflow-hidden shadow-2xl'>
          <div
            ref={mapContainer}
            className='h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center'
          >
            <div className='text-center text-gray-400'>
              <div className='text-4xl mb-2'>🗺️</div>
              <p className='font-semibold'>Mapa Mapbox</p>
              <p className='text-sm'>
                Cargando ubicaciones...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
