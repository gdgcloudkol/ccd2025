'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import LogoData from '../public/content/companies.json'
import Marquee from './ui/Marquee'

type Company = {
  name: string
  logo: string
}

type Props = {
  data: Company[]
  variant: 'grid' | 'marquee'
}

function CompanyLayout({ data, variant }: Props) {
  const [logos, setLogos] = useState<Company[]>([])

  useEffect(() => {
    setLogos(data)
  }, [data])

  if (variant === 'grid') {
    return (
      <div className="gap-6 p-4 min-h-[200px] flex flex-wrap items-center justify-center ">
        {logos.map((company, idx) => (
          <div className="relative rounded-lg overflow-hidden w-[30%] sm:w-1/4  aspect-[2/1] flex items-center justify-center bg-white p-1 md:w-1/6 lg:w-1/7" key={idx} title={company.name}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg z-0"></div>
            <div className="absolute inset-[1px] bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center z-20">
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={60}
                className="object-contain h-16"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Marquee style
  return (
    <Marquee
              pauseOnHover={true}
              className="no-scrollbar select-none items-center !ease-linear"
            >
              {data.map((d,idx)=>(
                <div className="relative  mx-8 mt-1 w-36 aspect-[2/1]" key={`${idx}-${d.logo}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-lg z-0"></div>
                <div className="absolute inset-[1px] bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center z-20">
                <Image
                  src={d.logo}
                  alt={d.name}
                  className={"z-10"}
                  width={200}
                  height={80}
                />
                </div>
              </div>
            ))}
              

  </Marquee>
  )
}

export default function SpeakerCompaniesSection({variant}:{variant: 'grid' | 'marquee'}){
return   <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 relative">
<div className="max-w-7xl mx-auto">
  {/* Sponsors Header */}
  <div className="text-center mb-6 sm:mb-8">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-3 sm:mb-4">
      Where our speakers come from
    </h2>
    <p className="text-sm sm:text-base text-[#676C72] dark:text-[#d2d7dc] max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
      Find where our esteemed panel of speakers come from
    </p>

      
      <CompanyLayout variant={variant} data={LogoData}/>
</div>
</div>
</section>
}