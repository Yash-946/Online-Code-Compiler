import { Navbar } from '@/components/layout/navbar'
import { FAQSection } from '@/components/layout/sections/faq'
import React from 'react'

export default function page() {
  return (
    <div className='overflow-hidden'>
        <Navbar homepage={false} />
        <FAQSection />
    </div>
  )
}
