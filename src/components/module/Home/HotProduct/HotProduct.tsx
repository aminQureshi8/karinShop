import Image from 'next/image'
import React from 'react'

export default function HotProduct() {
  return (
    <div className='flex items-center gap-3 text-sm '>
        <div>
            {/* <Image src="" width={100} height={100} alt='' /> */}
        </div>
        <div>
            <p className='line-clamp-1'>هدفون بی سیم اپل دو</p>
        </div>

    </div>
  )
}
