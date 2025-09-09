'use client'

import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiWhatsapp,
} from 'react-icons/si'
import Link from 'next/link'
import { useThemeStore } from '@/lib/ui-store'

export function SocialMediaSection() {
  const { theme } = useThemeStore()

  const socialLinks = [
    {
      name: 'Instagram',
      icon: SiInstagram,
      url: 'https://www.instagram.com/vappeo.bo',
      color: 'from-purple-600 to-pink-600',
    },
    {
      name: 'WhatsApp',
      icon: SiWhatsapp,
      url: 'http://wa.me/59178008773?text=Hola%20Vappeo,%20contacto%20para%20lo%20siguiente:',
      color: 'from-green-600 to-green-800',
    },
    {
      name: 'Facebook',
      icon: SiFacebook,
      url: 'https://www.facebook.com/share/19QJArTgwa/?mibextid=wwXIfr',
      color: 'from-blue-600 to-blue-800',
    },
    {
      name: 'TikTok',
      icon: SiTiktok,
      url: 'https://www.tiktok.com/@vappeo',
      color: 'from-black to-red-600',
    },
  ]

  return (
    <section
      id='social-section'
      className={`px-4 py-12 bg-gradient-to-br m-0 ${
        theme === 'dark'
          ? 'from-gray-900 to-black'
          : 'from-amber-600 to-yellow-500'
      }`}
    >
      <div className='max-w-sm mx-auto space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-brand mb-4 bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent'>
            SÍGUENOS
          </h2>
          <p className=''>
            Únete a nuestra comunidad vaper
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target='_blank'
              className='glass-effect p-6 rounded-2xl card-hover group'
            >
              <div className='text-center space-y-3'>
                <div
                  className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <social.icon className='h-6 w-6 text-white' />
                </div>
                <div>
                  <div className='font-semibold text-white'>
                    {social.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='text-center glass-effect p-6 rounded-2xl'>
          <h3 className='font-brand text-xl mb-2 text-[#C1121F]'>
            ¡COMPARTE TU EXPERIENCIA!
          </h3>
          <p className='text-sm'>
            Usa #VappeoExperience y aparece en nuestras
            historias
          </p>
        </div>
      </div>
    </section>
  )
}
