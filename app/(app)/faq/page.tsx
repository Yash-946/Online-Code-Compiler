import { Navbar } from '@/components/layout/Navbar'
import { FAQSection } from '@/components/layout/sections/faq'
import React from 'react'

export default function page() {
  return (
    <div className=''>
        <Navbar homepage={false} />
        <FAQSection />
    </div>
  )
}
