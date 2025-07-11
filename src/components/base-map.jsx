// src/components/base-map.jsx
'use client'

import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { useEffect } from 'react'

// 1. This is the new, crucial helper component.
// It gets access to the map instance and imperatively updates its view.
function ChangeView({ center, zoom }) {
  const map = useMap() // This hook gives us the map instance.

  // 2. We use an effect that runs anytime the 'center' or 'zoom' props change.
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null // This component does not render anything itself.
}

// 3. This is our main BaseMap component.
export function BaseMap({ center, zoom, children }) {
  const mapboxAccessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className='h-full w-full'
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* 4. We include the ChangeView component here. */}
      {/* It will receive the updated 'center' and 'zoom' props from BaseMap */}
      {/* and force the map to update its view. */}
      <ChangeView center={center} zoom={zoom} />

      {children}
    </MapContainer>
  )
}
