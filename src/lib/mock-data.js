// src/lib/mock-data.js
export const MOCK_DATA = {
  productos: [
    {
      id: 'vape-3.5k',
      nombre: 'Vapeador 3500 Hits',
      imagen_general: '/imgs/vape-3.5k-card.png',
      descripcion:
        'Ideal para empezar, compacto y potente.',
    },
    {
      id: 'vape-20k',
      nombre: 'Vapeador 20,000 Hits',
      imagen_general: '/imgs/vape-20k-card.png',
      descripcion: 'Batería de larga duración, gran sabor.',
    },
    {
      id: 'vape-36k',
      nombre: 'Vapeador Pro 36,000 Hits',
      imagen_general: '/imgs/vape-36k-card.png',
      descripcion:
        'La experiencia definitiva, máximo vapor.',
    },
  ],
  inventario: [
    {
      producto_id: 'vape-3.5k',
      sabor: 'Mango',
      ciudad: 'Cochabamba',
      precio: '80',
      stock: '15',
      etiqueta: null,
    },
    {
      producto_id: 'vape-3.5k',
      sabor: 'Uva',
      ciudad: 'Santa Cruz',
      precio: '85',
      stock: '20',
      etiqueta: 'NUEVO',
    },
    {
      producto_id: 'vape-20k',
      sabor: 'Blueberry Ice',
      ciudad: 'Cochabamba',
      precio: '150',
      stock: '12',
      etiqueta: 'TOP 24h',
    },
    {
      producto_id: 'vape-20k',
      sabor: 'Fresa Kiwi',
      ciudad: 'Cochabamba',
      precio: '150',
      stock: '8',
      etiqueta: 'QUEDAN POCOS',
    },
    {
      producto_id: 'vape-20k',
      sabor: 'Blueberry Ice',
      ciudad: 'Santa Cruz',
      precio: '155',
      stock: '0',
      etiqueta: null,
    },
    {
      producto_id: 'vape-36k',
      sabor: 'Triple Berry',
      ciudad: 'Cochabamba',
      precio: '220',
      stock: '5',
      etiqueta: null,
    },
  ],
  puntos: [
    {
      id: 'cbba-norte',
      ciudad: 'Cochabamba',
      nombre: 'Sucursal Norte',
      direccion: 'Av. América #123',
      lat: '-17.37',
      lng: '-66.15',
      horario: 'L-V 09:00-18:00',
    },
    {
      id: 'scz-centro',
      ciudad: 'Santa Cruz',
      nombre: 'Punto Central SCZ',
      direccion: 'Calle 21 de Mayo, Esq. Ayacucho',
      lat: '-17.78',
      lng: '-63.18',
      horario: 'L-S 10:00-19:00',
    },
  ],
  promos: [
    {
      codigo: 'BIENVENIDO',
      tipo: 'porcentaje',
      valor: '10',
      activo: 'Si',
    },
    {
      codigo: 'VAPPEO20',
      tipo: 'fijo',
      valor: '20',
      activo: 'Si',
    },
    {
      codigo: 'INACTIVO',
      tipo: 'porcentaje',
      valor: '50',
      activo: 'No',
    },
    {
      codigo: 'FINDEANO',
      tipo: 'fijo',
      valor: '30',
      activo: '2024-12-31',
    },
  ],
  marketing: [
    {
      id: 'hero_quote',
      valor:
        '🔥 ¡Lanzamiento de nuestra web usa el código "VAPEO" para un 10% de descuento! - Prueba el nuevo sabor Mango en vape de 20k - Ahora hacemos envíos al interior de país!',
    },
  ],
}
