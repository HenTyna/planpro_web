import NotesList from '@/components/ui/notes/NotesList'
import Head from 'next/head'
import React from 'react'

const notes = () => {
  return (
    <div>
      <Head>
        <title>PlanPro | Notes</title>
        <meta name="description" content="Notes" />
        <link rel="icon" href="/asset/planpro-favicon.svg" />
      </Head>
      <main>
        <NotesList />
      </main>
    </div>
  )
}

export default notes