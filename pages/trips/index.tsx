import TripsContrainer from '@/components/ui/trips/TripsContrainer'
import Head from 'next/head'
import React from 'react'

const trips = () => {
  return (
    <div>
      <Head>
        <title>Smarter PMS | Trips</title>
      </Head>
      <main>
        <TripsContrainer />
      </main>
    </div>
  )
}

export default trips