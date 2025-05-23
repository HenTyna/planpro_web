import TripsContrainer from '@/components/ui/trips/TripsContrainer'
import Head from 'next/head'
import React from 'react'

const trips = () => {
  return (
    <div>
      <Head>
        <title>PlanPro | Trips</title>
      </Head>
      <main>
        <TripsContrainer />
      </main>
    </div>
  )
}

export default trips