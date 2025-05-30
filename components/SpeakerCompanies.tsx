'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'


type Company = {
  name: string
  logo: string
}

type Props = {
  data: Company[]
  variant: 'grid' | 'marquee'
}

export default function CompanyLogos({ data, variant }: Props) {
  const [logos, setLogos] = useState<Company[]>([])

  useEffect(() => {
    setLogos(data)
  }, [data])

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols- xl:grid-cols-6 gap-6 p-4">
        {logos.map((company, idx) => (
          <div key={idx} className="flex items-center justify-center bg-white rounded-md p-4">
            <Image
              src={company.logo}
              alt={company.name}
              width={120}
              height={60}
              className="object-contain h-16"
            />
          </div>
        ))}
      </div>
    )
  }

  // Marquee style
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className="animate-marquee flex gap-12">
        {logos.concat(logos).map((company, idx) => (
          <div key={idx} className="inline-flex items-center bg-white rounded-md">
            <Image
              src={company.logo}
              alt={company.name}
              width={120}
              height={60}
              className="object-contain h-16"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
