"use client"
import { useParams } from 'next/navigation';
import React from 'react'

function SaveCode() {
  const pramas = useParams<{ savecodeid: string }>();
  const codeid = pramas.savecodeid;
  return (
    <div>
      {codeid}
    </div>
  )
}

export default SaveCode