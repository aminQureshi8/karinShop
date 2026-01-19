import TopCategory from '@/components/module/Home/TopCategory/TopCategory'
import React from 'react'
import { CiMobile3 } from 'react-icons/ci'

export default function Blog() {
  return (
     <div className="mt-12">
      <TopCategory
        title="جدید ترین محصولات"
        des="جدیدترین و بروزترین محصولات"
        icon={<CiMobile3 size={22} />}
      />
      {/* <SwiperProductContainer /> */}
    </div>
  )
}
