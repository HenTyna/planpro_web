import GeminiChat from '@/components/ui/ai/GeminiChat'
import Head from 'next/head'
import React from 'react'

const chatai = () => {
  return (
    <div>
      <Head>
        <title>PlanPro | Chat AI</title>
        <meta name="description" content="Chat AI page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GeminiChat />
      </main>
    </div>
  )
}

export default chatai