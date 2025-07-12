// src/components/terms-dialog.jsx
'use client'

import { useUiStore } from '@/lib/ui-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function TermsDialog() {
  const { isTermsModalOpen, closeTermsModal } = useUiStore()

  return (
    <Dialog
      open={isTermsModalOpen}
      onOpenChange={closeTermsModal}
    >
      <DialogContent className='bg-black border-gray-700 max-w-2xl mx-auto'>
        <DialogHeader>
          <DialogTitle className='font-brand text-2xl text-center text-[#C1121F]'>
            Términos y Condiciones. Vappeobo
          </DialogTitle>
        </DialogHeader>
        <div className='prose prose-invert max-h-[60vh] overflow-y-auto mt-4 pr-4 text-gray-300'>
          <p className='text-xs text-gray-500 mb-2'>
            Última actualización: Julio de 2025
          </p>
          <p>
            Bienvenido a Vappeobo. Al acceder y utilizar
            nuestro sitio web (el "Sitio") y realizar una
            compra, usted ("el Usuario") acepta y se
            compromete a cumplir los siguientes Términos y
            Condiciones. Si no está de acuerdo, por favor no
            utilice este Sitio.
          </p>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            1. RESTRICCIÓN DE EDAD Y ADVERTENCIA DE SALUD
            (MUY IMPORTANTE)
          </h3>
          <ul className='list-disc space-y-2 pl-5'>
            <li>
              <strong>Mayoría de Edad:</strong> Este Sitio y
              los productos que se ofrecen están destinados
              exclusivamente a personas{' '}
              <strong> mayores de 18 años.</strong> Al
              realizar una compra, usted declara y garantiza
              que tiene al menos 18 años de edad. Nos
              reservamos el derecho de solicitar
              verificación de edad y cancelar cualquier
              pedido si sospechamos que el comprador es
              menor de edad.
            </li>
            <li>
              <strong>Riesgos para la Salud:</strong>{' '}
              Nuestros productos contienen nicotina, una
              sustancia altamente adictiva. No son productos
              para dejar de fumar. Están destinados a ser
              una alternativa para fumadores adultos. No
              utilice estos productos si está embarazada,
              amamantando, tiene condiciones cardíacas,
              presión arterial alta, diabetes o si es
              alérgico a la nicotina o al propilenglicol.
              Mantener fuera del alcance de niños y
              mascotas.
            </li>
          </ul>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            2. DISPONIBILIDAD DE PRODUCTOS Y STOCK
          </h3>
          <ul className='list-disc space-y-2 pl-5'>
            <li>
              Los productos y sabores están disponibles para
              las ciudades de Cochabamba y Santa Cruz, según
              la selección del Usuario.
            </li>
            <li>
              El estado del inventario (ej. "OK", "QUEDAN
              POCOS", "AGOTADO") es orientativo y se
              actualiza en base a nuestro mejor esfuerzo.
            </li>
            <li>
              <strong>Stock Limitado:</strong> Una etiqueta
              como "QUEDAN POCOS" no garantiza la
              disponibilidad del producto en el punto de
              recojo seleccionado en el momento de la
              compra. En el caso excepcional de que un
              producto pagado no esté disponible, nuestro
              equipo se pondrá en contacto con usted a
              través de WhatsApp para ofrecerle (a) un
              producto de reemplazo de igual valor, (b)
              esperar a la reposición del stock, o (c) un
              reembolso completo del monto pagado por dicho
              producto.
            </li>
          </ul>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            3. POLÍTICA DE ENTREGAS
          </h3>
          <ul className='list-disc space-y-2 pl-5'>
            <li>
              Ofrecemos tres métodos de entrega: Recojo en
              punto autorizado, Entrega a Domicilio y Envío
              al Interior.
            </li>
            <li>
              <strong>Tercerización del Servicio:</strong>{' '}
              La Entrega a Domicilio y el Envío al Interior
              son gestionados por empresas de mensajería y
              transporte de terceros. Vappeobo no se
              responsabiliza por demoras, daños, pérdidas o
              cualquier inconveniente logístico una vez que
              el paquete ha sido entregado a dicha empresa.
              Nuestra responsabilidad finaliza al despachar
              el pedido. Cualquier reclamo por el servicio
              de entrega deberá ser dirigido directamente a
              la empresa transportista.
            </li>
          </ul>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            4. POLÍTICA DE DEVOLUCIONES, CAMBIOS Y
            REEMBOLSOS
          </h3>
          <p>
            Entendemos que pueden surgir problemas y hemos
            establecido una política clara y justa.
          </p>
          <ol
            type='a'
            className='list-[lower-alpha] space-y-4 pl-5'
          >
            <li>
              <strong>Por Defectos de Fábrica:</strong>
              <ul className='list-disc space-y-2 pl-5 mt-2'>
                <li>
                  Si considera que un producto tiene un
                  defecto de fábrica (ej. no enciende, fuga
                  de líquido al momento de abrirlo), debe
                  notificarlo a nuestro canal de WhatsApp en
                  un plazo no mayor a 24 horas después de
                  haber recibido o recogido el producto.
                </li>
                <li>
                  El producto debe estar sin uso evidente,
                  con su empaque original. Nos reservamos el
                  derecho de solicitar evidencia fotográfica
                  o en video para verificar el defecto.
                </li>
                <li>
                  Si el defecto es verificado, ofreceremos
                  un cambio por un producto idéntico y
                  nuevo. No se realizan reembolsos en
                  efectivo por esta causa.
                </li>
              </ul>
            </li>
            <li>
              <strong>
                Por Anulación de Pedido (Antes del
                Recojo/Envío):
              </strong>
              <p className='mt-2'>
                Si usted ha pagado un pedido para "Recojo en
                Tienda" y desea anularlo antes de haberlo
                recogido, puede hacerlo. Se le reembolsará
                el monto total de la compra.
              </p>
            </li>
            <li>
              <strong>
                Casos en los que NO se aceptan devoluciones
                ni cambios:
              </strong>
              <ul className='list-disc space-y-2 pl-5 mt-2'>
                <li>
                  Por insatisfacción con el sabor, nivel de
                  nicotina o características del producto.
                </li>
                <li>Productos que ya han sido usados.</li>
                <li>
                  Productos dañados por mal uso por parte
                  del cliente.
                </li>
                <li>
                  Si el reporte del defecto se realiza
                  después de las 24 horas estipuladas.
                </li>
                <li>
                  Costos de envío. Estos no son
                  reembolsables.
                </li>
              </ul>
            </li>
          </ol>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            5. PRECIOS Y PAGOS
          </h3>
          <ul className='list-disc space-y-2 pl-5'>
            <li>
              Todos los precios están expresados en
              Bolivianos (Bs.) e incluyen los impuestos de
              ley.
            </li>
            <li>
              Nos reservamos el derecho de modificar los
              precios en cualquier momento. El precio válido
              para su compra es el que se muestra en el
              momento de confirmar el pedido.
            </li>
            <li>
              En caso de un error evidente en el precio de
              un producto, nos reservamos el derecho de
              anular el pedido y proceder con el reembolso
              del monto pagado.
            </li>
          </ul>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            6. LEY APLICABLE Y JURISDICCIÓN
          </h3>
          <p>
            Estos Términos y Condiciones se rigen por las
            leyes del Estado Plurinacional de Bolivia. Para
            cualquier disputa, las partes se someten a la
            jurisdicción de los tribunales competentes de la
            ciudad de Cochabamba, Bolivia.
          </p>
          <h3 className='my-8 font-brand text-lg text-amber-400'>
            7. CONTACTO
          </h3>
          <p>
            Para cualquier duda sobre estos términos, puede
            contactarnos a través de nuestro número de
            WhatsApp o nuestras redes sociales.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={closeTermsModal}
            className='w-full bg-[#C1121F] hover:bg-[#91090f]'
          >
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
