// src/components/client-map-wrapper.jsx
'use client' // This is the most important line. It declares a client boundary.

import dynamic from 'next/dynamic'

// We move the dynamic import logic from the page into this client component.
const MapHome = dynamic(
  () =>
    import('@/components/map-home').then(
      (mod) => mod.MapHome,
    ),
  {
    ssr: false, // This is now allowed because we are in a Client Component.
    loading: () => (
      <div className='m-4 md:m-32'>
        <div className='max-w-sm md:max-w-lg lg:max-w-xl mx-auto space-y-6'>
          <div className='h-8 bg-gray-800 rounded-md w-3/4 mx-auto animate-pulse'></div>
          <div className='glass-effect rounded-2xl h-80 bg-gray-900 animate-pulse'></div>
        </div>
      </div>
    ),
  },
)

// This wrapper component simply receives the props and passes them down.
export function ClientMapWrapper({ puntosRecojo }) {
  return <MapHome puntosRecojo={puntosRecojo} />
}
