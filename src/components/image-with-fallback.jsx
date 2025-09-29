'use client'

import { useState } from 'react'
import Image from 'next/legacy/image'

export function ImageWithFallback({
  src,
  fallbackSrc,
  ...rest
}) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...rest}
      src={imgSrc || fallbackSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
