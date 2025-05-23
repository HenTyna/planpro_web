import CalendarPage from '@/components/ui/calendar/CalendarPage'
import Head from 'next/head'
import React from 'react'

const Canlendar = () => {
    return (
        <div>
            <Head>
                <title>PlanPro | Canlendar</title>
                <meta name="description" content="Chat AI page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>

                <CalendarPage />
            </main>
        </div>
    )
}

export default Canlendar