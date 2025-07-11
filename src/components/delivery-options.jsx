'use client'

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/lib/store'
import { MapDelivery } from './map-delivery'

export function DeliveryOptions({ venues }) {
  const {
    deliveryOption,
    setDeliveryOption,
    pickupPointId,
    setPickupPoint,
    deliveryDetails,
    setDeliveryDetails,
    selectedCity,
  } = useStore()

  const availableVenues = venues.filter(
    (v) => v.ciudad.toLowerCase() === selectedCity,
  )

  const handleDetailChange = (e) => {
    const { name, value, type, checked } = e.target
    setDeliveryDetails({
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div className='space-y-6'>
      <h3 className='text-xl font-brand ...'>
        OPCIONES DE ENTREGA
      </h3>
      <RadioGroup
        value={deliveryOption}
        onValueChange={setDeliveryOption}
        className='space-y-4'
      >
        {/* --- PICKUP OPTION --- */}
        <div className='glass-effect p-4 rounded-xl'>
          <div className='flex items-center space-x-3 mb-3'>
            <RadioGroupItem value='pickup' id='pickup' />
            <Label
              htmlFor='pickup'
              className='text-lg font-semibold'
            >
              Recoger en tienda
            </Label>
          </div>
          {deliveryOption === 'pickup' && (
            <RadioGroup
              value={pickupPointId}
              onValueChange={setPickupPoint}
              className='ml-6 space-y-3'
            >
              {availableVenues.map((venue) => (
                <div
                  key={venue.id}
                  className='flex items-center space-x-2 ...'
                >
                  <RadioGroupItem
                    value={venue.id}
                    id={venue.id}
                  />
                  <Label
                    htmlFor={venue.id}
                    className='flex-1 cursor-pointer'
                  >
                    <div className='font-medium'>
                      {venue.nombre}
                    </div>
                    <div className='text-sm text-gray-400'>
                      {venue.direccion}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* --- DELIVERY OPTION --- */}
        <div className='glass-effect p-4 rounded-xl'>
          <div className='flex items-center space-x-3 mb-3'>
            <RadioGroupItem
              value='delivery'
              id='delivery'
            />
            <Label
              htmlFor='delivery'
              className='text-lg font-semibold'
            >
              Entrega a domicilio
            </Label>
          </div>
          {deliveryOption === 'delivery' && (
            <div className='ml-6 space-y-4'>
              {/* Note the `name` attribute matches the store key */}
              <Input
                name='name'
                placeholder='Nombre completo'
                value={deliveryDetails.name}
                onChange={handleDetailChange}
              />
              <Input
                name='phone'
                placeholder='Teléfono'
                value={deliveryDetails.phone}
                onChange={handleDetailChange}
              />
              <MapDelivery />
              <Input
                name='address'
                placeholder='Dirección completa'
                value={deliveryDetails.address}
                onChange={handleDetailChange}
              />
              <Textarea
                name='observations'
                placeholder='Observaciones...'
                value={deliveryDetails.observations}
                onChange={handleDetailChange}
              />
            </div>
          )}
        </div>

        {/* --- INTERIOR OPTION --- */}

        <div className='glass-effect p-4 rounded-xl'>
          <div className='flex items-center space-x-3 mb-3'>
            <RadioGroupItem
              value='interior'
              id='interior'
            />
            <Label
              htmlFor='interior'
              className='text-lg font-semibold'
            >
              Envío al interior
            </Label>
          </div>

          {deliveryOption === 'interior' && (
            <div className='ml-6 space-y-4'>
              <div className='grid grid-cols-2 gap-3'>
                <Input
                  name='name'
                  placeholder='Nombre completo'
                  value={deliveryDetails.name}
                  onChange={handleDetailChange}
                />
                <Input
                  name='phone'
                  placeholder='Teléfono'
                  value={deliveryDetails.phone}
                  onChange={handleDetailChange}
                />
              </div>

              <Input
                name='city'
                placeholder='Ciudad de destino'
                value={deliveryDetails.city}
                onChange={handleDetailChange}
              />

              <Input
                name='address'
                placeholder='Dirección completa'
                value={deliveryDetails.addressInterior}
                onChange={handleDetailChange}
              />

              <Textarea
                name='observations'
                placeholder='Observaciones (referencias, instrucciones especiales...)'
                value={deliveryDetails.observations}
                onChange={handleDetailChange}
                className='resize-none'
                rows={3}
              />

              <div className='flex items-center space-x-2 p-3 bg-amber-900/20 rounded-lg border border-amber-600/30'>
                <input
                  name='urgent'
                  type='checkbox'
                  id='urgent'
                  checked={deliveryDetails.urgent}
                  onChange={handleDetailChange}
                  className='rounded'
                />
                <Label
                  htmlFor='urgent'
                  className='text-amber-200'
                >
                  Envío urgente (avión)
                </Label>
              </div>
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  )
}
