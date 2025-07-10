'use client'

import {
  Instagram,
  Facebook,
  TwitterIcon as TikTok,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'

export function SocialMediaSection() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/vappeo',
      color: 'from-purple-600 to-pink-600',
      followers: '15.2K',
    },
    {
      name: 'TikTok',
      icon: TikTok,
      url: 'https://tiktok.com/@vappeo',
      color: 'from-black to-red-600',
      followers: '8.7K',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/vappeo',
      color: 'from-blue-600 to-blue-800',
      followers: '12.1K',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@vappeo',
      color: 'from-red-600 to-red-800',
      followers: '3.2K',
    },
  ]

  return (
    <section
      id='social-section'
      className='px-4 py-12 bg-gradient-to-br from-gray-900 to-black scroll-mt-12'
    >
      <div className='max-w-sm mx-auto space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-brand mb-4 bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent'>
            SÍGUENOS
          </h2>
          <p className='text-gray-400'>
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
                  <div className='text-sm text-gray-400'>
                    {social.followers}
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
          <p className='text-gray-400 text-sm'>
            Usa #VappeoExperience y aparece en nuestras
            historias
          </p>
        </div>
      </div>
    </section>
  )
}
