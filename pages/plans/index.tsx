import PlanList from '@/components/ui/plan/PlanList'
import Head from 'next/head'
import React from 'react'

const index = () => {
    return (
        <div>
            <Head>
                <title>PlanPro | Plans</title>
                <meta name="description" content="Plans" />
                <link rel="icon" href="/asset/planpro-favicon.svg" />
            </Head>
            <main>
                <PlanList />
            </main>
        </div>
    )
}

export default index