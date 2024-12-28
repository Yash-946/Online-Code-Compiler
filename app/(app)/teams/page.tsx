import { Navbar } from '@/components/layout/navbar'
import { TeamSection } from '@/components/layout/sections/team'
import React from 'react'

export default function page() {
    return (
        <div className='h-[100vh]'>
            <Navbar homepage={false} />
            <TeamSection />
        </div>
    )
}
